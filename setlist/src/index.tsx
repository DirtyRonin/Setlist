import React from "react";
import ReactDOM from "react-dom";
import Axios from "axios";

import "./index.css";
import App, { IAppProps } from "./App";
import * as serviceWorker from "./serviceWorker";

import { HashTable, task, column, dndList } from "./models/DndListModels";
import { song } from "./models/songs";

const ApiRequest = async (): Promise<dndList> => {
    const apiResult = await Axios.get(`http://localhost:5000/api/songs`, {
        headers: { "Access-Control-Allow-Origin": "*" }
    });

    const { tasks, columns, columnOrder } = { columns: {}, tasks: {}, columnOrder: [] } as dndList;

    const songs = apiResult.data;

    const fetchtedTasks: HashTable<task> = songs.reduce((prev: HashTable<any>, current: song) => {
        prev[current.id] = { id: current.id, content: `${current.title} - ${current.artist}` };
        return prev;
    }, {} as HashTable<any>);

    const newTasks: HashTable<task> = {
        ...tasks,
        ...fetchtedTasks
    };

    const newColumns: HashTable<column> = {
        ...columns,
        ...({ songs: { id: "songs", title: "All Songs", taskIds: Object.keys(fetchtedTasks) } } as HashTable<column>)
    };

    const newColumnOrder: string[] = [...columnOrder, ...["songs"]];
    return { tasks: newTasks, columns: newColumns, columnOrder: newColumnOrder } as dndList;
};

const runApp = async () => {
    let props = { columns: {}, tasks: {}, columnOrder: [] } as IAppProps;
    try {
        const fetchedData = await ApiRequest();
        props = {
            ...fetchedData
        } as IAppProps;
    } catch (error) {
        console.log(error);
    } finally {
        ReactDOM.render(<App {...props} />, document.getElementById("root"));

        // If you want your app to work offline and load faster, you can change
        // unregister() to register() below. Note this comes with some pitfalls.
        // Learn more about service workers: https://bit.ly/CRA-PWA
        serviceWorker.unregister();
    }
};

runApp()
    .then(result => console.log("App startet"))
    .catch(error => console.log(error));
