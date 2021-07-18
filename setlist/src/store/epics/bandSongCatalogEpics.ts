import { Epic, combineEpics } from "redux-observable";
import { isActionOf } from "typesafe-actions";
import { of, from, merge, EMPTY } from "rxjs";
import { filter, switchMap, map, catchError, takeUntil, mergeMap } from "rxjs/operators";

import { CatalogActions, RootState, fetchBandSongCatalog, fetchBandSongCatalogNextLink } from "..";
import * as Action from ".."
import { DisplayIn, IComponentOrderActionProps } from "../../models";
import { fetchBandSongCatalogAsync, fetchBandSongCatalogNextLinkAsync } from "../../service";

const openBandSongCatalogEpic: Epic<CatalogActions, CatalogActions, any> = (action$, state$) => {

    const bandSongCatalog = (state$.value as RootState).bandSongCatalogReducers.bandSongCatalog

    const asComponentOrderActionProp=(bandId:string): IComponentOrderActionProps => ({
        ComponentOrder: {
            id: bandSongCatalog.Id,
            displayIn: DisplayIn.Main,
            value: {...bandSongCatalog,BandId:bandId}
        }
    })

    return action$.pipe(
        filter(isActionOf(Action.openBandSongsCatalog)),
        mergeMap((action) =>
            merge(of(asComponentOrderActionProp(action.payload)).pipe(
                map(Action.pushComponentOrder.request)
            ))

        )
    )
}

const closeBandSongCatalogEpic: Epic<CatalogActions, CatalogActions, any> = (action$) =>
    action$.pipe(
        filter(isActionOf(Action.closeBandSongsCatalog)),
        mergeMap(() =>
            merge(of(EMPTY).pipe(
                map(() => Action.popComponentOrder.request())
            ))
        )
    )

// const openBandSongCatalogEpic: Epic<CatalogActions, CatalogActions, any> = (action$, state$) => {
//     return action$.pipe(
//         filter(isActionOf(openBandSongsCatalog.request)),
//         switchMap((action) =>
//             of(createEmptyBandSongCatalog(action.payload,(state$.value as RootState).catalogReducers.catalogState)).pipe(
//                 map(openBandSongsCatalog.success),
//                 catchError((error: Error) => of(openBandSongsCatalog.failure(error))),
//                 takeUntil(action$.pipe(filter(isActionOf(openBandSongsCatalog.cancel))))
//             )
//         )
//     );
// }

// const closeBandSongCatalogEpic: Epic<CatalogActions, CatalogActions, any> = (action$, state$) => {
//     return action$.pipe(
//         filter(isActionOf(closeBandSongsCatalog.request)),
//         switchMap((action) =>
//             of(closeBandSongCatalog(action.payload, (state$.value as RootState).catalogReducers.catalogState)).pipe(
//                 map(closeBandSongsCatalog.success),
//                 catchError((error: Error) => of(closeBandSongsCatalog.failure(error))),
//                 takeUntil(action$.pipe(filter(isActionOf(closeBandSongsCatalog.cancel))))
//             )
//         )
//     );
// }

const fetchBandSongCatalogsEpic: Epic<CatalogActions, CatalogActions, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(fetchBandSongCatalog.request)),
        switchMap(action =>
            from(fetchBandSongCatalogAsync(action.payload)).pipe(
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
            from(fetchBandSongCatalogNextLinkAsync(action.payload)).pipe(
                map(fetchBandSongCatalogNextLink.success),
                catchError((error: Error) => of(fetchBandSongCatalogNextLink.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(fetchBandSongCatalogNextLink.cancel))))
            )
        )
    );

// const addBandSongEpic: Epic<CatalogActions, CatalogActions, any> = (action$, state$) => {
//     return action$.pipe(
//         filter(isActionOf(Action.addBandSongToCatalog.request)),
//         switchMap(action =>
//             from(addBandSongToSongCatalogAsync(action.payload, (state$.value as RootState).catalogReducers.catalogState.catalogs)).pipe(
//                 map(Action.addBandSongToCatalog.success),
//                 catchError((error: Error) => of(Action.addBandSongToCatalog.failure(error))),
//                 takeUntil(action$.pipe(filter(isActionOf(Action.addBandSongToCatalog.cancel))))
//             )
//         )
//     );
// }

export const bandSongCatalogEpics = combineEpics(
    openBandSongCatalogEpic,
    closeBandSongCatalogEpic,
    fetchBandSongCatalogsEpic,
    fetchBandSongCatalogNextLinkEpic,
    // addBandSongEpic
)