import { combineEpics, Epic } from "redux-observable";
import { isActionOf } from "typesafe-actions";
import { from, of } from "rxjs";
import { filter, switchMap, map, catchError, takeUntil } from "rxjs/operators";


import * as Action from "store/actions/catalogActions/customEventCatalogActions";
import * as commonActions from "store/actions/commonActions";
import { CustomEventCatalogActions } from "store/reducers/catalogReducers/customEventCatalogReducer";
import { addCustomEventToCustomEventCatalogAsync, deleteCustomEventInCatalogAsync, editCustomEventInCatalogAsync, fetchCustomEventCatalogAsync, fetchCustomEventCatalogNextLinkAsync } from "service/epicServices/customEventCatalogService";
import * as snacks from "./snackbarHelper";

const fetchCustomEventCatalogsEpic: Epic<CustomEventCatalogActions, CustomEventCatalogActions, any> = (action$) =>
    action$.pipe(
        filter(isActionOf(Action.fetchCustomEventCatalog.request)),
        switchMap(action =>
            from(fetchCustomEventCatalogAsync(action.payload)).pipe(
                switchMap(x => [Action.fetchCustomEventCatalog.success(x)]),
                catchError((error: Error) => of(Action.fetchCustomEventCatalog.failure(error)).pipe(
                    map(x => snacks.fetchingFailed)
                )),
                takeUntil(action$.pipe(filter(isActionOf(Action.fetchCustomEventCatalog.cancel))))
            )
            // .subscribe(x => snacks.fetchingCompleted)
        )
    );

const fetchCustomEventCatalogNextLinkEpic: Epic<CustomEventCatalogActions, CustomEventCatalogActions, any> = (action$) =>
    action$.pipe(
        filter(isActionOf(Action.fetchCustomEventCatalogNextLink.request)),
        switchMap(action =>
            from(fetchCustomEventCatalogNextLinkAsync(action.payload)).pipe(
                map(Action.fetchCustomEventCatalogNextLink.success),
                // map(x => snacks.fetchingCompleted),
                catchError((error: Error) => of(Action.fetchCustomEventCatalogNextLink.failure(error)).pipe(
                    map(x => snacks.fetchingFailed)
                )),
                takeUntil(action$.pipe(filter(isActionOf(Action.fetchCustomEventCatalogNextLink.cancel))))
            )
        )
    );

const addCustomEventEpic: Epic<CustomEventCatalogActions, CustomEventCatalogActions, any> = (action$) => {
    return action$.pipe(
        filter(isActionOf(Action.addCustomEventToCatalog.request)),
        switchMap(action =>
            from(addCustomEventToCustomEventCatalogAsync(action.payload)).pipe(
                switchMap(x => [Action.addCustomEventToCatalog.success(x), snacks.creatingCompleted]),
                catchError((error: Error) => of(Action.addCustomEventToCatalog.failure(error)).pipe(
                    map(x => snacks.creatingFailed)
                )),
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
                switchMap(x => [Action.editCustomEventInCatalog.success(x), snacks.updatingCompleted]),
                catchError((error: Error) => {
                    return of(map(x => Action.editCustomEventInCatalog.failure(error))).pipe(
                        map(x => snacks.updatingFailed)
                    )
                }),
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
                switchMap(x => [Action.deleteCustomEventInCatalog.success(x), snacks.deletingCompleted]),
                catchError((error: Error) => of(Action.deleteCustomEventInCatalog.failure(error)).pipe(
                    map(x => snacks.deletingFailed)
                )),
                takeUntil(action$.pipe(filter(isActionOf(Action.deleteCustomEventInCatalog.cancel))))
            )
        )
    );
}

// const handlecustomEventSnackbarEpic: Epic<CustomEventCatalogActions, CustomEventCatalogActions, any> = (action$) => {
//     return action$.pipe(
//         filter(isActionOf(Action.editCustomEventInCatalog.request)),
//         switchMap(action =>
//             from(editCustomEventInCatalogAsync(action.payload)).pipe(
//                 map(Action.editCustomEventInCatalog.success),
//                 catchError((error: Error) => of(Action.editCustomEventInCatalog.failure(error))),
//                 takeUntil(action$.pipe(filter(isActionOf(Action.editCustomEventInCatalog.cancel))))
//             )
//         )
//     );
// }

const stuff = commonActions.pushToSnackbar({ message: 'Updating Failed', severity: "error" })


export const customEventCatalogEpics = combineEpics(
    fetchCustomEventCatalogsEpic,
    fetchCustomEventCatalogNextLinkEpic,
    addCustomEventEpic,
    editCustomEventEpic,
    deleteCustomEventEpic,
    // handlecustomEventSnackbarEpic
)
