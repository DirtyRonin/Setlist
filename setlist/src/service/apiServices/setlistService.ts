import validator from "validator";
import { CreateSetlistRequestAsync, GetSetlistRequestAsync } from "../../api/setlistApi";
import { EndpointConfiguration } from "../../Configuration";
import { Setlist } from "../../mapping";
import { IOdataWrapper, ISetlist } from "../../models";

export const ReadSetlistAsync = async (filterOrNextLink: string): Promise<IOdataWrapper<ISetlist>> => {

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
        `${EndpointConfiguration.Setlist.GetEndpointUrl()}/${filterOrNextLink.toLowerCase()}`

    const odataSetlistResources = await GetSetlistRequestAsync(url);

    const setlist = odataSetlistResources.Values.map(resource =>
        Setlist.FromResource(resource)
    )

    return { ...odataSetlistResources, Values: setlist }
};

export const CreateSetlistAsync = async (item: ISetlist): Promise<ISetlist> => {
    const resource = Setlist.ToResource(item)

    const result = await CreateSetlistRequestAsync(resource)

    return Setlist.FromResource(result.data)
}