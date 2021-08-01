import Axios from "axios";
import { defaultHeader } from "../Configuration";
import { IOdataWrapper } from "../models";
import { ISetlistSongResource } from "../resource";

export const GetSetlistSongRequestAsync = async (url: string): Promise<IOdataWrapper<ISetlistSongResource>> => {

    const result = await Axios.get(url, {
        headers: defaultHeader
    });

    const Odata: IOdataWrapper<ISetlistSongResource> = {
        Values: result.data.value,
        Context: result.data["@odata.context"],
        Count: result.data["@odata.count"],
        NextLink: result.data["@odata.nextLink"],
    }

    return Odata;
}