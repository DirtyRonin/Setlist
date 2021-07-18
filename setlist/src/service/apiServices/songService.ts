import validator from 'validator';

import { ISong, IOdataWrapper } from "../../models";
import { GetSongsRequestAsync, CreateSongRequestAsync, DeleteSongRequestAsync, UpdateSongRequestAsync } from "../../api";
import { Song } from "../../mapping";
import { EndpointConfiguration } from '../../Configuration';

export const ReadSongsAsync = async (filterOrNextLink: string): Promise<IOdataWrapper<ISong>> => {

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
        `${EndpointConfiguration.Songs.GetEndpointUrl()}/${filterOrNextLink.toLowerCase()}`

    const odataSongResources = await GetSongsRequestAsync(url);

    const songs = odataSongResources.Values.map(resource =>
        Song.FromResource(resource)
    )

    return { ...odataSongResources, Values: songs }
};

export const CreateSongAsync = async (song: ISong): Promise<ISong> => {
    const resource = Song.ToResource(song)

    const result = await CreateSongRequestAsync(resource)

    return Song.FromResource(result.data)
}

export const UpdateSongAsync = async(song:ISong):Promise<ISong> => {
    const resource = Song.ToResource(song)

    const result = await UpdateSongRequestAsync(resource)

    return Song.FromResource(result.data)
}

export const DeleteSongAsync = async (songId: string): Promise<ISong> => {
    const result = await DeleteSongRequestAsync(songId);

    return Song.FromResource(result.data);
}