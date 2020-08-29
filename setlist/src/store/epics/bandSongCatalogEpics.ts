import { Epic, combineEpics } from "redux-observable";
import { isActionOf } from "typesafe-actions";
import { of, from } from "rxjs";
import { filter, switchMap, map, catchError, takeUntil } from "rxjs/operators";

import { CatalogActions, RootState, openBandSongsCatalog, closeBandSongsCatalog, fetchBandSongCatalog, fetchBandSongCatalogNextLink } from "..";
import { createEmptyBandSongCatalog, closeBandSongCatalog, fetchBandSongCatalogAsync, fetchBandSongCatalogNextLinkAsync } from "../../service";

const fetchBandSongCatalogsEpic: Epic<CatalogActions, CatalogActions, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(fetchBandSongCatalog.request)),
        switchMap(action =>
            from(fetchBandSongCatalogAsync(action.payload, (state$.value as RootState).catalogReducers.catalogState.catalogs)).pipe(
                map(fetchBandSongCatalog.success),
                catchError((error: Error) => of(fetchBandSongCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(fetchBandSongCatalog.cancel))))
            )
        )
    );

const fetchBandSongCatalogNextLinkEpic: Epic<CatalogActions, CatalogActions, any> = (action$, state$) =>
action$.pipe(
    filter(isActionOf(fetchBandSongCatalogNextLink.request)),
    switchMap(action =>
        from(fetchBandSongCatalogNextLinkAsync(action.payload, (state$.value as RootState).catalogReducers.catalogState.catalogs)).pipe(
            map(fetchBandSongCatalogNextLink.success),
            catchError((error: Error) => of(fetchBandSongCatalogNextLink.failure(error))),
            takeUntil(action$.pipe(filter(isActionOf(fetchBandSongCatalogNextLink.cancel))))
        )
    )
);

const addBandSongCatalogEpic: Epic<CatalogActions, CatalogActions, any> = (action$, state$) => {
    return action$.pipe(
        filter(isActionOf(openBandSongsCatalog.request)),
        switchMap((action) =>
            of(createEmptyBandSongCatalog(action.payload,(state$.value as RootState).catalogReducers.catalogState)).pipe(
                map(openBandSongsCatalog.success),
                catchError((error: Error) => of(openBandSongsCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(openBandSongsCatalog.cancel))))
            )
        )
    );
}

const closeBandSongCatalogEpic: Epic<CatalogActions, CatalogActions, any> = (action$, state$) => {
    return action$.pipe(
        filter(isActionOf(closeBandSongsCatalog.request)),
        switchMap((action) =>
            of(closeBandSongCatalog(action.payload,(state$.value as RootState).catalogReducers.catalogState)).pipe(
                map(closeBandSongsCatalog.success),
                catchError((error: Error) => of(closeBandSongsCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(closeBandSongsCatalog.cancel))))
            )
        )
    );
}

export const bandSongCatalogEpics = combineEpics(
    addBandSongCatalogEpic,
    closeBandSongCatalogEpic,
    fetchBandSongCatalogsEpic,
    fetchBandSongCatalogNextLinkEpic
)