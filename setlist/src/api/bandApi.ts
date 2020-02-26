import Axios from "axios";

import { EndpointConfiguration, defaultHeader } from "../Configuration";
import { IApiBandlist, SonglistType, IBandlist, IBandSummary } from "../models";
import { ReadSongsFromBand, ToApiBandlist, ToBandlistAsync } from ".";
import { HashTable } from "../Util";

const bandsEndpoint = EndpointConfiguration.Bands;

const endPointWithId = (id: string): string => `${bandsEndpoint.GetEndpointUrl!()}/${id}`;

export const ReadBandsAsync = async (): Promise<Array<IBandlist>> => {
    const bandsResult = await readAllBandsAsync();

    const bandlists = bandsResult.map(async result => {
        return {
            ...result,
            songlistType: SonglistType.BandList,
            songs: result.bandsongs ? await ReadSongsFromBand(result.id) : []
        } as IBandlist;
    });

    return await Promise.all(bandlists);

    // return songsResult.data.reduce((prev: HashTable<any>, current: song) => {
    //     prev[current.id] = current;
    //     return prev;
    // }, {} as HashTable<any>);
};

export const ReadBandsSummaryAsync = async (): Promise<HashTable<IBandSummary>> => {
    const bandsResult = await readAllBandsAsync();

    return bandsResult.reduce((hashTable, apiBandlist) => {
        const { id, title } = apiBandlist;
        hashTable[id] = { id, title } as IBandSummary;

        return hashTable;
    }, {} as HashTable<any>);
};

const readAllBandsAsync = async (): Promise<IApiBandlist[]> =>
    (
        await Axios.get<IApiBandlist[]>(bandsEndpoint.GetEndpointUrl(), {
            headers: defaultHeader
        })
    ).data;

export const CreateBandAsync = async (bandlist: IBandlist): Promise<IBandlist> => {
    const apiBand: IApiBandlist = ToApiBandlist(bandlist);

    const addResult = await Axios.post<IApiBandlist>(bandsEndpoint.GetEndpointUrl!(), apiBand, {
        headers: defaultHeader
    });

    return ToBandlistAsync(addResult.data);
};

export const DeleteBandAsync = async (bandlistId: string): Promise<void> => {
    await Axios.delete<IApiBandlist>(endPointWithId(bandlistId), {
        headers: defaultHeader
    });
};
