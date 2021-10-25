import validator from "validator";
import { nameof } from "ts-simple-nameof"

import { EndpointConfiguration } from "configuration";
import { IBandSong, IResponseWrapper } from "models";
import { GetBandSongsRequestAsync, CreateBandSongRequestAsync, UpdateBandSongRequestAsync, DeleteBandSongRequestAsync } from "api";
import { BandSong } from "mapping";

const bandSongsEndpoint = EndpointConfiguration.Bandsongs;

export const ReadBandSongsAsync = async (filterOrNextLink: string): Promise<IResponseWrapper<IBandSong>> => {

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

export const CreateBandSongAsync = async (bandSong: IBandSong): Promise<IBandSong> => {
    const resource = BandSong.ToResource(bandSong)

    const url =`${bandSongsEndpoint.GetEndpointUrl!()}?$expand=${nameof<IBandSong>(x => x.song)}`
    const result = await CreateBandSongRequestAsync(url,resource)

    return BandSong.FromResource(result.data)
}


export const UpdateBandSongAsync = async(bandSong:IBandSong):Promise<IBandSong> => {
    const resource = BandSong.ToResource(bandSong)
    
    const url =`${bandSongsEndpoint.GetEndpointUrl!()}/${bandSong.id}?$expand=${nameof<IBandSong>(x => x.song)}`
    const result = await UpdateBandSongRequestAsync(url,resource)
    
    return BandSong.FromResource(result.data)
}

export const DeleteBandSongAsync = async (bandSongId: string): Promise<IBandSong> => {

    const url =`${bandSongsEndpoint.GetEndpointUrl!()}/${bandSongId}?$expand=${nameof<IBandSong>(x => x.song)}`
    const result = await DeleteBandSongRequestAsync(url);

    return BandSong.FromResource(result.data);
}