import React from "react";

import { initialData } from "./static/initial-data";
import Setlist from "./components/setlist";

const App = () => <Setlist {...initialData} />;

export default App
