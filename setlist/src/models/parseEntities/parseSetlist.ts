import isThisHour from 'date-fns/isThisHour';
import Parse from 'parse'
import ParseSong from './parseSong';

const classname = 'Setlist'
const SETLISTSONGS = "SetlistSongs"

export default class ParseSetlist extends Parse.Object {


    public Title: string;
    public Comment: string;

    constructor() {
        // Pass the ClassName to the Parse.Object constructor
        super(classname);
        // All other initialization
        this.Title = "";
        this.Comment = "no comment";
        
    }

    public getRelation(){
        return this.relation(SETLISTSONGS)
    }

    public getSongs() {
        return this.get(SETLISTSONGS) ?? undefined
    }

    public addSong(item: ParseSong) {
        this.add(SETLISTSONGS, item)
    }

    public getQuery(){
        return new Parse.Query(ParseSetlist)
    }

}

Parse.Object.registerSubclass(classname, ParseSetlist);