import { combineEpics, Epic } from "redux-observable";
import { from, of, merge, EMPTY } from "rxjs";
import { filter, switchMap, map, catchError, takeUntil, mergeMap } from "rxjs/operators";

import { isActionOf } from "typesafe-actions";

import { CatalogActions, fetchLocationCatalog, RootState } from "../..";
import { DisplayIn, IComponentOrderActionProps } from "../../../models";
import { fetchLocationCatalogAsync } from "../../../service/epicServices/locationCatalogService";
import * as Action from "../../actions/";

const openLocationCatalogEpic: Epic<CatalogActions, CatalogActions, any> = (action$, state$) => {
    const locationCatalog = (state$.value as RootState).locationCatalogReducers.locationCatalog

    const asComponentOrderActionProp: IComponentOrderActionProps = {
        ComponentOrder: {
            id: locationCatalog.Id,
            displayIn: DisplayIn.Main,
            value: locationCatalog
        }
    }

    return action$.pipe(
        filter(isActionOf(Action.openLocationCatalog)),
        mergeMap(() =>
            merge(of(asComponentOrderActionProp).pipe(
                map(Action.pushCatalogComponentOrder.request)
            ))
        )
    )
}

const closeLocationCatalogEpic: Epic<CatalogActions, CatalogActions, any> = (action$) =>
    action$.pipe(
        filter(isActionOf(Action.closeLocationCatalog)),
        mergeMap(() =>
            merge(of(EMPTY).pipe(
                map(() => Action.popComponentOrder.request())
            ))
        )
    )

const fetchLocationCatalogsEpic: Epic<CatalogActions, CatalogActions, any> = (action$) =>
    action$.pipe(
        filter(isActionOf(fetchLocationCatalog.request)),
        switchMap(action =>
            from(fetchLocationCatalogAsync(action.payload)).pipe(
                map(fetchLocationCatalog.success),
                catchError((error: Error) => of(fetchLocationCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(fetchLocationCatalog.cancel))))
            )
        )
    );

export const locationCatalogEpics = combineEpics(
    openLocationCatalogEpic,
    closeLocationCatalogEpic,
    fetchLocationCatalogsEpic
)