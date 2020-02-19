import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { InitialStateRequest, CreateSongAsync, DeleteSongAsync, CreateBandAsync ,DeleteBandAsync,AddSongsToBand} from "./api";

ReactDOM.render(
    <App
        InitialStateRequest={InitialStateRequest}
        AddSongsToBand={AddSongsToBand}
        CreateSongAsync={CreateSongAsync}
        DeleteSongAsync={DeleteSongAsync}
        CreateBandAsync={CreateBandAsync}
        DeleteBandAsync={DeleteBandAsync}
    />,
    document.getElementById("root")
);
serviceWorker.unregister();
