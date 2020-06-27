import { combineEpics, Epic } from "redux-observable";
import { CatalogActions, fetchBandCatalog, RootState, fetchBandCatalogNextLink, addBandToCatalog, editBandInCatalog, deleteBandInCatalog } from "..";
import { filter, switchMap, map, catchError, takeUntil } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { from, of } from "rxjs";
import { fetchBandCatalogAsync, fetchBandCatalogNextLinkAsync, addBandToBandCatalogAsync, editBandInCatalogAsync, deleteBandInCatalogAsync } from "../../service";

const fetchBandCatalogsEpic: Epic<CatalogActions, CatalogActions, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(fetchBandCatalog.request)),
        switchMap(action =>
            from(fetchBandCatalogAsync(action.payload, (state$.value as RootState).catalogReducers.catalogState.catalogs)).pipe(
                map(fetchBandCatalog.success),
                catchError((error: Error) => of(fetchBandCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(fetchBandCatalog.cancel))))
            )
        )
    );

const fetchBandCatalogNextLinkEpic: Epic<CatalogActions, CatalogActions, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(fetchBandCatalogNextLink.request)),
        switchMap(action =>
            from(fetchBandCatalogNextLinkAsync(action.payload, (state$.value as RootState).catalogReducers.catalogState.catalogs)).pipe(
                map(fetchBandCatalogNextLink.success),
                catchError((error: Error) => of(fetchBandCatalogNextLink.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(fetchBandCatalogNextLink.cancel))))
            )
        )
    );

const addBandEpic: Epic<CatalogActions, CatalogActions, any> = (action$, state$) => {
    return action$.pipe(
        filter(isActionOf(addBandToCatalog.request)),
        switchMap(action =>
            from(addBandToBandCatalogAsync(action.payload, (state$.value as RootState).catalogReducers.catalogState.catalogs)).pipe(
                map(addBandToCatalog.success),
                catchError((error: Error) => of(addBandToCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(addBandToCatalog.cancel))))
            )
        )
    );
}

const editBandEpic: Epic<CatalogActions, CatalogActions, any> = (action$, state$) => {
    return action$.pipe(
        filter(isActionOf(editBandInCatalog.request)),
        switchMap(action =>
            from(editBandInCatalogAsync(action.payload, (state$.value as RootState).catalogReducers.catalogState.catalogs)).pipe(
                map(editBandInCatalog.success),
                catchError((error: Error) => of(editBandInCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(editBandInCatalog.cancel))))
            )
        )
    );
}

const deleteSongEpic: Epic<CatalogActions, CatalogActions, any> = (action$, state$) => {
    return action$.pipe(
        filter(isActionOf(deleteBandInCatalog.request)),
        switchMap(action =>
            from(deleteBandInCatalogAsync(action.payload, (state$.value as RootState).catalogReducers.catalogState.catalogs)).pipe(
                map(deleteBandInCatalog.success),
                catchError((error: Error) => of(deleteBandInCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(deleteBandInCatalog.cancel))))
            )
        )
    );
}

export const bandCatalogEpics = combineEpics(
    fetchBandCatalogsEpic,
    fetchBandCatalogNextLinkEpic,
    addBandEpic,
    deleteSongEpic,
    editBandEpic
)