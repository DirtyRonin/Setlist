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

initFontAwesomeLib()
Parse.initialize('xso9wyIPU7eDc6fcDvwLQpTDPhmCPRpoP10mu5oR','3fvQOFEiORwyymI9yG5eihqg1FXwArqeczKiLvJP')
Parse.serverURL = 'https://parseapi.back4app.com/'

const start = () => storeSetup(history);

ReactDOM.render(
    <Provider store={start()}>
        <DefaultApp history={history} />
    </Provider>,
    document.getElementById("root")
);
serviceWorker.unregister();
