import { Song } from "mapping";
import { ISong } from "models/entity";
import { ISongResource } from ".";

export interface IBandSongResource {
    Id: string
    BandId: string
    SongId: string
    Popularity: number
    Song: ISongResource
}


//response 
type BandSongPivot = ISong & {
    "pivot": {
        "bandId": number
        "created_at": Date
        "popularity": number
        "songId": number
        "updated_at": Date
    }
}


const test: BandSongPivot = {
    ...Song.CreateEmpty(),pivot:{
        bandId: 0,
        created_at: new Date(),
        popularity: 0,
        songId: 0,
        updated_at: new Date()
    }
}

