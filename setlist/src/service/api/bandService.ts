import { IOdataWrapper, IBand } from "../../models";
import validator from "validator";
import { EndpointConfiguration } from "../../Configuration";
import { Band } from "../../mapping";
import { GetBandsRequestAsync } from "../../api";

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