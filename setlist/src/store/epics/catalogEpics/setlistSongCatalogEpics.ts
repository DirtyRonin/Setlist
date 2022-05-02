import { isActionOf, PayloadAction } from "typesafe-actions";
import { combineEpics, Epic, StateObservable } from "redux-observable";
import { from, of } from "rxjs";
import { filter, switchMap, map, catchError, takeUntil } from "rxjs/operators";

import { ISetlistSongCatalogState, SetlistSongCatalogActions } from "store/reducers/catalogReducers/setlistSongCatalogReducer"

import * as Action from "store/actions/catalogActions/setlistSongCatalogActions";

import { deleteSetlistSongInCatalogAsync, editSetlistSongInCatalogAsync, fetchSetlistSongCatalogAsync, fetchSetlistSongCatalogNextLinkAsync, NewSetlistSong } from "service";
import { SwapSetlistSongsRequestAsync } from "api";
import { RootState } from "store";

const fetchSetlistSongCatalogsEpic: Epic<SetlistSongCatalogActions, SetlistSongCatalogActions, any> = (action$) =>
    action$.pipe(
        filter(isActionOf(Action.fetchSetlistSongCatalog.request)),
        switchMap(action =>
            from(fetchSetlistSongCatalogAsync(action.payload)).pipe(
                map(Action.fetchSetlistSongCatalog.success),
                catchError((error: Error) => of(Action.fetchSetlistSongCatalog.failure(error))),
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
                catchError((error: Error) => of(Action.fetchSetlistSongCatalogNextLink.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(Action.fetchSetlistSongCatalogNextLink.cancel))))
            )
        )
    );

const addSetlistSongEpic: Epic<SetlistSongCatalogActions, SetlistSongCatalogActions, any> = (action$) => {
    return action$.pipe(
        filter(isActionOf(Action.addSetlistSongToCatalog.request)),
        switchMap(action =>
            from(NewSetlistSong(action.payload)).pipe(
                map(Action.addSetlistSongToCatalog.success),
                catchError((error: Error) => of(Action.addSetlistSongToCatalog.failure(error))),
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
                map(Action.editSetlistSongInCatalog.success),
                catchError((error: Error) => of(Action.editSetlistSongInCatalog.failure(error))),
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
                map(Action.deleteSetlistSongInCatalog.success),
                catchError((error: Error) => of(Action.deleteSetlistSongInCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(Action.deleteSetlistSongInCatalog.cancel))))
            )
        )
    );
}

const swapSetlistSongEpic: Epic<SetlistSongCatalogActions, SetlistSongCatalogActions, RootState> = (action$, state$) => {

    return action$.pipe(
        filter(isActionOf(Action.swapSetlistSongInCatalog.request)),
        switchMap(action => {

            const ids = getIdsForOrders(action, state$)

            return from(SwapSetlistSongsRequestAsync(ids)).pipe(
                map(Action.swapSetlistSongInCatalog.success),
                catchError((error: Error) => of(Action.swapSetlistSongInCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(Action.swapSetlistSongInCatalog.cancel))))
            )
        }

        )
    );
}

const getIdsForOrders = (action: PayloadAction<"SWAP_SETLISTSONG_REQUEST", number[]>, state$: StateObservable<RootState>): number[] => (
    action.payload.map(
        _ => state$.value.setlistSongCatalogReducers.setlistSongCatalog.Values.find(
            __ => __.order === _
        )?.id ?? -1)


    //     const result: number[] = []
    // action.payload.forEach(
    //     _ => state$.value.setlistSongCatalogReducers.setlistSongCatalog.Values.forEach(
    //         __ => {
    //             if (__.order === _)
    //                 result.push(__.id)
    //         }
    //     )
    // )

    // return result;
)

export const setlistSongCatalogEpics = combineEpics(
    fetchSetlistSongCatalogsEpic,
    fetchSetlistSongCatalogNextLinkEpic,
    addSetlistSongEpic,
    editSetlistSongEpic,
    deleteSetlistSongEpic,
    swapSetlistSongEpic
)



