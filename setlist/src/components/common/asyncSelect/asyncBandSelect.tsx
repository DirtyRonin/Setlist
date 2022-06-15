import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { AutocompleteChangeDetails, AutocompleteChangeReason, AutocompleteInputChangeReason, createFilterOptions } from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';


import { IFilterBandActionProps, IBand, IBandCatalog, IBandEntityActionProps, bandModalActions, ModalTypes } from 'models';
import { FilterBandActionProps, Band } from 'mapping';
import { GUID_EMPTY, IsFilterableString, IsValidFilterableString } from 'utils';

import { addBandToCatalog, deleteBandInCatalog, editBandInCatalog, fetchBandCatalog, setBandFilter } from 'store/actions/catalogActions/bandCatalogActions'
import { RootState } from 'store';
import { CustomEventModalHtmlAttributesConfiguration } from 'configuration/HtmlAttributesConfigs/customEventHtmlAttributes';
import { fetchBandById } from 'service/epicServices/bandCatalogService';
import { InputWrapper } from 'models/error/modalError/modalError';

const BandModalTemplate = React.lazy(() => import('components/modals/BandModalTemplate'))
const DialogTemplate = React.lazy(() => import('components/common/Wrapper/dialogTemplate'))


const CONST_NEW_BAND = 'CREATE A NEW BAND'
const htmlConfig = CustomEventModalHtmlAttributesConfiguration;

function AsyncBandSelect({ bandModalActionsProvider, defaultBandId, bandCatalog, fetchBandCatalog, setBandFilter, setBandId, isReadonly }: props) {

    const defaultModalError: InputWrapper<IBand> = { HasError: false, Message: '', Value: Band.CreateEmpty() }

    const [selectedBand, setSelectedBand] = useState<InputWrapper<IBand>>(defaultModalError)
    const [isLoading, setLoading] = useState(true)
    const [query, setQuery] = useState('')

    const [open, toggleOpen] = useState(false);

    useEffect(() => {
        if (!defaultBandId) {
            setSelectedBand({ ...defaultModalError, HasError: true, Message: 'Please Select a Band' })
            return
        }

        setLoading(true)
        fetchBandById(defaultBandId).then(
            result => {
                setSelectedBand({ ...defaultModalError, Value: result })
                setLoading(false)
            }
        ).catch(
            error=>{
                setSelectedBand({ ...defaultModalError, HasError: true, Message: 'Could not fetch the Band' })
                setLoading(false)
            }
        )
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
        setSelectedBand(defaultModalError)
        setQuery('')

        toggleOpen(false);
    };

    const handleOnChange = (event: React.ChangeEvent<{}>, newValue: IBand | null, reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<IBand> | undefined): void => {
        if (!newValue) {

            //clear this component before you leave it
            setSelectedBand({ ...defaultModalError, HasError: true, Message: 'Please Select a Band' })
            setQuery('')

            // setBandId(0)

        } else if (newValue.id !== GUID_EMPTY) {

            //set the values before you leave it
            setSelectedBand({ ...defaultModalError, Value: newValue })
            setQuery(newValue.title)

            setBandId(newValue.id)


            setBandFilter(FilterBandActionProps.Create({ filter: { Query: '' }, refresh: true }))


        } else {


            setSelectedBand(defaultModalError)
            setQuery('')
            setBandFilter(FilterBandActionProps.Create({ filter: { Query: '' }, refresh: true }))

            //open dialog
            toggleOpen(true);
        }
    }

    const handleOnInputChange = (event: React.ChangeEvent<{}>, value: string, reason: AutocompleteInputChangeReason): void => {
        setQuery(value)

        if (IsFilterableString(bandCatalog.Filter.Query, value)) {
            setBandFilter(FilterBandActionProps.Create({ filter: { Query: value }, refresh: true }))
        }
    }

    const filter = createFilterOptions<IBand>();

    return (
        <Fragment>
            <Autocomplete
                disabled={isReadonly}
                disableClearable
                selectOnFocus
                // clearOnBlur
                handleHomeEndKeys
                value={selectedBand.Value}
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
                    return option.title;
                }}
                loading={isLoading || bandCatalog.Refresh}
                renderInput={(params) => <TextField
                    {...params}
                    label={htmlConfig.Band.Label}
                    error={selectedBand.HasError}
                    type={selectedBand.HasError ? "Error" : 'text'}
                    helperText={selectedBand.Message ?? ''}
                />}
                renderOption={(option, { inputValue }) => {

                    const matches = option.title === CONST_NEW_BAND ? match(option.title, CONST_NEW_BAND) : match(option.title, inputValue);
                    const parts = parse(option.title, matches);

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
                        ...Band.CreateEmpty(),
                        title: CONST_NEW_BAND
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
    defaultBandId: number
    isReadonly: boolean
    setBandId: (id: number) => void
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
