import { EndpointConfiguration, defaultHeader } from "../Configuration";
import Axios from "axios";
import { songlist, bandlist } from "../models";
import { ToSonglist } from "../Util";
import { ReadSongsFromBand } from ".";

const bandsEndpoint = EndpointConfiguration.Bands;

const endPointWithId = (id: string): string => `${bandsEndpoint.GetEndpointUrl!()}/${id}`;

export const ReadBandsAsync = async (): Promise<Array<songlist>> => {
    const bandsResult = await Axios.get<bandlist[]>(bandsEndpoint.GetEndpointUrl!(), {
        headers: defaultHeader
    });

    const songlist = bandsResult.data.map(async result => {
        return {
            ...result,
            isBandList: true,
            isMainList: false,
            songs: result.bandsongs ? await ReadSongsFromBand(result.id) : []
        } as songlist;
    });

    const songlists = await Promise.all(songlist);

    return songlists;

    // return songsResult.data.reduce((prev: HashTable<any>, current: song) => {
    //     prev[current.id] = current;
    //     return prev;
    // }, {} as HashTable<any>);
};

export const CreateBandAsync = async (bandlist: bandlist): Promise<bandlist> => {
    const addResult = await Axios.post<bandlist>(bandsEndpoint.GetEndpointUrl!(), bandlist, {
        headers: defaultHeader
    });

    return addResult.data;
};

export const DeleteBandAsync = async (bandlistId: string): Promise<void> => {
    await Axios.delete<bandlist>(endPointWithId(bandlistId), {
        headers: defaultHeader
    });
};
