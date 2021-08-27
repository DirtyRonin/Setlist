import validator from "validator";
import { CreateLocationRequestAsync, DeleteLocationRequestAsync, GetLocationRequestAsync, UpdateLocationRequestAsync } from "api";
import { EndpointConfiguration } from "configuration";
import { Location } from "mapping";
import { IOdataWrapper, ILocation } from "models";

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

export const CreateLocationAsync = async (song: ILocation): Promise<ILocation> => {
    const resource = Location.ToResource(song)

    const result = await CreateLocationRequestAsync(resource)

    return Location.FromResource(result.data)
}

export const UpdateLocationAsync = async(song:ILocation):Promise<ILocation> => {
    const resource = Location.ToResource(song)

    const result = await UpdateLocationRequestAsync(resource)

    return Location.FromResource(result.data)
}

export const DeleteLocationAsync = async (songId: string): Promise<ILocation> => {
    const result = await DeleteLocationRequestAsync(songId);

    return Location.FromResource(result.data);
}