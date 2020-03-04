import Axios from "axios";

import { EndpointConfiguration, defaultHeader, SetEndPointDefinition } from "../Configuration";
import { SonglistType, ISet, IApiSetList } from "../models";
import { ToApiSetList, ToSetlistAsync } from ".";

const setEndpoint = (EndpointConfiguration.Sets as SetEndPointDefinition).ActionEndpoints;
const endPointWithId = (actionEndPoint: string, id: string): string => `${actionEndPoint}/${id}`;

export const ReadSetlistsFromBandAsync = async (bandId: number): Promise<ISet[]> => {
    const setlistsResult = (await Axios.get<ISet[]>(endPointWithId(setEndpoint.GetSetsByBandId.GetEndpointUrl(), bandId.toString()), { headers: defaultHeader })).data

    const setlists = await setlistsResult.map( result => {
        return {
            ...result,
            songlistType: SonglistType.SetList,
            bandId: bandId.toString()
        } as ISet;
    });

    return setlists;
};

export const AddSetlistToBandAsync = async (setlist: ISet): Promise<ISet> => {

    const apiSetlist = ToApiSetList(setlist)

    const addSetlistResult = (await Axios.post<IApiSetList>(setEndpoint.AddSet.GetEndpointUrl(), apiSetlist, { headers: defaultHeader })).data;

    return await ToSetlistAsync(addSetlistResult);
}



