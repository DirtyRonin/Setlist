import { EndpointConfiguration, ACCESS_CONTROL_ALLOW_ORIGIN_HEADER } from "../Configuration";
import { band } from "../models";
import Axios from "axios";

const bandsEndpoint = EndpointConfiguration.Bands;

export const ReadBandsAsync = async (): Promise<Array<band>> => {
    const bandsResult = await Axios.get<band[]>(bandsEndpoint.GetEndpointUrl!(), {
        headers: ACCESS_CONTROL_ALLOW_ORIGIN_HEADER
    });

    return bandsResult.data;

    // return songsResult.data.reduce((prev: HashTable<any>, current: song) => {
    //     prev[current.id] = current;
    //     return prev;
    // }, {} as HashTable<any>);
};