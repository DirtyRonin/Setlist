import { isActionOf } from "typesafe-actions";
import { combineEpics, Epic } from "redux-observable";
import { from, of } from "rxjs";
import { filter, switchMap, map, catchError, takeUntil } from "rxjs/operators";

import { BandCatalogActions } from "store/reducers/catalogReducers/bandCatalogReducer"

import { fetchBandCatalogAsync, fetchBandCatalogNextLinkAsync, addBandToBandCatalogAsync, editBandInCatalogAsync, deleteBandInCatalogAsync } from "service/epicServices/bandCatalogService";
import { fetchBandCatalog, fetchBandCatalogNextLink, addBandToCatalog, editBandInCatalog, deleteBandInCatalog } from "store/actions";
import * as snacks from "./snackbarHelper";



const fetchBandCatalogsEpic: Epic<BandCatalogActions, BandCatalogActions, any> = (action$) =>
    action$.pipe(
        filter(isActionOf(fetchBandCatalog.request)),
        switchMap(action =>
            from(fetchBandCatalogAsync(action.payload)).pipe(
                map(fetchBandCatalog.success),
                catchError((error: Error) => of(fetchBandCatalog.failure(error)).pipe(
                    map(x => snacks.fetchingFailed)
                )),
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
                catchError((error: Error) => of(fetchBandCatalogNextLink.failure(error)).pipe(
                    map(x => snacks.fetchingFailed)
                )),
                takeUntil(action$.pipe(filter(isActionOf(fetchBandCatalogNextLink.cancel))))
            )
        )
    );

const addBandEpic: Epic<BandCatalogActions, BandCatalogActions, any> = (action$, state$) => {
    return action$.pipe(
        filter(isActionOf(addBandToCatalog.request)),
        switchMap(action =>
            from(addBandToBandCatalogAsync(action.payload)).pipe(
                switchMap(x => [addBandToCatalog.success(x), snacks.creatingCompleted]),
                catchError((error: Error) => of(addBandToCatalog.failure(error)).pipe(
                    map(x => snacks.creatingFailed)
                )),
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
                switchMap(x => [editBandInCatalog.success(x), snacks.updatingCompleted]),
                catchError((error: Error) => of(editBandInCatalog.failure(error)).pipe(
                    map(x => snacks.updatingFailed)
                )),
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
                switchMap(x => [deleteBandInCatalog.success(x), snacks.deletingCompleted]),
                catchError((error: Error) => of(deleteBandInCatalog.failure(error)).pipe(
                    map(x => snacks.deletingFailed)
                )),
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