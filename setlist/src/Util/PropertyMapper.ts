import { song } from "../models";

export const property = <Song>(name: keyof Song) => name;


const songFields = ["title", "artist", "mode"];

