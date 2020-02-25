import { ConfigurationItemCollection } from "../ConfigurationItemCollection";
import { NameDefinition, EndPointDefinition } from "./FieldsDefinition";
import { BandSongsConfiguration, BandSongsEndPointDefinition } from "./BandSongsEndPointDefinition";
import { SetlistSongsConfiguration, SetlistSongsEndPointDefinition } from "./SetlistSongsEndPointDefinition";

const WEB_API_URL = "http://localhost:5000/api";

export const defaultHeader = { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json; charset=utf-8" };

export const GetEndpointURL = (endpointName: string, actionName?: string): string =>
    actionName ? `${WEB_API_URL}/${endpointName}/${actionName}` : `${WEB_API_URL}/${endpointName}`;

type EndpointFieldNames = "Songs" | "Bandsongs" | "Bands" | "Setlists";

export const EndpointPartialTypeDefinition: ConfigurationItemCollection<NameDefinition, EndpointFieldNames> = {
    Songs: { Name: "Songs" },
    Bandsongs: { Name: "Bandsongs" },
    Bands: { Name: "Bands" },
    Setlists: { Name: "Setlists" }
};

export const EndpointConfiguration: ConfigurationItemCollection<
    EndPointDefinition | BandSongsEndPointDefinition | SetlistSongsEndPointDefinition,
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
        ActionEndpoints: SetlistSongsConfiguration
    } as SetlistSongsEndPointDefinition
};
