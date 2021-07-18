import { Epic, combineEpics } from "redux-observable";
import { isActionOf } from "typesafe-actions";
import { of, from } from "rxjs";
import { filter, switchMap, map, catchError, takeUntil } from "rxjs/operators";

import { UserActions } from ".."
import * as Action from "../actions/userActions"
import { fetchCurrentUser } from "../../service";

const getUserByNameEpic: Epic<UserActions, UserActions, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(Action.getUser.request)),
        switchMap(action =>
            from(fetchCurrentUser(action.payload)).pipe(
                map(Action.getUser.success),
                catchError((error: Error) => of(Action.getUser.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(Action.getUser.cancel))))
            )
        )
    );

export const userEpics = combineEpics(
    getUserByNameEpic
)


