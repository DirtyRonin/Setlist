import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { AutocompleteChangeDetails, AutocompleteChangeReason, AutocompleteInputChangeReason, createFilterOptions } from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

import { fetchBandById } from 'service';
import { IFilterBandActionProps, IBand, IBandCatalog, IBandEntityActionProps, bandModalActions, ModalTypes } from 'models';
import { FilterBandActionProps, Band } from 'mapping';
import { GUID_EMPTY, IsFilterableString } from 'utils';

import { addBandToCatalog, deleteBandInCatalog, editBandInCatalog, fetchBandCatalog, setBandFilter } from 'store/actions/catalogActions/bandCatalogActions'
import { RootState } from 'store';
import { CustomEventModalHtmlAttributesConfiguration } from 'configuration/HtmlAttributesConfigs/customEventHtmlAttributes';

const BandModalTemplate = React.lazy(() => import('components/modals/BandModalTemplate'))
const DialogTemplate = React.lazy(() => import('components/common/Wrapper/dialogTemplate'))


const CONST_NEW_BAND = 'CREATE A NEW BAND'
const htmlConfig = CustomEventModalHtmlAttributesConfiguration;

function AsyncBandSelect({ bandModalActionsProvider, defaultBandId, bandCatalog, fetchBandCatalog, setBandFilter, setBandId, isReadonly }: props) {

    const [selectedBand, setSelectedBand] = useState(Band.EmptyBand())
    const [isLoading, setLoading] = useState(true)
    const [query, setQuery] = useState('')

    const [open, toggleOpen] = useState(false);

    useEffect(() => {
        if (defaultBandId) {
            setLoading(true)
            fetchBandById(defaultBandId).then(
                result => {
                    setSelectedBand(result)
                    setLoading(false)
                }
            )
        }
    }, [])

    useEffect(() => {
        const filter = FilterBandActionProps.CreateFromCatalog(bandCatalog)
        fetchBandCatalog(filter)
    }, [])

    useEffect(() => {
        if (bandCatalog.Refresh) {
            const filter = FilterBandActionProps.CreateFromCatalog(bandCatalog)
            fetchBandCatalog(filter)
        }
    }, [bandCatalog.Refresh])

    const handleClose = () => {
        setBandFilter(FilterBandActionProps.Create({ filter: { Query: '' }, refresh: false }))
        setSelectedBand(Band.EmptyBand())
        setQuery('')

        toggleOpen(false);
    };

    const handleOnChange = (event: React.ChangeEvent<{}>, newValue: IBand | null, reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<IBand> | undefined): void => {
        if (!newValue) {

            //clear this component before you leave it
            setSelectedBand(Band.EmptyBand())
            setQuery('')

            setBandId(null)

        } else if (newValue.Id !== GUID_EMPTY) {

            //set the values before you leave it
            setSelectedBand(newValue)
            setQuery(newValue.Title)

            setBandId(newValue.Id)


            setBandFilter(FilterBandActionProps.Create({ filter: { Query: '' }, refresh: true }))


        } else {


            setSelectedBand(Band.EmptyBand())
            setQuery('')
            setBandFilter(FilterBandActionProps.Create({ filter: { Query: '' }, refresh: true }))

            //open dialog
            toggleOpen(true);
        }
    }

    const handleOnInputChange = (event: React.ChangeEvent<{}>, value: string, reason: AutocompleteInputChangeReason): void => {
        setQuery(value)

        const refresh = reason === "input" && IsFilterableString(bandCatalog.Filter.Query, value) ? true : false
        if (refresh) {
            setBandFilter(FilterBandActionProps.Create({ filter: { Query: value }, refresh }))
        }
    }
    // const handleOnOpen = (event: React.ChangeEvent<{}>): void => {
    //     setLoading(true)
    // }

    const filter = createFilterOptions<IBand>();

    return (
        <Fragment>
            <Autocomplete
                disabled={isReadonly}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                value={selectedBand}
                onChange={handleOnChange}
                inputValue={query}
                onInputChange={handleOnInputChange}
                id={htmlConfig.Band.ControlId}
                options={Array.from(bandCatalog.Values.values())}
                getOptionLabel={(option) => {
                    // e.g value selected with enter, right from the input
                    if (typeof option === 'string') {
                        return option;
                    }
                    return option.Title;
                }}
                loading={isLoading || bandCatalog.Refresh}
                renderInput={(params) => <TextField
                    {...params}
                    label={htmlConfig.Band.Label}
                />}
                renderOption={(option, { inputValue }) => {

                    const matches = option.Title === CONST_NEW_BAND ? match(option.Title, CONST_NEW_BAND) : match(option.Title, inputValue);
                    const parts = parse(option.Title, matches);

                    return (
                        <div>
                            {parts.map((part, index) => (
                                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                    {part.text}
                                </span>
                            ))}
                        </div>
                    );
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params) as IBand[];

                    filtered.unshift({
                        ...Band.EmptyBand(),
                        Title: CONST_NEW_BAND
                    });

                    return filtered;
                }}
            />

            <DialogTemplate
                open={open}
                title={bandCatalog.Title}
                close={handleClose}
            >
                <BandModalTemplate
                    bandModalActionsProvider={bandModalActionsProvider}
                    handleClose={handleClose}
                    query={`?$type=${ModalTypes.New}`}
                />
            </DialogTemplate>
        </Fragment>
    );
}

interface IConnectedDispatch {
    bandModalActionsProvider: bandModalActions
    setBandFilter(props: IFilterBandActionProps): void
    fetchBandCatalog: (props: IFilterBandActionProps) => void
}

interface IProps {
    defaultBandId: string | null
    isReadonly: boolean
    setBandId: (id: string | null) => void
}

interface IStateProps extends IProps {
    bandCatalog: IBandCatalog
}

type props = IStateProps & IConnectedDispatch;

const mapStateToProps = (state: RootState, props: IProps): IStateProps =>
({
    defaultBandId: props.defaultBandId,
    bandCatalog: state.bandCatalogReducers.bandCatalog,
    setBandId: props.setBandId,
    isReadonly: props.isReadonly
})

const mapDispatchToProps = (dispatch: React.Dispatch<any>): IConnectedDispatch => ({
    bandModalActionsProvider: {
        None: () => { },
        New: (props: IBandEntityActionProps) => dispatch(addBandToCatalog.request(props)),
        Edit: (props: IBandEntityActionProps) => dispatch(editBandInCatalog.request(props)),
        Remove: (props: IBandEntityActionProps) => dispatch(deleteBandInCatalog.request(props)),
        Read: () => { },
        Add: () => { },
        ShowCatalog: () => { }
    },
    setBandFilter: (props: IFilterBandActionProps) => dispatch(setBandFilter(props)),
    fetchBandCatalog: (props: IFilterBandActionProps) => dispatch(fetchBandCatalog.request(props)),

})


export default connect(mapStateToProps, mapDispatchToProps)(AsyncBandSelect)