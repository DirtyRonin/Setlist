import Parse from 'parse'

export default class GameScore extends Parse.Object {
    public score: number
    public playerName: string
    public cheatMode: boolean

    constructor() {
        // Pass the ClassName to the Parse.Object constructor
        super('GameScore');
        // All other initialization
        this.score = 0;
        this.playerName = ''
        this.cheatMode = false
    }

}

Parse.Object.registerSubclass('GameScore', GameScore);