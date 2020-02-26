import Axios from "axios";

import { EndpointConfiguration, defaultHeader, SetlistEndPointDefinition } from "../Configuration";
import { SonglistType, ISetlist } from "../models";

const setlistsEndpoint = (EndpointConfiguration.Setlists as SetlistEndPointDefinition).ActionEndpoints;
const endPointWithId = (actionEndPoint: string,id: string): string => `${actionEndPoint}/${id}`;

export const ReadSetlistsFromBandAsync = async (bandId: string): Promise<Array<ISetlist>> => {
    const setlistsResult = (await Axios.get<ISetlist[]>(endPointWithId(setlistsEndpoint.GetAllSetlistsFromBand.GetEndpointUrl(),bandId), { headers: defaultHeader })).data

    const bandlists = setlistsResult.map(async result => {
        return {
            ...result,
            songlistType: SonglistType.SetList,
            BandId:bandId
        } as ISetlist;
    });

    return await Promise.all(bandlists);

    // return songsResult.data.reduce((prev: HashTable<any>, current: song) => {
    //     prev[current.id] = current;
    //     return prev;
    // }, {} as HashTable<any>);
};


