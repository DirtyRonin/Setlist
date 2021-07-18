import Axios, { AxiosResponse } from "axios";

import { IOdataWrapper } from "../models";
import { EndpointConfiguration, defaultHeader } from "../Configuration";
import { IBandUserResource } from "../resource";

const bandUsersEndpoint = EndpointConfiguration.BandUsers;

export const GetBandUsersRequestAsync = async (url: string): Promise<IOdataWrapper<IBandUserResource>> => {

    const result = await Axios.get(url, {
        headers: defaultHeader
    });

    const Odata: IOdataWrapper<IBandUserResource> = {
        Values: result.data.value,
        Context: result.data["@odata.context"],
        Count: result.data["@odata.count"],
        NextLink: result.data["@odata.nextLink"],
    }

    return Odata;
}