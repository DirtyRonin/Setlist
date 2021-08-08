import validator from "validator";
import { GetLocationRequestAsync } from "../../api";
import { EndpointConfiguration } from "../../Configuration";
import { Location } from "../../mapping";
import { IOdataWrapper, ILocation } from "../../models";

export const ReadLocationAsync = async (filterOrNextLink: string): Promise<IOdataWrapper<ILocation>> => {

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
        `${EndpointConfiguration.Locations.GetEndpointUrl()}/${filterOrNextLink.toLowerCase()}`

    const odataLocationResources = await GetLocationRequestAsync(url);

    const location = odataLocationResources.Values.map(resource =>
        Location.FromResource(resource)
    )

    return { ...odataLocationResources, Values: location }
};