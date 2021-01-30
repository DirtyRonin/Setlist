import { Epic, combineEpics } from "redux-observable";
import { concat, EMPTY, empty, from, merge, Observable, of, Subject } from "rxjs";
import { filter, switchMap, map, catchError, takeUntil, mergeMap, concatMap, every, finalize, take, mapTo } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";

import { CatalogActions, RootState } from "../../index"
import * as Action from "../../actions";

import { addSongToCatalog, fetchSongCatalog, fetchSongCatalogNextLink, editSongInCatalog, deleteSongInCatalog } from "../../actions";
import { addSongToSongCatalogAsync, fetchSongCatalogAsync, fetchSongCatalogNextLinkAsync, editSongInCatalogAsync, deleteSongInCatalogAsync, createEmptySongCatalog, closeSongCatalog } from "../../../service";
import { DisplayIn, IComponentOrderActionProps } from "../../../models";

const openSongCatalogEpic: Epic<CatalogActions, CatalogActions, any> = (action$, state$) => {

    const songCatalog = (state$.value as RootState).songCatalogReducers.songCatalog

    const asComponentOrderActionProp: IComponentOrderActionProps = {
        ComponentOrder: {
            id: songCatalog.Id,
            displayIn: DisplayIn.Main,
            value: songCatalog
        }
    }

    return action$.pipe(
        filter(isActionOf(Action.openThisSongCatalog)),
        mergeMap(() =>
            merge(of(asComponentOrderActionProp).pipe(
                map(Action.pushComponentOrder.request)
            ))

        )
    )
}

const closeSongCatalogEpic: Epic<CatalogActions, CatalogActions, any> = (action$) =>
    action$.pipe(
        filter(isActionOf(Action.closeThisSongCatalog)),
        mergeMap(() =>
            merge(of(EMPTY).pipe(
                map(() => Action.popComponentOrder.request())
            ))
        )
    )

const fetchSongCatalogsEpic: Epic<CatalogActions, CatalogActions, any> = (action$) =>
    action$.pipe(
        filter(isActionOf(fetchSongCatalog.request)),
        switchMap(action =>
            from(fetchSongCatalogAsync(action.payload)).pipe(
                map(fetchSongCatalog.success),
                catchError((error: Error) => of(fetchSongCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(fetchSongCatalog.cancel))))
            )
        )
    );

const fetchSongCatalogNextLinkEpic: Epic<CatalogActions, CatalogActions, any> = (action$) =>
    action$.pipe(
        filter(isActionOf(fetchSongCatalogNextLink.request)),
        switchMap(action =>
            from(fetchSongCatalogNextLinkAsync(action.payload)).pipe(
                map(fetchSongCatalogNextLink.success),
                catchError((error: Error) => of(fetchSongCatalogNextLink.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(fetchSongCatalogNextLink.cancel))))
            )
        )
    );

const addSongEpic: Epic<CatalogActions, CatalogActions, any> = (action$) => {
    return action$.pipe(
        filter(isActionOf(addSongToCatalog.request)),
        switchMap(action =>
            from(addSongToSongCatalogAsync(action.payload)).pipe(
                map(addSongToCatalog.success),
                catchError((error: Error) => of(addSongToCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(addSongToCatalog.cancel))))
            )
        )
    );
}

const editSongEpic: Epic<CatalogActions, CatalogActions, any> = (action$) => {
    return action$.pipe(
        filter(isActionOf(editSongInCatalog.request)),
        switchMap(action =>
            from(editSongInCatalogAsync(action.payload)).pipe(
                map(editSongInCatalog.success),
                catchError((error: Error) => of(editSongInCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(editSongInCatalog.cancel))))
            )
        )
    );
}

const deleteSongEpic: Epic<CatalogActions, CatalogActions, any> = (action$) => {
    return action$.pipe(
        filter(isActionOf(deleteSongInCatalog.request)),
        switchMap(action =>
            from(deleteSongInCatalogAsync(action.payload,)).pipe(
                map(deleteSongInCatalog.success),
                catchError((error: Error) => of(deleteSongInCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(deleteSongInCatalog.cancel))))
            )
        )
    );
}


export const songCatalogEpics = combineEpics(
    openSongCatalogEpic,
    closeSongCatalogEpic,
    addSongEpic,
    editSongEpic,
    deleteSongEpic,
    fetchSongCatalogNextLinkEpic,
    fetchSongCatalogsEpic,
)

