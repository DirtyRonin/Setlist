import { EndpointConfiguration, ACCESS_CONTROL_ALLOW_ORIGIN_HEADER } from "../Configuration";
import Axios from "axios";
import { songlist, bandlist } from "../models";
import { ToSonglist } from "../Util";

const bandsEndpoint = EndpointConfiguration.Bands;

export const ReadBandsAsync = async (): Promise<Array<songlist>> => {
    const bandsResult = await Axios.get<bandlist[]>(bandsEndpoint.GetEndpointUrl!(), {
        headers: ACCESS_CONTROL_ALLOW_ORIGIN_HEADER
    });
    const songlists = bandsResult.data.map(band => ToSonglist(band))
    return songlists;

    // return songsResult.data.reduce((prev: HashTable<any>, current: song) => {
    //     prev[current.id] = current;
    //     return prev;
    // }, {} as HashTable<any>);
};

export const CreateBandAsync = async (bandlist: bandlist): Promise<bandlist> => {
    

    const addResult = await Axios.post<bandlist>(bandsEndpoint.GetEndpointUrl!(), bandlist, {
        headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json; charset=utf-8" }
    });

    return addResult.data;
};

export const DeleteBandAsync = async (bandlistId: string): Promise<void> => {

    await Axios.delete<bandlist>(`${bandsEndpoint.GetEndpointUrl!()}/${bandlistId}`, {
        headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json; charset=utf-8" }
    });
};


