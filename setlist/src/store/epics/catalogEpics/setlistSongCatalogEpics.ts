import { isActionOf, PayloadAction } from "typesafe-actions";
import { combineEpics, Epic, StateObservable } from "redux-observable";
import { from, of } from "rxjs";
import { filter, switchMap, map, catchError, takeUntil } from "rxjs/operators";

import { ISetlistSongCatalogState, SetlistSongCatalogActions } from "store/reducers/catalogReducers/setlistSongCatalogReducer"

import * as Action from "store/actions/catalogActions/setlistSongCatalogActions";

import { deleteSetlistSongInCatalogAsync, editSetlistSongInCatalogAsync, fetchSetlistSongCatalogAsync, fetchSetlistSongCatalogNextLinkAsync, NewSetlistSong, swapSetlistSongs } from "service";
import { RootState } from "store";

import * as snacks from "./snackbarHelper";
import { customSnack } from "./snackbarHelper";

const fetchSetlistSongCatalogsEpic: Epic<SetlistSongCatalogActions, SetlistSongCatalogActions, any> = (action$) =>
    action$.pipe(
        filter(isActionOf(Action.fetchSetlistSongCatalog.request)),
        switchMap(action =>
            from(fetchSetlistSongCatalogAsync(action.payload)).pipe(
                map(Action.fetchSetlistSongCatalog.success),
                catchError((error: Error) => of(Action.fetchSetlistSongCatalog.failure(error)).pipe(
                    map(x => snacks.fetchingFailed)
                )),
                takeUntil(action$.pipe(filter(isActionOf(Action.fetchSetlistSongCatalog.cancel))))
            )
        )
    );

const fetchSetlistSongCatalogNextLinkEpic: Epic<SetlistSongCatalogActions, SetlistSongCatalogActions, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(Action.fetchSetlistSongCatalogNextLink.request)),
        switchMap(action =>
            from(fetchSetlistSongCatalogNextLinkAsync(action.payload)).pipe(
                map(Action.fetchSetlistSongCatalogNextLink.success),
                catchError((error: Error) => of(Action.fetchSetlistSongCatalogNextLink.failure(error)).pipe(
                    map(x => snacks.fetchingFailed)
                )),
                takeUntil(action$.pipe(filter(isActionOf(Action.fetchSetlistSongCatalogNextLink.cancel))))
            )
        )
    );

const addSetlistSongEpic: Epic<SetlistSongCatalogActions, SetlistSongCatalogActions, any> = (action$) => {
    return action$.pipe(
        filter(isActionOf(Action.addSetlistSongToCatalog.request)),
        switchMap(action =>
            from(NewSetlistSong(action.payload)).pipe(
                switchMap(x => [Action.addSetlistSongToCatalog.success(x), snacks.creatingCompleted]),
                // map(Action.addSetlistSongToCatalog.success),
                catchError((error: Error) => of(Action.addSetlistSongToCatalog.failure(error)).pipe(
                    map(x => snacks.creatingFailed)
                )),
                takeUntil(action$.pipe(filter(isActionOf(Action.addSetlistSongToCatalog.cancel))))
            )
        )
    );
}

const editSetlistSongEpic: Epic<SetlistSongCatalogActions, SetlistSongCatalogActions, any> = (action$) => {
    return action$.pipe(
        filter(isActionOf(Action.editSetlistSongInCatalog.request)),
        switchMap(action =>
            from(editSetlistSongInCatalogAsync(action.payload)).pipe(
                switchMap(x => [Action.editSetlistSongInCatalog.success(x), snacks.updatingCompleted]),
                // map(Action.editSetlistSongInCatalog.success),
                catchError((error: Error) => of(Action.editSetlistSongInCatalog.failure(error)).pipe(
                    map(x => snacks.updatingFailed)
                )),
                takeUntil(action$.pipe(filter(isActionOf(Action.editSetlistSongInCatalog.cancel))))
            )
        )
    );
}

const deleteSetlistSongEpic: Epic<SetlistSongCatalogActions, SetlistSongCatalogActions, any> = (action$) => {
    return action$.pipe(
        filter(isActionOf(Action.deleteSetlistSongInCatalog.request)),
        switchMap(action =>
            from(deleteSetlistSongInCatalogAsync(action.payload)).pipe(
                switchMap(x => [Action.deleteSetlistSongInCatalog.success(x), snacks.deletingCompleted]),
                // map(Action.deleteSetlistSongInCatalog.success),
                catchError((error: Error) => of(Action.deleteSetlistSongInCatalog.failure(error)).pipe(
                    map(x => snacks.deletingFailed)
                )),
                takeUntil(action$.pipe(filter(isActionOf(Action.deleteSetlistSongInCatalog.cancel))))
            )
        )
    );
}

const swapSetlistSongEpic: Epic<SetlistSongCatalogActions, SetlistSongCatalogActions, RootState> = (action$, state$) => {

    return action$.pipe(
        filter(isActionOf(Action.swapSetlistSongInCatalog.request)),
        switchMap(action =>
            from(swapSetlistSongs(action.payload)).pipe(
                switchMap(x => [Action.swapSetlistSongInCatalog.success(x), customSnack({ message: "Swapping Completed" })]),
                // map(Action.swapSetlistSongInCatalog.success),
                catchError((error: Error) => of(Action.swapSetlistSongInCatalog.failure(error)).pipe(
                    map(x => customSnack({ message: "Swapping Failed", severity: "error" }))
                )),
                takeUntil(action$.pipe(filter(isActionOf(Action.swapSetlistSongInCatalog.cancel))))
            )
        )
    );
}

export const setlistSongCatalogEpics = combineEpics(
    fetchSetlistSongCatalogsEpic,
    fetchSetlistSongCatalogNextLinkEpic,
    addSetlistSongEpic,
    editSetlistSongEpic,
    deleteSetlistSongEpic,
    swapSetlistSongEpic
)



