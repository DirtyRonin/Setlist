import { Epic, combineEpics } from "redux-observable";
import { from, of } from "rxjs";
import { filter, switchMap, map, catchError, takeUntil } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";

import { CatalogActions } from "../index"
import {  ICatalogState, RootState } from "../reducers";
import { newSong, fetchSongCatalog, setSongCatalogFilter, fetchSongCatalogNextLink } from "../actions";
import { CreateSongAsync, createEmptySongCatalog, AddSongToSongCatalogAsync, FetchSongCatalogAsync, FilterSongCatalogAsync, fetchSongCatalogNextLinkAsync } from "../../service";
import { HashTable } from "../../Util";
import { ISongCatalog } from "../../models";

const fetchSongCatalogsEpic: Epic<CatalogActions, CatalogActions, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(fetchSongCatalog.request)),
        switchMap(action =>
            from(FetchSongCatalogAsync(action.payload,(state$.value as RootState).catalogReducers.catalogState.catalogs)).pipe(
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
            from(fetchSongCatalogNextLinkAsync(action.payload,(state$.value as RootState).catalogReducers.catalogState.catalogs)).pipe(
                map(fetchSongCatalogNextLink.success),
                catchError((error: Error) => of(fetchSongCatalogNextLink.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(fetchSongCatalogNextLink.cancel))))
            )
        )
    );

const addSongEpic: Epic<CatalogActions, CatalogActions, any> = (action$, state$) =>  {
    return  action$.pipe(
        filter(isActionOf(newSong.request)),
        switchMap(action =>
            from(AddSongToSongCatalogAsync(action.payload,(state$.value as RootState).catalogReducers.catalogState.catalogs)).pipe(
                map(newSong.success),
                catchError((error: Error) => of(newSong.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(newSong.cancel))))
            )
        )
    );
}

const filterSongEpic:Epic<CatalogActions, CatalogActions, any> = (action$, state$) =>  {
    return  action$.pipe(
        filter(isActionOf(setSongCatalogFilter.request)),
        switchMap(action =>
            from(FilterSongCatalogAsync(action.payload,(state$.value as RootState).catalogReducers.catalogState.catalogs)).pipe(
                map(setSongCatalogFilter.success),
                catchError((error: Error) => of(setSongCatalogFilter.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(setSongCatalogFilter.cancel))))
            )
        )
    );
}
    


export const catalogEpics = combineEpics(addSongEpic,fetchSongCatalogsEpic,filterSongEpic,fetchSongCatalogNextLinkEpic)
