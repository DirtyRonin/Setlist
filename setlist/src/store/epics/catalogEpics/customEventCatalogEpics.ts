import { combineEpics, Epic } from "redux-observable";
import { from, of, merge, EMPTY } from "rxjs";
import { filter, switchMap, map, catchError, takeUntil, mergeMap } from "rxjs/operators";

import { isActionOf } from "typesafe-actions";

import { CatalogActions, fetchCustomEventCatalog, RootState } from "../..";
import { DisplayIn, IComponentOrderActionProps } from "../../../models";
import { fetchCustomEventCatalogAsync } from "../../../service/epicServices/customEventCatalogService";
import * as Action from "../../actions/";

const openCustomEventCatalogEpic: Epic<CatalogActions, CatalogActions, any> = (action$, state$) => {
    const customEventCatalog = (state$.value as RootState).customEventCatalogReducers.customEventCatalog

    const asComponentOrderActionProp: IComponentOrderActionProps = {
        ComponentOrder: {
            id: customEventCatalog.Id,
            displayIn: DisplayIn.Main,
            value: customEventCatalog
        }
    }

    return action$.pipe(
        filter(isActionOf(Action.openCustomEventCatalog)),
        mergeMap(() =>
            merge(of(asComponentOrderActionProp).pipe(
                map(Action.pushCatalogComponentOrder.request)
            ))
        )
    )
}

const closeCustomEventCatalogEpic: Epic<CatalogActions, CatalogActions, any> = (action$) =>
    action$.pipe(
        filter(isActionOf(Action.closeCustomEventCatalog)),
        mergeMap(() =>
            merge(of(EMPTY).pipe(
                map(() => Action.popComponentOrder.request())
            ))
        )
    )

const fetchCustomEventCatalogsEpic: Epic<CatalogActions, CatalogActions, any> = (action$) =>
    action$.pipe(
        filter(isActionOf(fetchCustomEventCatalog.request)),
        switchMap(action =>
            from(fetchCustomEventCatalogAsync(action.payload)).pipe(
                map(fetchCustomEventCatalog.success),
                catchError((error: Error) => of(fetchCustomEventCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(fetchCustomEventCatalog.cancel))))
            )
        )
    );

export const customEventCatalogEpics = combineEpics(
    openCustomEventCatalogEpic,
    closeCustomEventCatalogEpic,
    fetchCustomEventCatalogsEpic
)