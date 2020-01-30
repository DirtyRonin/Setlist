import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App, { IAppProps } from "./App";
import * as serviceWorker from "./serviceWorker";

import InitialStateRequest from "./api/InitialStateRequest";

const runApp = async () => {
    let props = { columns: {}, tasks: {}, columnOrder: [] } as IAppProps;

    try {
        const fetchedData = await InitialStateRequest();
        props = {
            ...fetchedData
        } as IAppProps;
    } catch (error) {
        console.log(error);
    } finally {
        ReactDOM.render(<App {...props} />, document.getElementById("root"));
        serviceWorker.unregister();
    }
};

runApp()
    .then(() => console.log("App startet"))
    .catch(error => console.log(error));
