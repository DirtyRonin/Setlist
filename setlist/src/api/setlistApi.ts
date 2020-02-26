import Axios from "axios";

import { EndpointConfiguration, defaultHeader, SetlistEndPointDefinition } from "../Configuration";
import { SonglistType, ISetlist, IApiSetList } from "../models";
import { ToApiSetList, ToSetlistAsync } from ".";

const setlistsEndpoint = (EndpointConfiguration.Setlists as SetlistEndPointDefinition).ActionEndpoints;
const endPointWithId = (actionEndPoint: string, id: string): string => `${actionEndPoint}/${id}`;

export const ReadSetlistsFromBandAsync = async (bandId: string): Promise<ISetlist[]> => {
    const setlistsResult = (await Axios.get<ISetlist[]>(endPointWithId(setlistsEndpoint.GetAllSetlistsFromBand.GetEndpointUrl(), bandId), { headers: defaultHeader })).data

    const setlists = setlistsResult.map( result => {
        return {
            ...result,
            songlistType: SonglistType.SetList,
            BandId: bandId
        } as ISetlist;
    });

    return setlists;
};

export const AddSetlistToBandAsync = async (setlist: ISetlist): Promise<ISetlist> => {
    const {BandId} = setlist;

    const apiSetlist = ToApiSetList(setlist)

    const addSetlistResult = (await Axios.post<IApiSetList>(endPointWithId(setlistsEndpoint.AddSetlistToBand.GetEndpointUrl(), BandId), apiSetlist, { headers: defaultHeader })).data;

    return await ToSetlistAsync(addSetlistResult,BandId);
}


