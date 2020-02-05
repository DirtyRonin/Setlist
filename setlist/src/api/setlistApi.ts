import Axios from "axios";
import { setlist } from "../models/DndListModels";
import { HashTable } from "../Util/HashTable";
import {EndpointConfiguration, ACCESS_CONTROL_ALLOW_ORIGIN_HEADER } from "../Configuration";

const endpoint = EndpointConfiguration.Setlists;

export const GetSetlists = async (): Promise<HashTable<setlist>> => {
    const songsResult = await Axios.get<setlist[]>(endpoint.GetEndpointUrl!(), {
        headers: ACCESS_CONTROL_ALLOW_ORIGIN_HEADER
    });

    return songsResult.data.reduce((prev: HashTable<any>, current: setlist) => {
        prev[current.id] = current;
        return prev;
    }, {} as HashTable<any>);
};

export const AddSetlist = async (setlist: setlist): Promise<setlist> => {

    const addResult = await Axios.post<setlist>(endpoint.GetEndpointUrl!(), setlist, {
        headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json; charset=utf-8" }
    });

    return addResult.data;
};
export const UpdateSetlist = async (setlist: setlist): Promise<setlist> => {

    const putSetlist = {id:setlist.id, setlist:setlist}

    const addResult = await Axios.put<setlist>(endpoint.GetEndpointUrl!(), putSetlist, {
        headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" }
    });

    return addResult.data;
};

// export const DeleteSetlist = async (setlist: setlist): Promise<void> => {

//     const putSetlist = {id:setlist.id, setlist}

//     const addResult = await Axios.put<setlist>(endpoint.GetEndpointUrl!(), putSetlist, {
//         headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json; charset=utf-8" }
//     });

//     return addResult.data;
// };
