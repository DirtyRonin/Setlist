import { IOdataWrapper, IUser } from "../../models";
import validator from "validator";
import { EndpointConfiguration } from "../../Configuration";
import { User } from "../../mapping";
import { GetUsersRequestAsync } from "../../api/userApi";

export const ReadUsersAsync = async (filterOrNextLink: string): Promise<IOdataWrapper<IUser>> => {

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
        `${EndpointConfiguration.Users.GetEndpointUrl()}/${filterOrNextLink.toLowerCase()}`

    const odataUserResources = await GetUsersRequestAsync(url);

    const users = odataUserResources.Values.map(resource =>
        User.FromResource(resource)
    )

    return { ...odataUserResources, Values: users }
};