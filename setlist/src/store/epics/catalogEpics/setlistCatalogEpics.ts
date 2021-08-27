import { combineEpics, Epic } from "redux-observable";
import { from, of } from "rxjs";
import { filter, switchMap, map, catchError, takeUntil } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";


import { SetlistCatalogActions } from "store/reducers/catalogReducers/setlistCatalogReducer"

import { fetchSetlistCatalog, fetchSetlistCatalogNextLink } from "store";
import { addSetlistToSetlistCatalogAsync,  deleteSetlistInCatalogAsync,  editSetlistInCatalogAsync,  fetchSetlistCatalogAsync, fetchSetlistCatalogNextLinkAsync } from "service";
import { addSetListToCatalog, deleteSetListInCatalog, editSetListInCatalog } from "store/actions/";

const fetchSetlistCatalogsEpic: Epic<SetlistCatalogActions, SetlistCatalogActions, any> = (action$) =>
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

const fetchSetlistCatalogNextLinkEpic: Epic<SetlistCatalogActions, SetlistCatalogActions, any> = (action$) =>
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

const addSetlistEpic: Epic<SetlistCatalogActions, SetlistCatalogActions, any> = (action$) => {
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

const editSongEpic: Epic<SetlistCatalogActions, SetlistCatalogActions, any> = (action$) => {
    return action$.pipe(
        filter(isActionOf(editSetListInCatalog.request)),
        switchMap(action =>
            from(editSetlistInCatalogAsync(action.payload)).pipe(
                map(editSetListInCatalog.success),
                catchError((error: Error) => of(editSetListInCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(editSetListInCatalog.cancel))))
            )
        )
    );
}

const deleteSongEpic: Epic<SetlistCatalogActions, SetlistCatalogActions, any> = (action$) => {
    return action$.pipe(
        filter(isActionOf(deleteSetListInCatalog.request)),
        switchMap(action =>
            from(deleteSetlistInCatalogAsync(action.payload)).pipe(
                map(deleteSetListInCatalog.success),
                catchError((error: Error) => of(deleteSetListInCatalog.failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(deleteSetListInCatalog.cancel))))
            )
        )
    );
}

export const setlistCatalogEpics = combineEpics(
    fetchSetlistCatalogsEpic,
    fetchSetlistCatalogNextLinkEpic,
    addSetlistEpic,
    editSongEpic,
    deleteSongEpic
)

