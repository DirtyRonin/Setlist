import Axios from "axios";
import { EndpointConfiguration, ACCESS_CONTROL_ALLOW_ORIGIN_HEADER } from "../Configuration";
import { song } from "../models";

const bandsEndpoint = EndpointConfiguration.Bands;

export const ReadBandsAsync = async (): Promise<Array<song>> => {
    const bandsResult = await Axios.get<song[]>(bandsEndpoint.GetEndpointUrl!(), {
        headers: ACCESS_CONTROL_ALLOW_ORIGIN_HEADER
    });

    return bandsResult.data;

    // return songsResult.data.reduce((prev: HashTable<any>, current: song) => {
    //     prev[current.id] = current;
    //     return prev;
    // }, {} as HashTable<any>);
};