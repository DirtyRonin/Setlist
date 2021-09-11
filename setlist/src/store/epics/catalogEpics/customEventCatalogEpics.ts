import { combineEpics, Epic } from "redux-observable";
import { isActionOf } from "typesafe-actions";
import { from, of } from "rxjs";
import { filter, switchMap, map, catchError, takeUntil } from "rxjs/operators";

import * as Action from "store/actions/catalogActions/customEventCatalogActions";
import { CustomEventCatalogActions } from "store/reducers/catalogReducers/customEventCatalogReducer";
import { addCustomEventToCustomEventCatalogAsync, deleteCustomEventInCatalogAsync, editCustomEventInCatalogAsync, fetchCustomEventCatalogAsync, fetchCustomEventCatalogNextLinkAsync } from "service/epicServices/customEventCatalogService";

const fetchCustomEventCatalogsEpic: Epic<CustomEventCatalogActions, CustomEventCatalogActions, any> = (action$) =>
    action$.pipe(
        filter(isActionOf(Action.fetchCustomEventCatalog.request)),
        switchMap(action =>
            from(fetchCustomEventCatalogAsync(action.payload)).pipe(
                map(Action.fetchCustomEventCatalog.success),
                catchError((error: Error) => of(Action.fetchCustomEventCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(Action.fetchCustomEventCatalog.cancel))))
            )
        )
    );

const fetchCustomEventCatalogNextLinkEpic: Epic<CustomEventCatalogActions, CustomEventCatalogActions, any> = (action$) =>
    action$.pipe(
        filter(isActionOf(Action.fetchCustomEventCatalogNextLink.request)),
        switchMap(action =>
            from(fetchCustomEventCatalogNextLinkAsync(action.payload)).pipe(
                map(Action.fetchCustomEventCatalogNextLink.success),
                catchError((error: Error) => of(Action.fetchCustomEventCatalogNextLink.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(Action.fetchCustomEventCatalogNextLink.cancel))))
            )
        )
    );

const addCustomEventEpic: Epic<CustomEventCatalogActions, CustomEventCatalogActions, any> = (action$) => {
    return action$.pipe(
        filter(isActionOf(Action.addCustomEventToCatalog.request)),
        switchMap(action =>
            from(addCustomEventToCustomEventCatalogAsync(action.payload)).pipe(
                map(Action.addCustomEventToCatalog.success),
                catchError((error: Error) => of(Action.addCustomEventToCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(Action.addCustomEventToCatalog.cancel))))
            )
        )
    );
}

const editCustomEventEpic: Epic<CustomEventCatalogActions, CustomEventCatalogActions, any> = (action$) => {
    return action$.pipe(
        filter(isActionOf(Action.editCustomEventInCatalog.request)),
        switchMap(action =>
            from(editCustomEventInCatalogAsync(action.payload)).pipe(
                map(Action.editCustomEventInCatalog.success),
                catchError((error: Error) => of(Action.editCustomEventInCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(Action.editCustomEventInCatalog.cancel))))
            )
        )
    );
}

const deleteCustomEventEpic: Epic<CustomEventCatalogActions, CustomEventCatalogActions, any> = (action$) => {
    return action$.pipe(
        filter(isActionOf(Action.deleteCustomEventInCatalog.request)),
        switchMap(action =>
            from(deleteCustomEventInCatalogAsync(action.payload,)).pipe(
                map(Action.deleteCustomEventInCatalog.success),
                catchError((error: Error) => of(Action.deleteCustomEventInCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(Action.deleteCustomEventInCatalog.cancel))))
            )
        )
    );
}



export const customEventCatalogEpics = combineEpics(
    fetchCustomEventCatalogsEpic,
    fetchCustomEventCatalogNextLinkEpic,
    addCustomEventEpic,
    editCustomEventEpic,
    deleteCustomEventEpic
)
