import { ConfigurationItemCollection } from "../ConfigurationItemCollection";
import { GetEndpointURL, EndpointPartialTypeDefinition, EndPointDefinition, NameDefinition } from "./EndPointConfig";

type SetSongsActionNames = "GetSetSongs" | "AddSetSong" | "RemoveSetSong";

export type SetSongsEndPointDefinition = EndPointDefinition & {
    ActionEndpoints: ConfigurationItemCollection<EndPointDefinition, SetSongsActionNames>;
};

const SetSongsPartialTypeDefinition: ConfigurationItemCollection<NameDefinition, SetSongsActionNames> = {
    GetSetSongs: { Name: "GetSetSongs" },
    AddSetSong: { Name: "AddSetSong" },
    RemoveSetSong: { Name: "RemoveSetSong" }
};

export const SetSongsConfiguration: ConfigurationItemCollection<EndPointDefinition, SetSongsActionNames> = {
    GetSetSongs: {
        Name: SetSongsPartialTypeDefinition.GetSetSongs.Name,
        GetEndpointUrl: () =>
            GetEndpointURL(EndpointPartialTypeDefinition.SetSongs.Name, SetSongsPartialTypeDefinition.GetSetSongs.Name)
    },
    AddSetSong: {
        Name: SetSongsPartialTypeDefinition.AddSetSong.Name,
        GetEndpointUrl: () =>
            GetEndpointURL(EndpointPartialTypeDefinition.SetSongs.Name, SetSongsPartialTypeDefinition.AddSetSong.Name)
    },
    RemoveSetSong: {
        Name: SetSongsPartialTypeDefinition.RemoveSetSong.Name,
        GetEndpointUrl: () =>
            GetEndpointURL(EndpointPartialTypeDefinition.SetSongs.Name, SetSongsPartialTypeDefinition.RemoveSetSong.Name)
    }
};
