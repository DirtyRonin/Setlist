import validator from "validator";
import { GetSetlistSongRequestAsync } from "../../api";
import { EndpointConfiguration } from "../../Configuration";
import { SetlistSong } from "../../mapping";
import { IOdataWrapper, ISetlistSong } from "../../models";

export const ReadSetlistSongAsync = async (filterOrNextLink: string): Promise<IOdataWrapper<ISetlistSong>> => {

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
        `${EndpointConfiguration.SetlistSong.GetEndpointUrl()}/${filterOrNextLink.toLowerCase()}`

    const odataSetlistSongResources = await GetSetlistSongRequestAsync(url);

    const setlistSong = odataSetlistSongResources.Values.map(resource =>
        SetlistSong.FromResource(resource)
    )

    return { ...odataSetlistSongResources, Values: setlistSong }
};