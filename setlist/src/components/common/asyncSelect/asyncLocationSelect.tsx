import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { AutocompleteChangeDetails, AutocompleteChangeReason, AutocompleteInputChangeReason, createFilterOptions } from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

import { fetchLocationById } from 'service';
import { IFilterLocationActionProps, ILocation, ILocationCatalog, ILocationEntityActionProps, locationModalActions, ModalTypes } from 'models';
import { FilterLocationActionProps, Location } from 'mapping';
import { GUID_EMPTY, IsFilterableString } from 'utils';

import { addLocationToCatalog, deleteLocationInCatalog, editLocationInCatalog, fetchLocationCatalog, setLocationFilter } from 'store/actions/catalogActions/locationCatalogActions'
import { RootState } from 'store';
import { CustomEventModalHtmlAttributesConfiguration } from 'configuration/HtmlAttributesConfigs/customEventHtmlAttributes';

const LocationModalTemplate = React.lazy(() => import('components/modals/locationModalTemplate'))
const DialogTemplate = React.lazy(() => import('components/common/Wrapper/dialogTemplate'))


const CONST_NEW_LOCATION = 'CREATE A NEW LOCATION'
const htmlConfig = CustomEventModalHtmlAttributesConfiguration;

function AsyncLocationSelect({ locationModalActionsProvider, defaultLocationId, locationCatalog, fetchLocationCatalog, setLocationFilter, setLocationId, isReadonly }: props) {

    const [selectedLocation, setSelectedLocation] = useState(Location.EmptyLocation())
    const [isLoading, setLoading] = useState(true)
    const [query, setQuery] = useState('')

    const [open, toggleOpen] = useState(false);

    useEffect(() => {
        if (defaultLocationId) {
            setLoading(true)
            fetchLocationById(defaultLocationId).then(
                result => {
                    setSelectedLocation(result)
                    setLoading(false)
                }
            )
        }
    }, [])

    useEffect(() => {
        const filter = FilterLocationActionProps.CreateFromCatalog(locationCatalog)
        fetchLocationCatalog(filter)
    }, [])

    useEffect(() => {
        if (locationCatalog.Refresh) {
            const filter = FilterLocationActionProps.CreateFromCatalog(locationCatalog)
            fetchLocationCatalog(filter)
        }
    }, [locationCatalog.Refresh])

    const handleClose = () => {
        setLocationFilter(FilterLocationActionProps.Create({ filter: { Query: '' }, refresh: false }))
        setSelectedLocation(Location.EmptyLocation())
        setQuery('')

        toggleOpen(false);
    };

    const handleOnChange = (event: React.ChangeEvent<{}>, newValue: ILocation | null, reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<ILocation> | undefined): void => {
        if (!newValue) {

            //clear this component before you leave it
            setSelectedLocation(Location.EmptyLocation())
            setQuery('')

            setLocationId(null)

        } else if (newValue.Id !== GUID_EMPTY) {

            setSelectedLocation(newValue)
            setQuery(newValue.Name)

            setLocationId(newValue.Id)


            setLocationFilter(FilterLocationActionProps.Create({ filter: { Query: '' }, refresh: true }))


        } else {

            setSelectedLocation(Location.EmptyLocation())
            setQuery('')
            setLocationFilter(FilterLocationActionProps.Create({ filter: { Query: '' }, refresh: true }))

            //open dialog
            toggleOpen(true);
        }
    }

    const handleOnInputChange = (event: React.ChangeEvent<{}>, value: string, reason: AutocompleteInputChangeReason): void => {
        setQuery(value)

        const refresh = reason === "input" && IsFilterableString(locationCatalog.Filter.Query, value) ? true : false
        if (refresh) {
            setLocationFilter(FilterLocationActionProps.Create({ filter: { Query: value }, refresh }))
        }
    }
    // const handleOnOpen = (event: React.ChangeEvent<{}>): void => {
    //     setLoading(true)
    // }

    const filter = createFilterOptions<ILocation>();

    return (
        <Fragment>
            <Autocomplete
                disabled={isReadonly}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                value={selectedLocation}
                onChange={handleOnChange}
                inputValue={query}
                onInputChange={handleOnInputChange}
                id={htmlConfig.Location.ControlId}
                options={Array.from(locationCatalog.Values.values())}
                getOptionLabel={(option) => {
                    // e.g value selected with enter, right from the input
                    if (typeof option === 'string') {
                        return option;
                    }
                    return option.Name;
                }}
                loading={isLoading || locationCatalog.Refresh}
                renderInput={(params) => <TextField
                    {...params}
                    label={htmlConfig.Location.Label}
                />}
                renderOption={(option, { inputValue }) => {

                    const matches = option.Name === CONST_NEW_LOCATION ? match(option.Name, CONST_NEW_LOCATION) : match(option.Name, inputValue);
                    const parts = parse(option.Name, matches);

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
                    const filtered = filter(options, params) as ILocation[];

                    filtered.unshift({
                        ...Location.EmptyLocation(),
                        Name: CONST_NEW_LOCATION
                    });

                    return filtered;
                }}
            />

            <DialogTemplate
                open={open}
                title={locationCatalog.Title}
                close={handleClose}
            >
                <LocationModalTemplate
                    locationModalActionsProvider={locationModalActionsProvider}
                    handleClose={handleClose}
                    query={`?$type=${ModalTypes.New}`}
                />
            </DialogTemplate>
        </Fragment>
    );
}

interface IConnectedDispatch {
    locationModalActionsProvider: locationModalActions
    setLocationFilter(props: IFilterLocationActionProps): void
    fetchLocationCatalog: (props: IFilterLocationActionProps) => void
}

interface IProps {
    defaultLocationId: string | null
    isReadonly: boolean
    setLocationId: (id: string | null) => void
}

interface IStateProps extends IProps {
    locationCatalog: ILocationCatalog
}

type props = IStateProps & IConnectedDispatch;

const mapStateToProps = (state: RootState, props: IProps): IStateProps =>
({
    defaultLocationId: props.defaultLocationId,
    locationCatalog: state.locationCatalogReducers.locationCatalog,
    setLocationId: props.setLocationId,
    isReadonly: props.isReadonly
})

const mapDispatchToProps = (dispatch: React.Dispatch<any>): IConnectedDispatch => ({
    locationModalActionsProvider: {
        None: () => { },
        New: (props: ILocationEntityActionProps) => dispatch(addLocationToCatalog.request(props)),
        Edit: (props: ILocationEntityActionProps) => dispatch(editLocationInCatalog.request(props)),
        Remove: (props: ILocationEntityActionProps) => dispatch(deleteLocationInCatalog.request(props)),
        Read: () => { },
        Add: () => { },
        ShowCatalog: () => { }
    },
    setLocationFilter: (props: IFilterLocationActionProps) => dispatch(setLocationFilter(props)),
    fetchLocationCatalog: (props: IFilterLocationActionProps) => dispatch(fetchLocationCatalog.request(props)),

})


export default connect(mapStateToProps, mapDispatchToProps)(AsyncLocationSelect)
