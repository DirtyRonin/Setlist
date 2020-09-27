import Axios, { AxiosResponse } from "axios";
import { defaultHeader } from "../Configuration";
import { IOdataWrapper } from "../models";
import { IBandSongResource } from "../resource";

export const GetBandSongsRequestAsync = async (url: string): Promise<IOdataWrapper<IBandSongResource>> => {

    const result = await Axios.get(url, {
        headers: defaultHeader
    });

    const Odata: IOdataWrapper<IBandSongResource> = {
        Values: result.data.value,
        Context: result.data["@odata.context"],
        Count: result.data["@odata.count"],
        NextLink: result.data["@odata.nextLink"],
    }

    return Odata;
}

export const CreateBandSongRequestAsync = async (url: string, bandSong: IBandSongResource): Promise<AxiosResponse<IBandSongResource>> => {
    return await Axios.post<IBandSongResource>(url, bandSong, {
        headers: defaultHeader
    });
}