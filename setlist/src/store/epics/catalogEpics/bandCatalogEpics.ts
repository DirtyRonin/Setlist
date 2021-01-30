import { combineEpics, Epic } from "redux-observable";

import { filter, switchMap, map, catchError, takeUntil } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { from, of } from "rxjs";
import { fetchBandCatalogAsync, fetchBandCatalogNextLinkAsync, addBandToBandCatalogAsync, editBandInCatalogAsync, deleteBandInCatalogAsync, createEmptyBandCatalog, closeBandCatalog } from "../../../service";
import * as Action from "../../actions/";
import { CatalogActions, RootState } from "../..";
import { fetchBandCatalog, fetchBandCatalogNextLink, addBandToCatalog, editBandInCatalog, deleteBandInCatalog } from "../../actions";


// const openBandCatalogEpic_New: Epic<BandCatalogActions, BandCatalogActions, any> = (action$, state$) => {
//     return action$.pipe(
//         filter(isActionOf(Action.openBandsCatalog_New.request)),
//         switchMap(() =>
//             of(createEmptyBandCatalog_New((state$.value as RootState).catalogReducers.catalogState.catalogs)).pipe(
//                 map(Action.openBandsCatalog_New.success),
//                 catchError((error: Error) => of(Action.openBandsCatalog_New.failure(error))),
//                 takeUntil(action$.pipe(filter(isActionOf(Action.openBandsCatalog_New.cancel))))
//             )
//         )
//     );
// }

const openBandCatalogEpic: Epic<CatalogActions, CatalogActions, any> = (action$) => {
    return action$.pipe(
        filter(isActionOf(Action.openBandsCatalog.request)),
        switchMap(() =>
            of(createEmptyBandCatalog()).pipe(
                map(Action.openBandsCatalog.success),
                catchError((error: Error) => of(Action.openBandsCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(Action.openBandsCatalog.cancel))))
            )
        )
    );
}

const closeBandCatalogEpic: Epic<CatalogActions, CatalogActions, any> = (action$, state$) => {
    return action$.pipe(
        filter(isActionOf(Action.closeBandsCatalog.request)),
        switchMap((action) =>
            of(closeBandCatalog(action.payload, (state$.value as RootState).catalogReducers.catalogState)).pipe(
                map(Action.closeBandsCatalog.success),
                catchError((error: Error) => of(Action.closeBandsCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(Action.closeBandsCatalog.cancel))))
            )
        )
    );
}


const fetchBandCatalogsEpic: Epic<CatalogActions, CatalogActions, any> = (action$) =>
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

const fetchBandCatalogNextLinkEpic: Epic<CatalogActions, CatalogActions, any> = (action$) =>
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
    editBandEpic,
    openBandCatalogEpic,
    closeBandCatalogEpic,
    // openBandCatalogEpic_New
)