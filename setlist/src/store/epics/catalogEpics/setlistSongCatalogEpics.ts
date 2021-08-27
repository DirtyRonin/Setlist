import { isActionOf } from "typesafe-actions";
import { combineEpics, Epic } from "redux-observable";
import { from, of } from "rxjs";
import { filter, switchMap, map, catchError, takeUntil } from "rxjs/operators";

import { SetlistSongCatalogActions } from "store/reducers/catalogReducers/setlistSongCatalogReducer"

import * as Action from "store/actions/catalogActions/setlistSongCatalogActions";

import { deleteSetlistSongInCatalogAsync, editSetlistSongInCatalogAsync, fetchSetlistSongCatalogAsync, fetchSetlistSongCatalogNextLinkAsync, NewSetlistSong } from "service";

const fetchSetlistSongCatalogsEpic: Epic<SetlistSongCatalogActions, SetlistSongCatalogActions, any> = (action$) =>
    action$.pipe(
        filter(isActionOf(Action.fetchSetlistSongCatalog.request)),
        switchMap(action =>
            from(fetchSetlistSongCatalogAsync(action.payload)).pipe(
                map(Action.fetchSetlistSongCatalog.success),
                catchError((error: Error) => of(Action.fetchSetlistSongCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(Action.fetchSetlistSongCatalog.cancel))))
            )
        )
    );

const fetchSetlistSongCatalogNextLinkEpic: Epic<SetlistSongCatalogActions, SetlistSongCatalogActions, any> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(Action.fetchSetlistSongCatalogNextLink.request)),
        switchMap(action =>
            from(fetchSetlistSongCatalogNextLinkAsync(action.payload)).pipe(
                map(Action.fetchSetlistSongCatalogNextLink.success),
                catchError((error: Error) => of(Action.fetchSetlistSongCatalogNextLink.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(Action.fetchSetlistSongCatalogNextLink.cancel))))
            )
        )
    );

const addSetlistSongEpic: Epic<SetlistSongCatalogActions, SetlistSongCatalogActions, any> = (action$) => {
    return action$.pipe(
        filter(isActionOf(Action.addSetlistSongToCatalog.request)),
        switchMap(action =>
            from(NewSetlistSong(action.payload)).pipe(
                map(Action.addSetlistSongToCatalog.success),
                catchError((error: Error) => of(Action.addSetlistSongToCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(Action.addSetlistSongToCatalog.cancel))))
            )
        )
    );
}

const editSetlistSongEpic: Epic<SetlistSongCatalogActions, SetlistSongCatalogActions, any> = (action$) => {
    return action$.pipe(
        filter(isActionOf(Action.editSetlistSongInCatalog.request)),
        switchMap(action =>
            from(editSetlistSongInCatalogAsync(action.payload)).pipe(
                map(Action.editSetlistSongInCatalog.success),
                catchError((error: Error) => of(Action.editSetlistSongInCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(Action.editSetlistSongInCatalog.cancel))))
            )
        )
    );
}

const deleteSetlistSongEpic: Epic<SetlistSongCatalogActions, SetlistSongCatalogActions, any> = (action$) => {
    return action$.pipe(
        filter(isActionOf(Action.deleteSetlistSongInCatalog.request)),
        switchMap(action =>
            from(deleteSetlistSongInCatalogAsync(action.payload)).pipe(
                map(Action.deleteSetlistSongInCatalog.success),
                catchError((error: Error) => of(Action.deleteSetlistSongInCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(Action.deleteSetlistSongInCatalog.cancel))))
            )
        )
    );
}



export const setlistSongCatalogEpics = combineEpics(
    fetchSetlistSongCatalogsEpic,
    fetchSetlistSongCatalogNextLinkEpic,
addSetlistSongEpic,
editSetlistSongEpic,
deleteSetlistSongEpic
)