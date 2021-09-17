import React, { useState } from 'react'

import { TextField } from '@material-ui/core'
import GameScore from 'models/parseEntities/GameScore'

const DashBoard = () => {

    const [response, setResponse] = useState('')

    const fetchFromGraph = () => {
        const gameScore = new GameScore()

        gameScore.set("score", 1337);
        gameScore.set("playerName", "Sean Plott");
        gameScore.set("cheatMode", false);

        gameScore.save()
            .then((gameScore) => {
                // Execute any logic that should take place after the object is saved.
                setResponse('New object created with objectId: ' + gameScore.id);
            }, (error) => {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                setResponse('Failed to create new object, with error code: ' + error.message);
            });
    }

    return <>
        <button onClick={fetchFromGraph}>New GameScore</button>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" value={response} />
    </>
}


export default DashBoard

