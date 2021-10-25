import Parse from 'parse'
import ParseSetlist from './parseSetlist';
import ParseSong from './parseSong';

const classname = 'SetlistSong'
const SONG="Song"
const SETLIST="Setlist"

export default class ParseSetlistSong extends Parse.Object {

    constructor() {
        // Pass the ClassName to the Parse.Object constructor
        super(classname);
    }

    public GetSong(){
        return ((this.get(SONG)) as ParseSong)
    }

    public GetSongId(){
        return this.GetSong().id
    }
    public GetSetlist(){
        return ((this.get(SETLIST)) as ParseSetlist)
    }

    public GetSetlistId(){
        return this.GetSetlist().id
    }

}

Parse.Object.registerSubclass(classname,ParseSetlistSong);