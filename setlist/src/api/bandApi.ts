import Axios, { AxiosResponse } from "axios";

import { EndpointConfiguration, defaultHeader } from "../Configuration";
import { IApiBandlist, CatalogType, IBandCatalog, IBandSummary } from "../models";
// import { ReadSongsFromBand, ToApiBandlist, ToBandlistAsync, IOdataWrapper } from ".";
import { HashTable } from "../Util";
import { IBandResource } from "../resources";

const bandsEndpoint = EndpointConfiguration.Bands;

const endPointWithId = (id: string): string => `${bandsEndpoint.GetEndpointUrl!()}/${id}`;

// export const GetBandsRequestAsync = async (query:string): Promise<IBandResource[]> =>
//         {
//             const result = await Axios.get<IOdataWrapper<IBandResource[]>>(`${bandsEndpoint.GetEndpointUrl()}${query ? query : ""}`, {
//             headers: defaultHeader
//         });
//     return result.data.value;
//     }

/* export const ReadBandsAsync = async (): Promise<Array<IBandlist>> => {
    const bandsResult = await GetBandsRequestAsync();

    const bandlists = bandsResult.map(async result => {
        return await ToBandlistAsync(result);
    });

    return await Promise.all(bandlists);

    // return songsResult.data.reduce((prev: HashTable<any>, current: song) => {
    //     prev[current.id] = current;
    //     return prev;
    // }, {} as HashTable<any>);
}; */

// export const ReadBandsSummaryAsync = async (): Promise<HashTable<IBandSummary>> => {
//     const bandsResult = await GetBandsRequestAsync("");

//     return bandsResult.reduce((hashTable, apiBandlist) => {
//         const { Id: id, Title: title } = apiBandlist;
//         hashTable[id] = { Id: id, Title: title } as IBandSummary;

//         return hashTable;
//     }, {} as HashTable<any>);
// };



// export const CreateBandAsync = async (bandlist: IBandCatalog): Promise<IBandCatalog> => {
//     const apiBand: IApiBandlist = ToApiBandlist(bandlist);

//     const addResult = await Axios.post<IApiBandlist>(bandsEndpoint.GetEndpointUrl(), apiBand, {
//         headers: defaultHeader
//     });

//     return ToBandlistAsync(addResult.data);
// };

export const DeleteBandAsync = async (bandlistId: string): Promise<void> => {
    await Axios.delete<IApiBandlist>(endPointWithId(bandlistId), {
        headers: defaultHeader
    });
};
