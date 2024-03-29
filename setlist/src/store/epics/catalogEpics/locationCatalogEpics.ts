import { isActionOf } from "typesafe-actions";
import { combineEpics, Epic } from "redux-observable";
import { from, of } from "rxjs";
import { filter, switchMap, map, catchError, takeUntil } from "rxjs/operators";

import { LocationCatalogActions } from "store/reducers/catalogReducers/locationCatalogReducer"
import * as Action from "store/actions/catalogActions/locationCatalogActions";

import { addLocationToLocationCatalogAsync, deleteLocationInCatalogAsync, editLocationInCatalogAsync, fetchLocationCatalogAsync, fetchLocationCatalogNextLinkAsync } from "service/epicServices/locationCatalogService";
import * as snacks from "./snackbarHelper";

const fetchLocationCatalogsEpic: Epic<LocationCatalogActions, LocationCatalogActions, any> = (action$) =>
    action$.pipe(
        filter(isActionOf(Action.fetchLocationCatalog.request)),
        switchMap(action =>
            from(fetchLocationCatalogAsync(action.payload)).pipe(
                map(Action.fetchLocationCatalog.success),
                catchError((error: Error) => of(Action.fetchLocationCatalog.failure(error)).pipe(
                    map(x => snacks.fetchingFailed)
                )),
                takeUntil(action$.pipe(filter(isActionOf(Action.fetchLocationCatalog.cancel))))
            )
        )
    );

const fetchLocationCatalogNextLinkEpic: Epic<LocationCatalogActions, LocationCatalogActions, any> = (action$) =>
    action$.pipe(
        filter(isActionOf(Action.fetchLocationCatalogNextLink.request)),
        switchMap(action =>
            from(fetchLocationCatalogNextLinkAsync(action.payload)).pipe(
                map(Action.fetchLocationCatalogNextLink.success),
                catchError((error: Error) => of(Action.fetchLocationCatalogNextLink.failure(error)).pipe(
                    map(x => snacks.fetchingFailed)
                )),
                takeUntil(action$.pipe(filter(isActionOf(Action.fetchLocationCatalogNextLink.cancel))))
            )
        )
    );

const addLocationEpic: Epic<LocationCatalogActions, LocationCatalogActions, any> = (action$) => {
    return action$.pipe(
        filter(isActionOf(Action.addLocationToCatalog.request)),
        switchMap(action =>
            from(addLocationToLocationCatalogAsync(action.payload)).pipe(
                switchMap(x => [Action.addLocationToCatalog.success(x), snacks.creatingCompleted]),
                // map(Action.addLocationToCatalog.success),
                catchError((error: Error) => of(Action.addLocationToCatalog.failure(error)).pipe(
                    map(x => snacks.creatingFailed)
                )),
                takeUntil(action$.pipe(filter(isActionOf(Action.addLocationToCatalog.cancel))))
            )
        )
    );
}

const editLocationEpic: Epic<LocationCatalogActions, LocationCatalogActions, any> = (action$) => {
    return action$.pipe(
        filter(isActionOf(Action.editLocationInCatalog.request)),
        switchMap(action =>
            from(editLocationInCatalogAsync(action.payload)).pipe(
                switchMap(x => [Action.editLocationInCatalog.success(x), snacks.updatingCompleted]),
                // map(Action.editLocationInCatalog.success),
                catchError((error: Error) => of(Action.editLocationInCatalog.failure(error)).pipe(
                    map(x => snacks.updatingFailed)
                )),
                takeUntil(action$.pipe(filter(isActionOf(Action.editLocationInCatalog.cancel))))
            )
        )
    );
}

const deleteLocationEpic: Epic<LocationCatalogActions, LocationCatalogActions, any> = (action$) => {
    return action$.pipe(
        filter(isActionOf(Action.deleteLocationInCatalog.request)),
        switchMap(action =>
            from(deleteLocationInCatalogAsync(action.payload,)).pipe(
                switchMap(x => [Action.deleteLocationInCatalog.success(x), snacks.deletingCompleted]),
                // map(Action.deleteLocationInCatalog.success),
                catchError((error: Error) => of(Action.deleteLocationInCatalog.failure(error)).pipe(
                    map(x => snacks.deletingFailed)
                )),
                takeUntil(action$.pipe(filter(isActionOf(Action.deleteLocationInCatalog.cancel))))
            )
        )
    );
}

export const locationCatalogEpics = combineEpics(
    fetchLocationCatalogsEpic,
    fetchLocationCatalogNextLinkEpic,
    addLocationEpic,
    editLocationEpic,
    deleteLocationEpic,
)