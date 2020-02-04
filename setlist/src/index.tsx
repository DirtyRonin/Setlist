import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import InitialStateRequest from "./api/InitialStateRequest";
import { AddSong } from "./api/songApi";

const DeleteSong = (a:string,b:string):Promise<void> => Promise.resolve()

ReactDOM.render(<App InitialStateRequest={InitialStateRequest} AddSong={AddSong} DeleteSong={DeleteSong}/>, document.getElementById("root"));
serviceWorker.unregister();
