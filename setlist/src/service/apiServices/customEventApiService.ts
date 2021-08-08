import validator from "validator";
import { GetCustomEventRequestAsync } from "../../api";
import { EndpointConfiguration } from "../../Configuration";
import { CustomEvent } from "../../mapping";
import { IOdataWrapper, ICustomEvent } from "../../models";

export const ReadCustomEventAsync = async (filterOrNextLink: string): Promise<IOdataWrapper<ICustomEvent>> => {

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
        `${EndpointConfiguration.CustomEvents.GetEndpointUrl()}/${filterOrNextLink.toLowerCase()}`

    const odataCustomEventResources = await GetCustomEventRequestAsync(url);

    const customEvent = odataCustomEventResources.Values.map(resource =>
        CustomEvent.FromResource(resource)
    )

    return { ...odataCustomEventResources, Values: customEvent }
};