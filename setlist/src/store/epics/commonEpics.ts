import { Epic, combineEpics } from "redux-observable";
import { isActionOf } from "typesafe-actions";
import { of, from } from "rxjs";
import { filter, switchMap, map, catchError, takeUntil } from "rxjs/operators";

import * as Action from "../actions/commonActions"
import { RootState, CatalogActions } from "..";
import { pushComponentsOrderService, popComponentsOrderService, pushCatalogComponentsOrderService } from "../../service/epicServices/commonService";



const pushComponentOrder: Epic<CatalogActions, CatalogActions, any> = (action$, state$) => {
    return action$.pipe(
        filter(isActionOf(Action.pushComponentOrder.request)),
        switchMap((action) =>
            of(pushComponentsOrderService(action.payload,(state$.value as RootState).catalogReducers.catalogState)).pipe(
                map(Action.pushComponentOrder.success),
                catchError((error: Error) => of(Action.pushComponentOrder.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(Action.pushComponentOrder.cancel))))
            )
        )
    );
}

const pushCatalogComponentOrder: Epic<CatalogActions, CatalogActions, any> = (action$, state$) => {
    return action$.pipe(
        filter(isActionOf(Action.pushCatalogComponentOrder.request)),
        switchMap((action) =>
            of(pushCatalogComponentsOrderService(action.payload)).pipe(
                map(Action.pushCatalogComponentOrder.success),
                catchError((error: Error) => of(Action.pushCatalogComponentOrder.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(Action.pushCatalogComponentOrder.cancel))))
            )
        )
    );
}

const popComponentOrder: Epic<CatalogActions, CatalogActions, any> = (action$, state$) => {
    return action$.pipe(
        filter(isActionOf(Action.popComponentOrder.request)),
        switchMap(() =>
            of(popComponentsOrderService((state$.value as RootState).catalogReducers.catalogState)).pipe(
                map(Action.popComponentOrder.success),
                catchError((error: Error) => of(Action.popComponentOrder.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(Action.popComponentOrder.cancel))))
            )
        )
    );
}

export const commonCatalogEpics = combineEpics(
    pushComponentOrder,
    pushCatalogComponentOrder,
    popComponentOrder
)