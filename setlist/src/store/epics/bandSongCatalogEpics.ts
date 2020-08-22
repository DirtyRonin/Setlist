import { Epic, combineEpics } from "redux-observable";
import { isActionOf } from "typesafe-actions";
import { of } from "rxjs";
import { filter, switchMap, map, catchError, takeUntil } from "rxjs/operators";

import { CatalogActions, RootState, openBandSongsCatalog, closeBandSongsCatalog } from "..";
import { createEmptyBandSongCatalog, closeBandSongCatalog } from "../../service";



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
    closeBandSongCatalogEpic
)