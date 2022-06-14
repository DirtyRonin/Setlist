import { Epic, combineEpics } from "redux-observable";
import { from, of } from "rxjs";
import { filter, switchMap, map, catchError, takeUntil } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";

import { SongCatalogActions } from "store/reducers/catalogReducers/songCatalogReducer"

import { addSongToCatalog, fetchSongCatalog, fetchSongCatalogNextLink, editSongInCatalog, deleteSongInCatalog } from "store/actions";
import { addSongToSongCatalogAsync, fetchSongCatalogAsync, fetchSongCatalogNextLinkAsync, editSongInCatalogAsync, deleteSongInCatalogAsync } from "service";

import * as snacks from "./snackbarHelper";

const fetchSongCatalogsEpic: Epic<SongCatalogActions, SongCatalogActions, any> = (action$) =>
    action$.pipe(
        filter(isActionOf(fetchSongCatalog.request)),
        switchMap(action =>
            from(fetchSongCatalogAsync(action.payload)).pipe(
                map(fetchSongCatalog.success),
                catchError((error) => of(fetchSongCatalog.failure(error)).pipe(
                    map(x => snacks.fetchingFailed(error.response.status,error.response.data.message))
                )),
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
                catchError((error) => of(fetchSongCatalogNextLink.failure(error)).pipe(
                    map(x => snacks.fetchingFailed(error.response.status,error.response.data.message))
                )),
                takeUntil(action$.pipe(filter(isActionOf(fetchSongCatalogNextLink.cancel))))
            )
        )
    );

const addSongEpic: Epic<SongCatalogActions, SongCatalogActions, any> = (action$) => {
    return action$.pipe(
        filter(isActionOf(addSongToCatalog.request)),
        switchMap(action =>
            from(addSongToSongCatalogAsync(action.payload)).pipe(
                switchMap(x => [addSongToCatalog.success(x), snacks.creatingCompleted]),
                // map(addSongToCatalog.success),
                catchError((error) => of(addSongToCatalog.failure(error)).pipe(
                    map(x => snacks.creatingFailed(error.response.status,error.response.data.message))
                )),
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
                switchMap(x => [editSongInCatalog.success(x), snacks.updatingCompleted]),
                // map(editSongInCatalog.success),
                catchError((error) => of(editSongInCatalog.failure(error)).pipe(
                    map(x => snacks.updatingFailed(error.response.status,error.response.data.message))
                )),
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
                switchMap(x => [deleteSongInCatalog.success(x), snacks.deletingCompleted]),
                // map(deleteSongInCatalog.success),
                catchError((error) => of(deleteSongInCatalog.failure(error)).pipe(
                    map(x => snacks.deletingFailed(error.response.status,error.response.data.message))
                )),
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

