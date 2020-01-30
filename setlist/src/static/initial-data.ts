import { dndList } from "../models/DndListModels";

export const initialData: dndList = {
    tasks: {
        "task-1": { id: "task-1", title: "Take out the garbage" , artist: "ArtistName", mode: "C"},
        "task-2": { id: "task-2", title: "Watch my favorite show", artist: "ArtistName", mode: "C" },
        "task-3": { id: "task-3", title: "charge my phone", artist: "ArtistName", mode: "C" },
        "task-4": { id: "task-4", title: "Cook dinner", artist: "ArtistName", mode: "C" }
    },
    columns: {
        "column-1": {
            id: "column-1",
            title: "To do",
            taskIds: ["task-1", "task-2", "task-3", "task-4"]
        },
        "column-2": {
            id: "column-2",
            title: "Finished",
            taskIds: []
        }
    },
    columnOrder: ["column-1", "column-2"]
};

