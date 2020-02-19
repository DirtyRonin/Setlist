import { ConfigurationItemCollection } from "./";

const WEB_API_URL = "http://localhost:5000/api";

export const defaultHeader = { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json; charset=utf-8" };

export const GetEndpointURL = (endpointName: string): string => `${WEB_API_URL}/${endpointName}`;

type EndpointFieldNames = "Songs" | "Bandsongs" | "Bands";

type EndpointDefinition = {
    Name: string;
    GetEndpointUrl?: () => string;
    FilterUrl: string;
};

const EndpointPartialTypeDefinition: ConfigurationItemCollection<EndpointDefinition, EndpointFieldNames> = {
    Songs: { Name: "Songs", FilterUrl: "Filter" },
    Bandsongs: { Name: "Bandsongs", FilterUrl: "Filter" },
    Bands: { Name: "Bands", FilterUrl: "Filter" }
};

export const EndpointConfiguration: ConfigurationItemCollection<EndpointDefinition, EndpointFieldNames> = {
    Songs: {
        Name: EndpointPartialTypeDefinition.Songs.Name,
        GetEndpointUrl: () => GetEndpointURL(EndpointPartialTypeDefinition.Songs.Name),
        FilterUrl: EndpointPartialTypeDefinition.Songs.FilterUrl
    },
    Bandsongs: {
        Name: EndpointPartialTypeDefinition.Bandsongs.Name,
        GetEndpointUrl: () => GetEndpointURL(EndpointPartialTypeDefinition.Bandsongs.Name),
        FilterUrl: EndpointPartialTypeDefinition.Bandsongs.FilterUrl
    },
    Bands: {
        Name: EndpointPartialTypeDefinition.Bands.Name,
        GetEndpointUrl: () => GetEndpointURL(EndpointPartialTypeDefinition.Bands.Name),
        FilterUrl: EndpointPartialTypeDefinition.Bands.FilterUrl
    }
};
