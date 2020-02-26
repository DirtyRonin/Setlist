import { ConfigurationItemCollection } from "../ConfigurationItemCollection";
import { BandSongsConfiguration, BandSongsEndPointDefinition } from "./BandSongsEndPointDefinition";
import { SetlistSongsConfiguration, SetlistSongsEndPointDefinition } from "./SetlistSongsEndPointDefinition";
import { SetlistConfiguration, SetlistEndPointDefinition } from "./SetlistsEndPointDefinition";

const WEB_API_URL = "http://localhost:5000/api";

export const defaultHeader = { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json; charset=utf-8" };

export const GetEndpointURL = (endpointName: string, actionName?: string): string =>
    actionName ? `${WEB_API_URL}/${endpointName}/${actionName}` : `${WEB_API_URL}/${endpointName}`;

export type NameDefinition = {
    Name: string;
};

type EndpointFieldNames = "Songs" | "Bandsongs" | "Bands" | "Setlists" ;

export const EndpointPartialTypeDefinition: ConfigurationItemCollection<NameDefinition, EndpointFieldNames> = {
    Songs: { Name: "Songs" },
    Bandsongs: { Name: "Bandsongs" },
    Bands: { Name: "Bands" },
    Setlists: { Name: "Setlists" }
};

export type EndPointDefinition = NameDefinition & {
    GetEndpointUrl: () => string;
};

export const EndpointConfiguration: ConfigurationItemCollection<
    EndPointDefinition | BandSongsEndPointDefinition | SetlistSongsEndPointDefinition | SetlistEndPointDefinition,
    EndpointFieldNames
> = {
    Songs: {
        Name: EndpointPartialTypeDefinition.Songs.Name,
        GetEndpointUrl: () => GetEndpointURL(EndpointPartialTypeDefinition.Songs.Name)
    } as EndPointDefinition,
    Bandsongs: {
        Name: EndpointPartialTypeDefinition.Bandsongs.Name,
        GetEndpointUrl: () => GetEndpointURL(EndpointPartialTypeDefinition.Bandsongs.Name),
        ActionEndpoints: BandSongsConfiguration
    } as BandSongsEndPointDefinition,
    Bands: {
        Name: EndpointPartialTypeDefinition.Bands.Name,
        GetEndpointUrl: () => GetEndpointURL(EndpointPartialTypeDefinition.Bands.Name)
    } as EndPointDefinition,
    Setlists: {
        Name: EndpointPartialTypeDefinition.Setlists.Name,
        GetEndpointUrl: () => GetEndpointURL(EndpointPartialTypeDefinition.Setlists.Name),
        ActionEndpoints: SetlistConfiguration
    } as SetlistEndPointDefinition
};
