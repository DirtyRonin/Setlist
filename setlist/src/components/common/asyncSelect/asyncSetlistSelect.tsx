import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { AutocompleteChangeDetails, AutocompleteChangeReason, AutocompleteInputChangeReason, createFilterOptions } from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

import { fetchSetlistById } from 'service';
import { IFilterSetlistActionProps, ISetlist, ISetlistCatalog, ISetlistEntityActionProps, setlistModalActions, ModalTypes } from 'models';
import { FilterSetlistActionProps, Setlist } from 'mapping';
import { GUID_EMPTY, IsFilterableString } from 'utils';

import { addSetlistToCatalog, deleteSetlistInCatalog, editSetlistInCatalog, fetchSetlistCatalog, setSetlistFilter } from 'store/actions/catalogActions/setlistCatalogActions'
import { RootState } from 'store';
import { CustomEventModalHtmlAttributesConfiguration } from 'configuration/HtmlAttributesConfigs/customEventHtmlAttributes';

const DialogTemplate = React.lazy(() => import('components/common/Wrapper/dialogTemplate'))
const SetlistModalTemplate = React.lazy(() => import('components/modals/setlistModalTemplate'))


const CONST_NEW_SETLIST = 'CREATE A NEW SETLIST'
const htmlConfig = CustomEventModalHtmlAttributesConfiguration;

function AsyncSetlistSelect({ setlistModalActionsProvider, defaultSetlistId, setlistCatalog, fetchSetlistCatalog, setSetlistFilter, setSetlistId, isReadonly }: props) {

    const [selectedSetlist, setSelectedSetlist] = useState(Setlist.CreateEmpty())
    const [isLoading, setLoading] = useState(true)
    const [query, setQuery] = useState('')

    const [open, toggleOpen] = useState(false);

    useEffect(() => {
        if (defaultSetlistId) {
            setLoading(true)
            fetchSetlistById(defaultSetlistId).then(
                result => {
                    setSelectedSetlist(result)
                    setLoading(false)
                }
            )
        }
    }, [])

    useEffect(() => {
        const filter = FilterSetlistActionProps.CreateFromCatalog(setlistCatalog)
        fetchSetlistCatalog(filter)
    }, [])

    useEffect(() => {
        if (setlistCatalog.Refresh) {
            const filter = FilterSetlistActionProps.CreateFromCatalog(setlistCatalog)
            fetchSetlistCatalog(filter)
        }
    }, [setlistCatalog.Refresh])

    const handleClose = () => {
        setSetlistFilter(FilterSetlistActionProps.Create({ filter: { Query: '' }, refresh: false }))
        setSelectedSetlist(Setlist.CreateEmpty())
        setQuery('')

        toggleOpen(false);
    };

    const handleOnChange = (event: React.ChangeEvent<{}>, newValue: ISetlist | null, reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<ISetlist> | undefined): void => {
        if (!newValue) {

            //clear this component before you leave it
            setSelectedSetlist(Setlist.CreateEmpty())
            setQuery('')

            setSetlistId(null)

        } else if (newValue.id !== GUID_EMPTY) {

            //set the values before you leave it
            setSelectedSetlist(newValue)
            setQuery(newValue.title)

            setSetlistId(newValue.id)


            setSetlistFilter(FilterSetlistActionProps.Create({ filter: { Query: '' }, refresh: true }))


        } else {


            setSelectedSetlist(Setlist.CreateEmpty())
            setQuery('')
            setSetlistFilter(FilterSetlistActionProps.Create({ filter: { Query: '' }, refresh: true }))

            //open dialog
            toggleOpen(true);
        }
    }

    const handleOnInputChange = (event: React.ChangeEvent<{}>, value: string, reason: AutocompleteInputChangeReason): void => {
        setQuery(value)

        const refresh = reason === "input" && IsFilterableString(setlistCatalog.Filter.Query, value) ? true : false
        if (refresh) {
            setSetlistFilter(FilterSetlistActionProps.Create({ filter: { Query: value }, refresh }))
        }
    }

    const filter = createFilterOptions<ISetlist>();

    return (
        <Fragment>
            <Autocomplete
                disabled={isReadonly}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                value={selectedSetlist}
                onChange={handleOnChange}
                inputValue={query}
                onInputChange={handleOnInputChange}
                id={htmlConfig.Setlist.ControlId}
                options={Array.from(setlistCatalog.Values.values())}
                getOptionLabel={(option) => {
                    // e.g value selected with enter, right from the input
                    if (typeof option === 'string') {
                        return option;
                    }
                    return option.title;
                }}
                loading={isLoading || setlistCatalog.Refresh}
                renderInput={(params) => <TextField
                    {...params}
                    label={htmlConfig.Setlist.Label}
                />}
                renderOption={(option, { inputValue }) => {

                    const matches = option.title === CONST_NEW_SETLIST ? match(option.title, CONST_NEW_SETLIST) : match(option.title, inputValue);
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
                    const filtered = filter(options, params) as ISetlist[];

                    filtered.unshift({
                        ...Setlist.CreateEmpty(),
                        title: CONST_NEW_SETLIST
                    });

                    return filtered;
                }}
            />

            <DialogTemplate
                open={open}
                title={setlistCatalog.Title}
                close={handleClose}
            >
                <SetlistModalTemplate
                    setlistModalActionsProvider={setlistModalActionsProvider}
                    handleClose={handleClose}
                    query={`?$type=${ModalTypes.New}`}
                />
            </DialogTemplate>
        </Fragment>
    );
}

interface IConnectedDispatch {
    setlistModalActionsProvider: setlistModalActions
    setSetlistFilter(props: IFilterSetlistActionProps): void
    fetchSetlistCatalog: (props: IFilterSetlistActionProps) => void
}

interface IProps {
    defaultSetlistId: string | null
    isReadonly: boolean
    setSetlistId: (id: string | null) => void
}

interface IStateProps extends IProps {
    setlistCatalog: ISetlistCatalog
}

type props = IStateProps & IConnectedDispatch;

const mapStateToProps = (state: RootState, props: IProps): IStateProps =>
({
    defaultSetlistId: props.defaultSetlistId,
    setlistCatalog: state.setlistCatalogReducers.setlistCatalog,
    setSetlistId: props.setSetlistId,
    isReadonly: props.isReadonly
})

const mapDispatchToProps = (dispatch: React.Dispatch<any>): IConnectedDispatch => ({
    setlistModalActionsProvider: {
        None: () => { },
        New: (props: ISetlistEntityActionProps) => dispatch(addSetlistToCatalog.request(props)),
        Edit: (props: ISetlistEntityActionProps) => dispatch(editSetlistInCatalog.request(props)),
        Remove: (props: ISetlistEntityActionProps) => dispatch(deleteSetlistInCatalog.request(props)),
        Read: () => { },
        Add: () => { },
        ShowCatalog: () => { }
    },
    setSetlistFilter: (props: IFilterSetlistActionProps) => dispatch(setSetlistFilter(props)),
    fetchSetlistCatalog: (props: IFilterSetlistActionProps) => dispatch(fetchSetlistCatalog.request(props)),

})


export default connect(mapStateToProps, mapDispatchToProps)(AsyncSetlistSelect)
