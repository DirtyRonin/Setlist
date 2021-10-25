import { isActionOf } from "typesafe-actions";
import { combineEpics, Epic } from "redux-observable";
import { from, of } from "rxjs";
import { filter, switchMap, map, catchError, takeUntil } from "rxjs/operators";

import { BandCatalogActions } from "store/reducers/catalogReducers/bandCatalogReducer"

import { fetchBandCatalogAsync, fetchBandCatalogNextLinkAsync, addBandToBandCatalogAsync, editBandInCatalogAsync, deleteBandInCatalogAsync } from "service/epicServices/bandCatalogService";
import { fetchBandCatalog, fetchBandCatalogNextLink, addBandToCatalog, editBandInCatalog, deleteBandInCatalog } from "store/actions";



const fetchBandCatalogsEpic: Epic<BandCatalogActions, BandCatalogActions, any> = (action$) =>
    action$.pipe(
        filter(isActionOf(fetchBandCatalog.request)),
        switchMap(action =>
            from(fetchBandCatalogAsync(action.payload)).pipe(
                map(fetchBandCatalog.success),
                catchError((error: Error) => of(fetchBandCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(fetchBandCatalog.cancel))))
            )
        )
    );

const fetchBandCatalogNextLinkEpic: Epic<BandCatalogActions, BandCatalogActions, any> = (action$) =>
    action$.pipe(
        filter(isActionOf(fetchBandCatalogNextLink.request)),
        switchMap(action =>
            from(fetchBandCatalogNextLinkAsync(action.payload)).pipe(
                map(fetchBandCatalogNextLink.success),
                catchError((error: Error) => of(fetchBandCatalogNextLink.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(fetchBandCatalogNextLink.cancel))))
            )
        )
    );

const addBandEpic: Epic<BandCatalogActions, BandCatalogActions, any> = (action$, state$) => {
    return action$.pipe(
        filter(isActionOf(addBandToCatalog.request)),
        switchMap(action =>
            from(addBandToBandCatalogAsync(action.payload)).pipe(
                map(addBandToCatalog.success),
                catchError((error: Error) => of(addBandToCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(addBandToCatalog.cancel))))
            )
        )
    );
}

const editBandEpic: Epic<BandCatalogActions, BandCatalogActions, any> = (action$, state$) => {
    return action$.pipe(
        filter(isActionOf(editBandInCatalog.request)),
        switchMap(action =>
            from(editBandInCatalogAsync(action.payload)).pipe(
                map(editBandInCatalog.success),
                catchError((error: Error) => of(editBandInCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(editBandInCatalog.cancel))))
            )
        )
    );
}

const deleteBandEpic: Epic<BandCatalogActions, BandCatalogActions, any> = (action$, state$) => {
    return action$.pipe(
        filter(isActionOf(deleteBandInCatalog.request)),
        switchMap(action =>
            from(deleteBandInCatalogAsync(action.payload)).pipe(
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
    deleteBandEpic,
    editBandEpic
)