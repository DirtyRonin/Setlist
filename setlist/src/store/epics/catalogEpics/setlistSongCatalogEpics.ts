import { combineEpics, Epic } from "redux-observable";
import { from, of, merge, EMPTY } from "rxjs";
import { filter, switchMap, map, catchError, takeUntil, mergeMap } from "rxjs/operators";

import { isActionOf } from "typesafe-actions";

import * as Action from "../../actions/";

import { CatalogActions, fetchSetlistSongCatalog, RootState } from "../..";
import { DisplayIn, IComponentOrderActionProps } from "../../../models";
import { fetchSetlistSongCatalogAsync } from "../../../service";

const openSetlistSongCatalogEpic: Epic<CatalogActions, CatalogActions, any> = (action$, state$) => {
    const setlistSongCatalog = (state$.value as RootState).setlistSongCatalogReducers.setlistSongCatalog

    const asComponentOrderActionProp: IComponentOrderActionProps = {
        ComponentOrder: {
            id: setlistSongCatalog.Id,
            displayIn: DisplayIn.Main,
            value: setlistSongCatalog
        }
    }

    return action$.pipe(
        filter(isActionOf(Action.openSetlistSongCatalog)),
        mergeMap(() =>
            merge(of(asComponentOrderActionProp).pipe(
                map(Action.pushComponentOrder.request)
            ))
        )
    )
}

const closeSetlistSongCatalogEpic: Epic<CatalogActions, CatalogActions, any> = (action$) =>
    action$.pipe(
        filter(isActionOf(Action.closeSetlistSongCatalog)),
        mergeMap(() =>
            merge(of(EMPTY).pipe(
                map(() => Action.popComponentOrder.request())
            ))
        )
    )

const fetchSetlistSongCatalogsEpic: Epic<CatalogActions, CatalogActions, any> = (action$) =>
    action$.pipe(
        filter(isActionOf(fetchSetlistSongCatalog.request)),
        switchMap(action =>
            from(fetchSetlistSongCatalogAsync(action.payload)).pipe(
                map(fetchSetlistSongCatalog.success),
                catchError((error: Error) => of(fetchSetlistSongCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(fetchSetlistSongCatalog.cancel))))
            )
        )
    );



export const setlistSongCatalogEpics = combineEpics(
    openSetlistSongCatalogEpic,
    closeSetlistSongCatalogEpic,
    fetchSetlistSongCatalogsEpic
)