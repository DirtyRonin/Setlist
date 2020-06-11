import { combineEpics, Epic } from "redux-observable";
import { CatalogActions, fetchBandCatalog, RootState } from "..";
import { filter, switchMap, map, catchError, takeUntil } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { from, of } from "rxjs";
import { fetchBandCatalogAsync } from "../../service";

const fetchBandCatalogsEpic: Epic<CatalogActions, CatalogActions, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(fetchBandCatalog.request)),
        switchMap(action =>
            from(fetchBandCatalogAsync(action.payload, (state$.value as RootState).catalogReducers.catalogState.catalogs)).pipe(
                map(fetchBandCatalog.success),
                catchError((error: Error) => of(fetchBandCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(fetchBandCatalog.cancel))))
            )
        )
    );

export const bandCatalogEpics = combineEpics(
    fetchBandCatalogsEpic
)