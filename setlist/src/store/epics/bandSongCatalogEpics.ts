import { Epic } from "redux-observable";
import { CatalogActions, deleteBandInCatalog, RootState } from "..";
import { filter, switchMap, map, catchError, takeUntil } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { from, of } from "rxjs";
import { showBandSongsCatalog } from "../actions";


