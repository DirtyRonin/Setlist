import validator from "validator";
import { IBandUser, IResponseWrapper } from "../../models";
import { EndpointConfiguration } from "../../Configuration";
import { GetBandUsersRequestAsync } from "../../api/bandUserApi";
import { BandUser } from "../../mapping/bandUser";

export const ReadBandUsersAsync = async (filterOrNextLink: string): Promise<IResponseWrapper<IBandUser>> => {

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

    const url = validator.isURL(filterOrNextLink, default_url_options) ? filterOrNextLink :
        `${EndpointConfiguration.BandUsers.GetEndpointUrl()}/${filterOrNextLink.toLowerCase()}`

    const odataBandUserResources = await GetBandUsersRequestAsync(url);

    const bandUsers = odataBandUserResources.Values.map(resource =>
        BandUser.FromResource(resource)
    )

    return { ...odataBandUserResources, Values: bandUsers }
};