import { Epic, combineEpics } from "redux-observable";
import { from, of } from "rxjs";
import { filter, switchMap, map, catchError, takeUntil } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";

import { SongCatalogActions } from "store/reducers/catalogReducers/songCatalogReducer"

import { addSongToCatalog, fetchSongCatalog, fetchSongCatalogNextLink, editSongInCatalog, deleteSongInCatalog } from "store/actions";
import { addSongToSongCatalogAsync, fetchSongCatalogAsync, fetchSongCatalogNextLinkAsync, editSongInCatalogAsync, deleteSongInCatalogAsync } from "service";

const fetchSongCatalogsEpic: Epic<SongCatalogActions, SongCatalogActions, any> = (action$) =>
    action$.pipe(
        filter(isActionOf(fetchSongCatalog.request)),
        switchMap(action =>
            from(fetchSongCatalogAsync(action.payload)).pipe(
                map(fetchSongCatalog.success),
                catchError((error: Error) => of(fetchSongCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(fetchSongCatalog.cancel))))
            )
        )
    );

const fetchSongCatalogNextLinkEpic: Epic<SongCatalogActions, SongCatalogActions, any> = (action$) =>
    action$.pipe(
        filter(isActionOf(fetchSongCatalogNextLink.request)),
        switchMap(action =>
            from(fetchSongCatalogNextLinkAsync(action.payload)).pipe(
                map(fetchSongCatalogNextLink.success),
                catchError((error: Error) => of(fetchSongCatalogNextLink.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(fetchSongCatalogNextLink.cancel))))
            )
        )
    );

const addSongEpic: Epic<SongCatalogActions, SongCatalogActions, any> = (action$) => {
    return action$.pipe(
        filter(isActionOf(addSongToCatalog.request)),
        switchMap(action =>
            from(addSongToSongCatalogAsync(action.payload)).pipe(
                map(addSongToCatalog.success),
                catchError((error: Error) => of(addSongToCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(addSongToCatalog.cancel))))
            )
        )
    );
}

const editSongEpic: Epic<SongCatalogActions, SongCatalogActions, any> = (action$) => {
    return action$.pipe(
        filter(isActionOf(editSongInCatalog.request)),
        switchMap(action =>
            from(editSongInCatalogAsync(action.payload)).pipe(
                map(editSongInCatalog.success),
                catchError((error: Error) => of(editSongInCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(editSongInCatalog.cancel))))
            )
        )
    );
}

const deleteSongEpic: Epic<SongCatalogActions, SongCatalogActions, any> = (action$) => {
    return action$.pipe(
        filter(isActionOf(deleteSongInCatalog.request)),
        switchMap(action =>
            from(deleteSongInCatalogAsync(action.payload,)).pipe(
                map(deleteSongInCatalog.success),
                catchError((error: Error) => of(deleteSongInCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(deleteSongInCatalog.cancel))))
            )
        )
    );
}


export const songCatalogEpics = combineEpics(
    addSongEpic,
    editSongEpic,
    deleteSongEpic,
    fetchSongCatalogNextLinkEpic,
    fetchSongCatalogsEpic,
)

