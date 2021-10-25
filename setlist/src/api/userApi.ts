import Axios, { AxiosResponse } from "axios";

import { EndpointConfiguration, defaultHeader } from "../Configuration";
import { IResponseWrapper } from "../models";
// import { ReadSongsFromBand, ToApiBandlist, ToBandlistAsync, IOdataWrapper } from ".";
import { IUserResource } from "../resource";

const userEndpoint = EndpointConfiguration.Users;

export const GetUsersRequestAsync = async (url: string): Promise<IResponseWrapper<IUserResource>> => {

    const result = await Axios.get(url, {
        headers: defaultHeader
    });

    const Odata: IResponseWrapper<IUserResource> = {
        Values: result.data.value,
        Context: result.data["@odata.context"],
        Count: result.data["@odata.count"],
        NextLink: result.data["@odata.nextLink"],
    }

    return Odata;
}