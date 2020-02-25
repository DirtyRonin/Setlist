import Axios from "axios";

import { EndpointConfiguration, defaultHeader } from "../Configuration";
import { IApiBandlist, SonglistType, IBandlist, IBandSummary } from "../models";
import { ReadSongsFromBand, ToApiBandlist, ToBandlist } from ".";
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

const readAllBandsAsync = async (): Promise<IApiBandlist[]> =>
    (
        await Axios.get<IApiBandlist[]>(bandsEndpoint.GetEndpointUrl(), {
            headers: defaultHeader
        })
    ).data;
