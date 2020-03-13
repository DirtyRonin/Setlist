import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import {
    InitialStateRequest,
    CreateBandAsync,
    DeleteBandAsync,
    AddSongsToBandAsync,
    RemoveSongsFromBandAsync,
    ReadBandsSummaryAsync,
    AddSetlistToBandAsync
} from "./api";

import {
    CreateSongAsync,
    DeleteSongAsync
} from "./service"

ReactDOM.render(
    <App
        InitialStateRequest={InitialStateRequest}
        ReadBandsSummaryAsync={ReadBandsSummaryAsync}
        AddSongsToBandAsync={AddSongsToBandAsync}
        RemoveSongsFromBandAsync={RemoveSongsFromBandAsync}
        CreateSongAsync={CreateSongAsync}
        DeleteSongAsync={DeleteSongAsync}
        CreateBandAsync={CreateBandAsync}
        DeleteBandAsync={DeleteBandAsync}
        AddSetlistToBandAsync={AddSetlistToBandAsync}
    />,
    document.getElementById("root")
);
serviceWorker.unregister();
