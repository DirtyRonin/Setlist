import Axios from "axios";

import { EndpointConfiguration, defaultHeader, SetEndPointDefinition } from "../Configuration";
import { CatalogType, ISetCatalog, IApiSetList } from "../models";
// import { ToApiSetList, ToSetlistAsync } from ".";

const setEndpoint = (EndpointConfiguration.Sets as SetEndPointDefinition).ActionEndpoints;
const endPointWithId = (actionEndPoint: string, id: string): string => `${actionEndPoint}/${id}`;

export const ReadSetlistsFromBandAsync = async (bandId: number): Promise<ISetCatalog[]> => {
    const setlistsResult = (await Axios.get<ISetCatalog[]>(endPointWithId(setEndpoint.GetSetsByBandId.GetEndpointUrl(), bandId.toString()), { headers: defaultHeader })).data

    const setlists = await setlistsResult.map( result => {
        return {
            ...result,
            SonglistType: CatalogType.SetList,
            BandId: bandId.toString()
        } as ISetCatalog;
    });

    return setlists;
};

// export const AddSetlistToBandAsync = async (setlist: ISetCatalog): Promise<ISetCatalog> => {

//     const apiSetlist = ToApiSetList(setlist)

//     const addSetlistResult = (await Axios.post<IApiSetList>(setEndpoint.AddSet.GetEndpointUrl(), apiSetlist, { headers: defaultHeader })).data;

//     return await ToSetlistAsync(addSetlistResult);
// }



