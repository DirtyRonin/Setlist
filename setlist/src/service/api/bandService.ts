import { IOdataWrapper, IBand } from "../../models";
import validator from "validator";
import { EndpointConfiguration } from "../../Configuration";
import { Band } from "../../mapping";
import { GetBandsRequestAsync, CreateBandRequestAsync, UpdateBandRequestAsync, DeleteBandRequestAsync } from "../../api";

export const ReadBandsAsync = async (filterOrNextLink: string): Promise<IOdataWrapper<IBand>> => {

    const default_url_options = {
        protocols: ['http', 'https', 'ftp'],
        require_tld: false,
        require_protocol: false,
        require_host: false,
        require_valid_protocol: false,
        allow_underscores: false,
        allow_trailing_dot: false,
        allow_protocol_relative_urls: false
      };

    const url = validator.isURL(filterOrNextLink,default_url_options) ? filterOrNextLink :
        `${EndpointConfiguration.Bands.GetEndpointUrl()}/${filterOrNextLink.toLowerCase()}`

    const odataBandResources = await GetBandsRequestAsync(url);

    const bands = odataBandResources.Values.map(resource =>
        Band.FromResource(resource)
    )

    return { ...odataBandResources, Values: bands }
};

export const CreateBandAsync = async (item: IBand): Promise<IBand> => {
    const resource = Band.ToResource(item)

    const result = await CreateBandRequestAsync(resource)

    return Band.FromResource(result.data)
}

export const UpdateBandAsync = async(item:IBand):Promise<IBand> => {
    const resource = Band.ToResource(item)

    const result = await UpdateBandRequestAsync(resource)

    return Band.FromResource(result.data)
}

export const DeleteBandAsync = async (itemId: string): Promise<IBand> => {
    const result = await DeleteBandRequestAsync(itemId);

    return Band.FromResource(result.data);
}