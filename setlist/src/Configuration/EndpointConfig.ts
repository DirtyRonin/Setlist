import { ConfigurationItemCollection } from "./";

const WEB_API_URL = "http://localhost:5000/api";

export const defaultHeader = { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json; charset=utf-8" };

export const GetEndpointURL = (endpointName: string, actionName?: string): string =>
    actionName ? `${WEB_API_URL}/${endpointName}/${actionName}` : `${WEB_API_URL}/${endpointName}`;

type EndpointFieldNames = "Songs" | "Bandsongs" | "Bands";
type BandsongsActionNames = "GetBandsongs" | "AddBandsongs" | "RemoveBandsongs";

type NameDefinition = {
    Name: string;
};

type EndPointDefinition = NameDefinition & {
    GetEndpointUrl: () => string;
}

export type BandSongsEndPointDefinition = EndPointDefinition & {
    ActionEndpoints: ConfigurationItemCollection<EndPointDefinition, BandsongsActionNames>;
}

const EndpointPartialTypeDefinition: ConfigurationItemCollection<NameDefinition, EndpointFieldNames> = {
    Songs: { Name: "Songs" },
    Bandsongs: { Name: "Bandsongs" },
    Bands: { Name: "Bands" }
};

const BandsongsPartialTypeDefinition: ConfigurationItemCollection<NameDefinition, BandsongsActionNames> = {
    GetBandsongs: { Name: "GetBandsongs" },
    AddBandsongs: { Name: "AddBandsongs" },
    RemoveBandsongs: { Name: "RemoveBandsongs" }
};

const BandSongsConfiguration: ConfigurationItemCollection<EndPointDefinition, BandsongsActionNames> = {
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

export const EndpointConfiguration: ConfigurationItemCollection<EndPointDefinition | BandSongsEndPointDefinition , EndpointFieldNames> = {
    Songs: {
        Name: EndpointPartialTypeDefinition.Songs.Name,
        GetEndpointUrl: () => GetEndpointURL(EndpointPartialTypeDefinition.Songs.Name)
    },
    Bandsongs: {
        Name: EndpointPartialTypeDefinition.Bandsongs.Name,
        GetEndpointUrl: () => GetEndpointURL(EndpointPartialTypeDefinition.Bandsongs.Name),
        ActionEndpoints: BandSongsConfiguration
    },
    Bands: {
        Name: EndpointPartialTypeDefinition.Bands.Name,
        GetEndpointUrl: () => GetEndpointURL(EndpointPartialTypeDefinition.Bands.Name)
    }
};
