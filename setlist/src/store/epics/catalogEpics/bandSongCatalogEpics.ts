import { Epic, combineEpics } from "redux-observable";
import { isActionOf } from "typesafe-actions";
import { of, from, merge, EMPTY } from "rxjs";
import { filter, switchMap, map, catchError, takeUntil, mergeMap } from "rxjs/operators";

import { CatalogActions, RootState, fetchBandSongCatalog, fetchBandSongCatalogNextLink, addBandSongToCatalog } from "../..";
import * as Action from "../.."
import { DisplayIn, IComponentOrderActionProps } from "../../../models";
import { fetchBandSongCatalogAsync, fetchBandSongCatalogNextLinkAsync, NewBandSong } from "../../../service";

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
                map(Action.pushCatalogComponentOrder.request)
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

const addBandSongEpic: Epic<CatalogActions, CatalogActions, any> = (action$) => {
    return action$.pipe(
        filter(isActionOf(addBandSongToCatalog.request)),
        switchMap(action =>
            from(NewBandSong(action.payload)).pipe(
                map(addBandSongToCatalog.success),
                catchError((error: Error) => of(addBandSongToCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(addBandSongToCatalog.cancel))))
            )
        )
    );
}

export const bandSongCatalogEpics = combineEpics(
    openBandSongCatalogEpic,
    closeBandSongCatalogEpic,
    fetchBandSongCatalogsEpic,
    fetchBandSongCatalogNextLinkEpic,
    addBandSongEpic
)