import { combineEpics, Epic } from "redux-observable";
import { from, of } from "rxjs";
import { filter, switchMap, map, catchError, takeUntil } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";


import { SetlistCatalogActions } from "store/reducers/catalogReducers/setlistCatalogReducer"

import { fetchSetlistCatalog, fetchSetlistCatalogNextLink, fetchSetlistCatalogWithSetlistSongsExpandedByBandSongId } from "store";
import { addSetlistToSetlistCatalogAsync,  deleteSetlistInCatalogAsync,  editSetlistInCatalogAsync,  fetchSetlistCatalogAsync, fetchSetlistCatalogNextLinkAsync, fetchSetlistsWithSetlistSongsByBandSongId } from "service";
import { addSetlistToCatalog, deleteSetlistInCatalog, editSetlistInCatalog } from "store/actions/";

const fetchSetlistCatalogsEpic: Epic<SetlistCatalogActions, SetlistCatalogActions, any> = (action$) =>
    action$.pipe(
        filter(isActionOf(fetchSetlistCatalog.request)),
        switchMap(action =>
            from(fetchSetlistCatalogAsync(action.payload)).pipe(
                map(fetchSetlistCatalog.success),
                catchError((error: Error) => of(fetchSetlistCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(fetchSetlistCatalog.cancel))))
            )
        )
    );

const fetchSetlistCatalogsExpandedByBandSongIdEpic: Epic<SetlistCatalogActions, SetlistCatalogActions, any> = (action$) =>
    action$.pipe(
        filter(isActionOf(fetchSetlistCatalogWithSetlistSongsExpandedByBandSongId.request)),
        switchMap(action =>
            from(fetchSetlistsWithSetlistSongsByBandSongId(action.payload)).pipe(
                map(fetchSetlistCatalogWithSetlistSongsExpandedByBandSongId.success),
                catchError((error: Error) => of(fetchSetlistCatalogWithSetlistSongsExpandedByBandSongId.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(fetchSetlistCatalogWithSetlistSongsExpandedByBandSongId.cancel))))
            )
        )
    );

const fetchSetlistCatalogNextLinkEpic: Epic<SetlistCatalogActions, SetlistCatalogActions, any> = (action$) =>
    action$.pipe(
        filter(isActionOf(fetchSetlistCatalogNextLink.request)),
        switchMap(action =>
            from(fetchSetlistCatalogNextLinkAsync(action.payload)).pipe(
                map(fetchSetlistCatalogNextLink.success),
                catchError((error: Error) => of(fetchSetlistCatalogNextLink.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(fetchSetlistCatalogNextLink.cancel))))
            )
        )
    );

const addSetlistEpic: Epic<SetlistCatalogActions, SetlistCatalogActions, any> = (action$) => {
    return action$.pipe(
        filter(isActionOf(addSetlistToCatalog.request)),
        switchMap(action =>
            from(addSetlistToSetlistCatalogAsync(action.payload)).pipe(
                map(addSetlistToCatalog.success),
                catchError((error: Error) => of(addSetlistToCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(addSetlistToCatalog.cancel))))
            )
        )
    );
}

const editSongEpic: Epic<SetlistCatalogActions, SetlistCatalogActions, any> = (action$) => {
    return action$.pipe(
        filter(isActionOf(editSetlistInCatalog.request)),
        switchMap(action =>
            from(editSetlistInCatalogAsync(action.payload)).pipe(
                map(editSetlistInCatalog.success),
                catchError((error: Error) => of(editSetlistInCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(editSetlistInCatalog.cancel))))
            )
        )
    );
}

const deleteSongEpic: Epic<SetlistCatalogActions, SetlistCatalogActions, any> = (action$) => {
    return action$.pipe(
        filter(isActionOf(deleteSetlistInCatalog.request)),
        switchMap(action =>
            from(deleteSetlistInCatalogAsync(action.payload)).pipe(
                map(deleteSetlistInCatalog.success),
                catchError((error: Error) => of(deleteSetlistInCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(deleteSetlistInCatalog.cancel))))
            )
        )
    );
}

export const setlistCatalogEpics = combineEpics(
    fetchSetlistCatalogsEpic,
    fetchSetlistCatalogNextLinkEpic,
    fetchSetlistCatalogsExpandedByBandSongIdEpic,
    addSetlistEpic,
    editSongEpic,
    deleteSongEpic
)

