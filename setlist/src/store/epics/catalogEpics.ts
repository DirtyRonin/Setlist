import { Epic, combineEpics } from "redux-observable";
import { from, of } from "rxjs";
import { filter, switchMap, map, catchError, takeUntil } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";

import { CatalogActions, initialStateAsync } from "../index"
import { CatalogState } from "../reducers";
import { newSongAsync } from "../actions";
import { CreateSongAsync, InitialStateRequest, AddSongToSongCatalog } from "../../service";

const fetchCatalogsEpic: Epic<CatalogActions> = (action$) =>
    action$.pipe(
        filter(isActionOf(initialStateAsync.request)),
        switchMap(action =>
            from(InitialStateRequest()).pipe(
                map(initialStateAsync.success),
                catchError((error: Error) => of(initialStateAsync.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(initialStateAsync.cancel))))
            )
        )
    );

const addSongEpic: Epic<CatalogActions, CatalogActions, CatalogState> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(newSongAsync.request)),
        switchMap(action =>
            from(AddSongToSongCatalog(action.payload, state$.value.catalogState.catalogs)).pipe(
                map(newSongAsync.success),
                catchError((error: Error) => of(newSongAsync.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(newSongAsync.cancel))))
            )
        )
    );


export const catalogEpics = combineEpics(fetchCatalogsEpic,addSongEpic)
