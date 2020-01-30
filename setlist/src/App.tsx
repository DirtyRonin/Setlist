import React from "react";
import Setlist, { ISetlistProps } from "./components/setlist";

export interface IAppProps extends ISetlistProps {}

const App = (props: IAppProps) => <Setlist {...props} />;

export default App;
