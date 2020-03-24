import { Epic, combineEpics } from "redux-observable";
import { from, of } from "rxjs";
import { filter, switchMap, map, catchError, takeUntil } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";

import { AppActions, fetchSongCatalogsAsync, RootState } from "../index"
import { InitialStateRequest } from "../../api";
import { AddSongAsync } from "../actions";
import { CreateSongAsync } from "../../service";

const fetchCatalogsEpic: Epic<AppActions> = (action$) =>
    action$.pipe(
        filter(isActionOf(fetchSongCatalogsAsync.request)),
        switchMap(action =>
            from(InitialStateRequest()).pipe(
                map(fetchSongCatalogsAsync.success),
                catchError((error:Error) => of(fetchSongCatalogsAsync.failure(error)) ),
                takeUntil(action$.pipe(filter(isActionOf(fetchSongCatalogsAsync.cancel))))
            )
        )
    );

const addSongEpic: Epic<AppActions,AppActions,RootState> = (action$,state$) =>
    action$.pipe(
        filter(isActionOf(AddSongAsync.request)),
        switchMap(action =>
            from(CreateSongAsync(action.payload)).pipe(
                map(AddSongAsync.success),
                catchError((error:Error) => of(AddSongAsync.failure(error)) ),
                takeUntil(action$.pipe(filter(isActionOf(AddSongAsync.cancel))))
            )
        )
    );


export const catalogEpics = combineEpics(fetchCatalogsEpic)
