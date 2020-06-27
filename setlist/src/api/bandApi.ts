import Axios, { AxiosResponse } from "axios";

import { EndpointConfiguration, defaultHeader } from "../Configuration";
import { IOdataWrapper } from "../models";
// import { ReadSongsFromBand, ToApiBandlist, ToBandlistAsync, IOdataWrapper } from ".";
import { IBandResource } from "../resource";

const bandsEndpoint = EndpointConfiguration.Bands;

export const GetBandsRequestAsync = async (url: string): Promise<IOdataWrapper<IBandResource>> => {

    const result = await Axios.get(url, {
        headers: defaultHeader
    });

    const Odata: IOdataWrapper<IBandResource> = {
        Values: result.data.value,
        Context: result.data["@odata.context"],
        Count: result.data["@odata.count"],
        NextLink: result.data["@odata.nextLink"],
    }

    return Odata;
}

export const CreateBandRequestAsync = async (band: IBandResource): Promise<AxiosResponse<IBandResource>> => {
    return await Axios.post<IBandResource>(bandsEndpoint.GetEndpointUrl!(), band, {
        headers: defaultHeader
    });
}

export const UpdateBandRequestAsync = async (value: IBandResource): Promise<AxiosResponse<IBandResource>> =>
    await Axios.put<IBandResource>(`${bandsEndpoint.GetEndpointUrl!()}/${value.Id}`, value, {
        headers: defaultHeader
    });

    export const DeleteBandRequestAsync = async (itemId: string): Promise<AxiosResponse<IBandResource>> =>
    await Axios.delete<IBandResource>(`${bandsEndpoint.GetEndpointUrl!()}/${itemId}`, {
        headers: defaultHeader
    });