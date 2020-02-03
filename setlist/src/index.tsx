import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import InitialStateRequest from "./api/InitialStateRequest";

// const runApp = async () => {
// let props = { columns: {}, songs: {}, columnOrder: [] } as IAppProps;

// try {
//     const fetchedData = await InitialStateRequest();
//     props = {
//         ...fetchedData
//     } as IAppProps;
// } catch (error) {
//     console.log(error);
// } finally {
ReactDOM.render(<App InitialStateRequest={InitialStateRequest} />, document.getElementById("root"));
serviceWorker.unregister();
// }
// };

// runApp()
//     .then(() => console.log("App startet"))
//     .catch(error => console.log(error));
