import Parse from 'parse'

const classname = 'Song'

export default class ParseSong extends Parse.Object {
    public Title: string;
    public Artist: string;
    public OriginalKey: string;
    public Evergreen: boolean;
    public Nineties: boolean;
    public Genre: string;
    public Comment: string;

    constructor() {
        // Pass the ClassName to the Parse.Object constructor
        super(classname);
        // All other initialization
        this.Title= "";
        this.Artist= "";
        this.OriginalKey= "";
        this.Evergreen= false;
        this.Nineties= false;
        this.Genre= "no genre";
        this.Comment= "no comment";
    }
    
    public getQuery(){
        return new Parse.Query(ParseSong)
    }

}

Parse.Object.registerSubclass(classname,ParseSong);