import { createAction, createAsyncAction, action } from "typesafe-actions";
import { ICatalogState } from "..";
import { ISong, ISongCatalog } from "../../models";
import { HashTable } from "../../Util";

export const initialStateAsync= createAsyncAction(
    "INITIAL_STATE_REQUEST",
    "INITIAL_STATE_SUCCESS",
    "INITIAL_STATE_FAILURE",
    "INITIAL_STATE_CANCEL",
)<void,ICatalogState,Error,string>();

export const newSongAsync= createAsyncAction(
    "NEW_SONG_REQUEST",
    "NEW_SONG_SUCCESS",
    "NEW_SONG_FAILURE",
    "NEW_SONG_CANCEL",
)<INewSong,HashTable<ISongCatalog>,Error,string>();

export interface INewSong {
    song:ISong;
    songCatalogId:string;
}