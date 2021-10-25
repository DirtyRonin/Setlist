import Parse from 'parse'

const classname = 'Band'

export default class ParseBand extends Parse.Object {
    public Title: string;

    constructor() {
        // Pass the ClassName to the Parse.Object constructor
        super(classname);
        // All other initialization
        this.Title= "";
        
    }

}

Parse.Object.registerSubclass(classname,ParseBand);