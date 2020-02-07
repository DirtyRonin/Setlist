import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import InitialStateRequest from "./api/InitialStateRequest";
import { AddSong, AddSetlist, UpdateSetlist } from "./api";

const DeleteSong = (a:string,b:string):Promise<void> => Promise.resolve()

ReactDOM.render(<App CreateSetlistAsync={AddSetlist} UpdateSetlistAsync={UpdateSetlist} InitialStateRequest={InitialStateRequest} CreateSongAsync={AddSong} DeleteSongAsync={DeleteSong}/>, document.getElementById("root"));
serviceWorker.unregister();
