import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as serviceWorker from "./serviceWorker";
import { storeSetup } from "./store";
import { Provider } from "react-redux";
import DefaultApp from "./store/containers/defaultContainer"
import { initFontAwesomeLib } from "./styles";
import history from "store/history";

initFontAwesomeLib()

const start = () => storeSetup(history);

ReactDOM.render(
    <Provider store={start()}>
        <DefaultApp history={history} />
    </Provider>,
    document.getElementById("root")
);
serviceWorker.unregister();
