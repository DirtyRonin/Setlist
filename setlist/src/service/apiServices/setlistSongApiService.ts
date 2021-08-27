import { nameof } from "ts-simple-nameof";
import validator from "validator";

import { GetSetlistSongRequestAsync, CreateSetlistSongRequestAsync, DeleteSetlistSongRequestAsync, UpdateSetlistSongRequestAsync } from "api";
import { EndpointConfiguration } from "configuration";
import { SetlistSong } from "mapping";
import { IOdataWrapper, ISetlistSong } from "models";

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

    const url = validator.isURL(filterOrNextLink, default_url_options) ? filterOrNextLink :
        `${EndpointConfiguration.SetlistSong.GetEndpointUrl()}/${filterOrNextLink.toLowerCase()}`

    const odataSetlistSongResources = await GetSetlistSongRequestAsync(url);

    const setlistSong = odataSetlistSongResources.Values.map(resource =>
        SetlistSong.FromResource(resource)
    )

    return { ...odataSetlistSongResources, Values: setlistSong }
};

export const CreateSetlistSongAsync = async (setlistSong: ISetlistSong): Promise<ISetlistSong> => {
    const resource = SetlistSong.ToResource(setlistSong)

    const url = `${EndpointConfiguration.SetlistSong.GetEndpointUrl!()}?$expand=${nameof<ISetlistSong>(x => x.Song)}` // gibt props song gleich mit zurück
    const result = await CreateSetlistSongRequestAsync(url, resource)

    return SetlistSong.FromResource(result.data)
}

export const UpdateSetlistSongAsync = async (setlistSong: ISetlistSong): Promise<ISetlistSong> => {
    const resource = SetlistSong.ToResource(setlistSong)

    const url = `${EndpointConfiguration.SetlistSong.GetEndpointUrl!()}/${setlistSong.Id}?$expand=${nameof<ISetlistSong>(x => x.Song)}`
    const result = await UpdateSetlistSongRequestAsync(url, resource)

    return SetlistSong.FromResource(result.data)
}

export const DeleteSetlistSongAsync = async (setlistSongId: string): Promise<ISetlistSong> => {

    const url = `${EndpointConfiguration.SetlistSong.GetEndpointUrl!()}/${setlistSongId}?$expand=${nameof<ISetlistSong>(x => x.Song)}`
    const result = await DeleteSetlistSongRequestAsync(url);

    return SetlistSong.FromResource(result.data);
}