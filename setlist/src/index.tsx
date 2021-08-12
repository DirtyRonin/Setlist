import React from "react";
import ReactDOM from "react-dom";


import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as serviceWorker from "./serviceWorker";
import { storeSetup } from "./store";
import { Provider } from "react-redux";
import DefaultApp from "./store/containers/defaultContainer"
import { initFontAwesomeLib } from "./styles";

initFontAwesomeLib()

const start = () =>  storeSetup();

ReactDOM.render(
    <Provider store={start()}>
        <DefaultApp />
    </Provider>,
    document.getElementById("root")
);
serviceWorker.unregister();
