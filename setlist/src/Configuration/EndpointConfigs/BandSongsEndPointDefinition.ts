import { ConfigurationItemCollection } from "../ConfigurationItemCollection";
import { GetEndpointURL, EndpointPartialTypeDefinition, EndPointDefinition, NameDefinition } from "./EndPointConfig";

type BandsongsActionNames = "GetBandsongs" | "AddBandsongs" | "RemoveBandsongs";

export type BandSongsEndPointDefinition = EndPointDefinition & {
    ActionEndpoints: ConfigurationItemCollection<EndPointDefinition, BandsongsActionNames>;
};

const BandsongsPartialTypeDefinition: ConfigurationItemCollection<NameDefinition, BandsongsActionNames> = {
    GetBandsongs: { Name: "GetBandsongs" },
    AddBandsongs: { Name: "AddBandsongs" },
    RemoveBandsongs: { Name: "RemoveBandsongs" }
};

export const BandSongsConfiguration: ConfigurationItemCollection<EndPointDefinition, BandsongsActionNames> = {
    GetBandsongs: {
        Name: BandsongsPartialTypeDefinition.GetBandsongs.Name,
        GetEndpointUrl: () => GetEndpointURL(EndpointPartialTypeDefinition.Bandsongs.Name, BandsongsPartialTypeDefinition.GetBandsongs.Name)
    },
    AddBandsongs: {
        Name: BandsongsPartialTypeDefinition.AddBandsongs.Name,
        GetEndpointUrl: () => GetEndpointURL(EndpointPartialTypeDefinition.Bandsongs.Name, BandsongsPartialTypeDefinition.AddBandsongs.Name)
    },
    RemoveBandsongs: {
        Name: BandsongsPartialTypeDefinition.RemoveBandsongs.Name,
        GetEndpointUrl: () =>
            GetEndpointURL(EndpointPartialTypeDefinition.Bandsongs.Name, BandsongsPartialTypeDefinition.RemoveBandsongs.Name)
    }
};

