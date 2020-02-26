import { ConfigurationItemCollection } from "../ConfigurationItemCollection";
import { GetEndpointURL, EndpointPartialTypeDefinition, EndPointDefinition, NameDefinition } from "./EndPointConfig";

type SetlistSongsActionNames = "GetSetlistSongs" | "AddSetlistSongs" | "RemoveSetlistSongs";

export type SetlistSongsEndPointDefinition = EndPointDefinition & {
    ActionEndpoints: ConfigurationItemCollection<EndPointDefinition, SetlistSongsActionNames>;
};

const SetlistSongsPartialTypeDefinition: ConfigurationItemCollection<NameDefinition, SetlistSongsActionNames> = {
    GetSetlistSongs: { Name: "GetSetlistSongs" },
    AddSetlistSongs: { Name: "AddSetlistSongs" },
    RemoveSetlistSongs: { Name: "RemoveSetlistSongs" }
};

export const SetlistSongsConfiguration: ConfigurationItemCollection<EndPointDefinition, SetlistSongsActionNames> = {
    GetSetlistSongs: {
        Name: SetlistSongsPartialTypeDefinition.GetSetlistSongs.Name,
        GetEndpointUrl: () =>
            GetEndpointURL(EndpointPartialTypeDefinition.Setlists.Name, SetlistSongsPartialTypeDefinition.GetSetlistSongs.Name)
    },
    AddSetlistSongs: {
        Name: SetlistSongsPartialTypeDefinition.AddSetlistSongs.Name,
        GetEndpointUrl: () =>
            GetEndpointURL(EndpointPartialTypeDefinition.Setlists.Name, SetlistSongsPartialTypeDefinition.AddSetlistSongs.Name)
    },
    RemoveSetlistSongs: {
        Name: SetlistSongsPartialTypeDefinition.RemoveSetlistSongs.Name,
        GetEndpointUrl: () =>
            GetEndpointURL(EndpointPartialTypeDefinition.Setlists.Name, SetlistSongsPartialTypeDefinition.RemoveSetlistSongs.Name)
    }
};
