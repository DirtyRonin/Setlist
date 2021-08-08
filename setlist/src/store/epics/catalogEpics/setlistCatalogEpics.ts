import { combineEpics, Epic } from "redux-observable";
import { from, of, merge, EMPTY } from "rxjs";
import { filter, switchMap, map, catchError, takeUntil, mergeMap } from "rxjs/operators";

import { isActionOf } from "typesafe-actions";

import * as Action from "../../actions/";
import { CatalogActions, fetchSetlistCatalog, fetchSetlistCatalogNextLink, RootState } from "../..";
import { DisplayIn, IComponentOrderActionProps } from "../../../models";
import { addSetlistToSetlistCatalogAsync, fetchSetlistCatalogAsync, fetchSetlistCatalogNextLinkAsync } from "../../../service";
import { addSetListToCatalog } from "../../actions/";

const openSetlistCatalogEpic: Epic<CatalogActions, CatalogActions, any> = (action$, state$) => {
    const setlistCatalog = (state$.value as RootState).setlistCatalogReducers.setlistCatalog

    const asComponentOrderActionProp: IComponentOrderActionProps = {
        ComponentOrder: {
            id: setlistCatalog.Id,
            displayIn: DisplayIn.Main,
            value: setlistCatalog
        }
    }

    return action$.pipe(
        filter(isActionOf(Action.openSetlistsCatalog)),
        mergeMap(() =>
            merge(of(asComponentOrderActionProp).pipe(
                map(Action.pushCatalogComponentOrder.request)
            ))
        )
    )
}

const closeSetlistCatalogEpic: Epic<CatalogActions, CatalogActions, any> = (action$) =>
    action$.pipe(
        filter(isActionOf(Action.closeSetlistsCatalog)),
        mergeMap(() =>
            merge(of(EMPTY).pipe(
                map(() => Action.popComponentOrder.request())
            ))
        )
    )

const fetchSetlistCatalogsEpic: Epic<CatalogActions, CatalogActions, any> = (action$) =>
    action$.pipe(
        filter(isActionOf(fetchSetlistCatalog.request)),
        switchMap(action =>
            from(fetchSetlistCatalogAsync(action.payload)).pipe(
                map(fetchSetlistCatalog.success),
                catchError((error: Error) => of(fetchSetlistCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(fetchSetlistCatalog.cancel))))
            )
        )
    );

const fetchSetlistCatalogNextLinkEpic: Epic<CatalogActions, CatalogActions, any> = (action$) =>
    action$.pipe(
        filter(isActionOf(fetchSetlistCatalogNextLink.request)),
        switchMap(action =>
            from(fetchSetlistCatalogNextLinkAsync(action.payload)).pipe(
                map(fetchSetlistCatalogNextLink.success),
                catchError((error: Error) => of(fetchSetlistCatalogNextLink.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(fetchSetlistCatalogNextLink.cancel))))
            )
        )
    );

const addSetlistEpic: Epic<CatalogActions, CatalogActions, any> = (action$) => {
    return action$.pipe(
        filter(isActionOf(addSetListToCatalog.request)),
        switchMap(action =>
            from(addSetlistToSetlistCatalogAsync(action.payload)).pipe(
                map(addSetListToCatalog.success),
                catchError((error: Error) => of(addSetListToCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(addSetListToCatalog.cancel))))
            )
        )
    );
}

export const setlistCatalogEpics = combineEpics(
    openSetlistCatalogEpic,
    closeSetlistCatalogEpic,
    fetchSetlistCatalogsEpic,
    fetchSetlistCatalogNextLinkEpic,
    addSetlistEpic
)

