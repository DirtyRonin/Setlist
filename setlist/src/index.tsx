import React from "react";
import ReactDOM from "react-dom";
import Parse from "parse"

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as serviceWorker from "./serviceWorker";
import { storeSetup } from "./store";
import { Provider } from "react-redux";
import DefaultApp from "./store/containers/defaultContainer"
import { initFontAwesomeLib } from "./styles";
import history from "store/history";
import Snackbar from "./store/containers/snackbar/snackbarContainer";

initFontAwesomeLib()

const start = () => storeSetup(history);

ReactDOM.render(
    <Provider store={start()}>
        <DefaultApp history={history} />
        <Snackbar />
    </Provider>,
    document.getElementById("root")
);
serviceWorker.unregister();
