import { Epic, combineEpics } from "redux-observable";
import { from, of } from "rxjs";
import { filter, switchMap, map, catchError, takeUntil } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";

import { CatalogActions } from "../../index"
import { RootState } from "../../reducers";
import * as Action from "../../actions";
import { addSongToCatalog, fetchSongCatalog, fetchSongCatalogNextLink, editSongInCatalog, deleteSongInCatalog } from "../../actions";
import { addSongToSongCatalogAsync , fetchSongCatalogAsync, fetchSongCatalogNextLinkAsync, editSongInCatalogAsync, deleteSongInCatalogAsync, createEmptySongCatalog, closeSongCatalog, createEmptySongCatalog_New } from "../../../service";


const openBandCatalogEpic_New: Epic<CatalogActions, CatalogActions, any> = (action$, state$) => {
    return action$.pipe(
        filter(isActionOf(Action.openBandsCatalog_New.request)),
        switchMap(() =>
            of(createEmptySongCatalog_New((state$.value as RootState).catalogReducers.catalogState.catalogs)).pipe(
                map(Action.openBandsCatalog_New.success),
                catchError((error: Error) => of(Action.openBandsCatalog_New.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(Action.openBandsCatalog_New.cancel))))
            )
        )
    );
}

const openSongCatalogEpic: Epic<CatalogActions, CatalogActions, any> = (action$, state$) => {
    return action$.pipe(
        filter(isActionOf(Action.openSongsCatalog.request)),
        switchMap((action) =>
            of(createEmptySongCatalog(action.payload,(state$.value as RootState).catalogReducers.catalogState)).pipe(
                map(Action.openSongsCatalog.success),
                catchError((error: Error) => of(Action.openSongsCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(Action.openSongsCatalog.cancel))))
            )
        )
    );
}

const closeBandSongCatalogEpic: Epic<CatalogActions, CatalogActions, any> = (action$, state$) => {
    return action$.pipe(
        filter(isActionOf(Action.closeSongsCatalog.request)),
        switchMap((action) =>
            of(closeSongCatalog(action.payload,(state$.value as RootState).catalogReducers.catalogState)).pipe(
                map(Action.closeSongsCatalog.success),
                catchError((error: Error) => of(Action.closeSongsCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(Action.closeSongsCatalog.cancel))))
            )
        )
    );
}

const fetchSongCatalogsEpic: Epic<CatalogActions, CatalogActions, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(fetchSongCatalog.request)),
        switchMap(action =>
            from(fetchSongCatalogAsync(action.payload, (state$.value as RootState).catalogReducers.catalogState.catalogs)).pipe(
                map(fetchSongCatalog.success),
                catchError((error: Error) => of(fetchSongCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(fetchSongCatalog.cancel))))
            )
        )
    );

const fetchSongCatalogNextLinkEpic: Epic<CatalogActions, CatalogActions, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(fetchSongCatalogNextLink.request)),
        switchMap(action =>
            from(fetchSongCatalogNextLinkAsync(action.payload, (state$.value as RootState).catalogReducers.catalogState.catalogs)).pipe(
                map(fetchSongCatalogNextLink.success),
                catchError((error: Error) => of(fetchSongCatalogNextLink.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(fetchSongCatalogNextLink.cancel))))
            )
        )
    );

const addSongEpic: Epic<CatalogActions, CatalogActions, any> = (action$, state$) => {
    return action$.pipe(
        filter(isActionOf(addSongToCatalog.request)),
        switchMap(action =>
            from(addSongToSongCatalogAsync(action.payload, (state$.value as RootState).catalogReducers.catalogState.catalogs)).pipe(
                map(addSongToCatalog.success),
                catchError((error: Error) => of(addSongToCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(addSongToCatalog.cancel))))
            )
        )
    );
}

const editSongEpic: Epic<CatalogActions, CatalogActions, any> = (action$, state$) => {
    return action$.pipe(
        filter(isActionOf(editSongInCatalog.request)),
        switchMap(action =>
            from(editSongInCatalogAsync(action.payload, (state$.value as RootState).catalogReducers.catalogState.catalogs)).pipe(
                map(editSongInCatalog.success),
                catchError((error: Error) => of(editSongInCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(editSongInCatalog.cancel))))
            )
        )
    );
}

const deleteSongEpic: Epic<CatalogActions, CatalogActions, any> = (action$, state$) => {
    return action$.pipe(
        filter(isActionOf(deleteSongInCatalog.request)),
        switchMap(action =>
            from(deleteSongInCatalogAsync(action.payload, (state$.value as RootState).catalogReducers.catalogState.catalogs)).pipe(
                map(deleteSongInCatalog.success),
                catchError((error: Error) => of(deleteSongInCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(deleteSongInCatalog.cancel))))
            )
        )
    );
}


export const songCatalogEpics = combineEpics(
    closeBandSongCatalogEpic,
    openSongCatalogEpic,
    addSongEpic,
    editSongEpic, 
    deleteSongEpic,
    fetchSongCatalogNextLinkEpic,
    fetchSongCatalogsEpic,
    // filterSongEpic,
)

