import Axios, { AxiosResponse } from "axios";
import { EndpointConfiguration, defaultHeader, BandSongsEndPointDefinition } from "../Configuration";
import { ISong, IOdataWrapper } from "../models";
import { IBandSongResource } from "../resource";

const bandSongsEndpoint = EndpointConfiguration.Bandsongs;

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

export const CreateBandSongRequestAsync = async (bandSong: IBandSongResource): Promise<AxiosResponse<IBandSongResource>> => {
    //maybe edit type to remove prop Song
    return await Axios.post<IBandSongResource>(bandSongsEndpoint.GetEndpointUrl!(), bandSong, {
        headers: defaultHeader
    });
}