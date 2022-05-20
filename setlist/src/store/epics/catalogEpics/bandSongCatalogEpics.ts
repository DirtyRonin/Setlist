import { Epic, combineEpics } from "redux-observable";
import { isActionOf } from "typesafe-actions";
import { of, from } from "rxjs";
import { filter, switchMap, map, catchError, takeUntil } from "rxjs/operators";

import { BandSongCatalogActions } from "store/reducers/catalogReducers/bandSongCatalogReducer"

import {  fetchBandSongCatalog, fetchBandSongCatalogNextLink, addBandSongToCatalog, editBandSongInCatalog, deleteBandSongInCatalog } from "store/actions/catalogActions/bandSongCatalogActions";
import { deleteBandSongInCatalogAsync, editBandSongInCatalogAsync, fetchBandSongCatalogAsync, fetchBandSongCatalogNextLinkAsync, NewBandSong } from "service";
import * as snacks from "./snackbarHelper";

const fetchBandSongCatalogsEpic: Epic<BandSongCatalogActions, BandSongCatalogActions, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(fetchBandSongCatalog.request)),
        switchMap(action =>
            from(fetchBandSongCatalogAsync(action.payload)).pipe(
                map(fetchBandSongCatalog.success),
                catchError((error: Error) => of(fetchBandSongCatalog.failure(error)).pipe(
                    map(x => snacks.fetchingFailed)
                )),
                takeUntil(action$.pipe(filter(isActionOf(fetchBandSongCatalog.cancel))))
            )
        )
    );

const fetchBandSongCatalogNextLinkEpic: Epic<BandSongCatalogActions, BandSongCatalogActions, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(fetchBandSongCatalogNextLink.request)),
        switchMap(action =>
            from(fetchBandSongCatalogNextLinkAsync(action.payload)).pipe(
                map(fetchBandSongCatalogNextLink.success),
                catchError((error: Error) => of(fetchBandSongCatalogNextLink.failure(error)).pipe(
                    map(x => snacks.fetchingFailed)
                )),
                takeUntil(action$.pipe(filter(isActionOf(fetchBandSongCatalogNextLink.cancel))))
            )
        )
    );

const addBandSongEpic: Epic<BandSongCatalogActions, BandSongCatalogActions, any> = (action$) => {
    return action$.pipe(
        filter(isActionOf(addBandSongToCatalog.request)),
        switchMap(action =>
            from(NewBandSong(action.payload)).pipe(
                switchMap(x => [addBandSongToCatalog.success(x), snacks.creatingCompleted]),
                // map(addBandSongToCatalog.success),
                catchError((error: Error) => of(addBandSongToCatalog.failure(error)).pipe(
                    map(x => snacks.creatingFailed)
                )),
                takeUntil(action$.pipe(filter(isActionOf(addBandSongToCatalog.cancel))))
            )
        )
    );
}

const editBandSongEpic: Epic<BandSongCatalogActions, BandSongCatalogActions, any> = (action$) => {
    return action$.pipe(
        filter(isActionOf(editBandSongInCatalog.request)),
        switchMap(action =>
            from(editBandSongInCatalogAsync(action.payload)).pipe(
                switchMap(x => [editBandSongInCatalog.success(x), snacks.updatingCompleted]),
                // map(editBandSongInCatalog.success),
                catchError((error: Error) => of(editBandSongInCatalog.failure(error)).pipe(
                    map(x => snacks.updatingFailed)
                )),
                takeUntil(action$.pipe(filter(isActionOf(editBandSongInCatalog.cancel))))
            )
        )
    );
}

const deleteBandSongEpic: Epic<BandSongCatalogActions, BandSongCatalogActions, any> = (action$) => {
    return action$.pipe(
        filter(isActionOf(deleteBandSongInCatalog.request)),
        switchMap(action =>
            from(deleteBandSongInCatalogAsync(action.payload)).pipe(
                map(deleteBandSongInCatalog.success),
                catchError((error: Error) => of(deleteBandSongInCatalog.failure(error)).pipe(
                    map(x => snacks.deletingFailed)
                )),
                takeUntil(action$.pipe(filter(isActionOf(deleteBandSongInCatalog.cancel))))
            )
        )
    );
}

export const bandSongCatalogEpics = combineEpics(
    fetchBandSongCatalogsEpic,
    fetchBandSongCatalogNextLinkEpic,
    addBandSongEpic,
    editBandSongEpic,
    deleteBandSongEpic
)