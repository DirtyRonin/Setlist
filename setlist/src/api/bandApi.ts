import Axios, { AxiosResponse } from "axios";

import { EndpointConfiguration, defaultHeader } from "../Configuration";
import { IApiBandlist, CatalogType, IBandCatalog, IBandSummary, IOdataWrapper } from "../models";
// import { ReadSongsFromBand, ToApiBandlist, ToBandlistAsync, IOdataWrapper } from ".";
import { HashTable } from "../Util";
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



