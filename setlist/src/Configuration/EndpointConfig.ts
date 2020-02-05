import { ConfigurationItemCollection } from "./";

const WEB_API_URL = "http://localhost:5000/api";

export const ACCESS_CONTROL_ALLOW_ORIGIN_HEADER = { "Access-Control-Allow-Origin": "*" };

export const GetEndpointURL = (endpointName: string): string => `${WEB_API_URL}/${endpointName}`;

type EndpointFieldNames = "Songs" | "Setlists" | "Bands";

type EndpointDefinition = {
    Name: string;
    GetEndpointUrl?: () => string;
};

const EndpointPartialTypeDefinition: ConfigurationItemCollection<EndpointDefinition, EndpointFieldNames> = {
    Songs: { Name: "Songs" },
    Setlists: { Name: "Setlists" },
    Bands: { Name: "Bands" }
};

export const EndpointConfiguration: ConfigurationItemCollection<EndpointDefinition, EndpointFieldNames> = {
    Songs: {
        Name: EndpointPartialTypeDefinition.Songs.Name,
        GetEndpointUrl: () => GetEndpointURL(EndpointPartialTypeDefinition.Songs.Name)
    },
    Setlists: {
        Name: EndpointPartialTypeDefinition.Setlists.Name,
        GetEndpointUrl: () => GetEndpointURL(EndpointPartialTypeDefinition.Setlists.Name)
    },
    Bands: {
        Name: EndpointPartialTypeDefinition.Bands.Name,
        GetEndpointUrl: () => GetEndpointURL(EndpointPartialTypeDefinition.Bands.Name)
    }
};


