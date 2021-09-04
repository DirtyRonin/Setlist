import { combineEpics, Epic } from "redux-observable";
import { from, of } from "rxjs";
import { filter, switchMap, map, catchError, takeUntil } from "rxjs/operators";

import { isActionOf } from "typesafe-actions";

import { CatalogActions, fetchCustomEventCatalog } from "../..";
import { fetchCustomEventCatalogAsync } from "../../../service/epicServices/customEventCatalogService";

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
    fetchCustomEventCatalogsEpic
)