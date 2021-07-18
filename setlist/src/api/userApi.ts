import Axios, { AxiosResponse } from "axios";

import { EndpointConfiguration, defaultHeader } from "../Configuration";
import { IOdataWrapper } from "../models";
// import { ReadSongsFromBand, ToApiBandlist, ToBandlistAsync, IOdataWrapper } from ".";
import { IUserResource } from "../resource";

const userEndpoint = EndpointConfiguration.Users;

export const GetUsersRequestAsync = async (url: string): Promise<IOdataWrapper<IUserResource>> => {

    const result = await Axios.get(url, {
        headers: defaultHeader
    });

    const Odata: IOdataWrapper<IUserResource> = {
        Values: result.data.value,
        Context: result.data["@odata.context"],
        Count: result.data["@odata.count"],
        NextLink: result.data["@odata.nextLink"],
    }

    return Odata;
}