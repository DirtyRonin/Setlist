import { EndpointConfiguration, ACCESS_CONTROL_ALLOW_ORIGIN_HEADER } from "../Configuration";
import { bandlist } from "../models";
import Axios from "axios";

const bandsEndpoint = EndpointConfiguration.Bands;

export const ReadBandsAsync = async (): Promise<Array<bandlist>> => {
    const bandsResult = await Axios.get<bandlist[]>(bandsEndpoint.GetEndpointUrl!(), {
        headers: ACCESS_CONTROL_ALLOW_ORIGIN_HEADER
    });

    return bandsResult.data;

    // return songsResult.data.reduce((prev: HashTable<any>, current: song) => {
    //     prev[current.id] = current;
    //     return prev;
    // }, {} as HashTable<any>);
};

export const CreateBandAsync = async (band: bandlist): Promise<bandlist> => {
    const newBand = { ...band, id: "" };

    const addResult = await Axios.post<bandlist>(bandsEndpoint.GetEndpointUrl!(), newBand, {
        headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json; charset=utf-8" }
    });

    return addResult.data;
};

export const DeleteBandAsync = async (bandId: string): Promise<void> => {
    await Axios.delete<bandlist>(`${bandsEndpoint.GetEndpointUrl!()}/${bandId}`, {
        headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json; charset=utf-8" }
    });
}; 


