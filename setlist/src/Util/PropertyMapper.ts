import { song } from "../models/DndListModels";

export const property = <Song>(name: keyof Song) => name;


const songFields = ["title", "artist", "mode"];

