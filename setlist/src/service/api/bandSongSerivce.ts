import validator from "validator";
import { EndpointConfiguration } from "../../Configuration";
import { IBandSong, IOdataWrapper } from "../../models";
import { GetBandSongsRequestAsync } from "../../api";
import { BandSong } from "../../mapping";

export const ReadBandSongsAsync = async (filterOrNextLink: string): Promise<IOdataWrapper<IBandSong>> => {

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
        `${EndpointConfiguration.Bandsongs.GetEndpointUrl()}/${filterOrNextLink.toLowerCase()}`

    const odataBandSongResources = await GetBandSongsRequestAsync(url);

    const bandSongs = odataBandSongResources.Values.map(resource =>
        BandSong.FromResource(resource)
    )

    return { ...odataBandSongResources, Values: bandSongs }
};