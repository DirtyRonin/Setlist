import { ConfigurationItemCollection } from "../ConfigurationItemCollection";
import { BandSongsConfiguration, BandSongsEndPointDefinition } from "./BandSongsEndPointDefinition";
import { SetSongsConfiguration, SetSongsEndPointDefinition } from "./SetSongsEndPointDefinition";
import { SetConfiguration, SetEndPointDefinition } from "./SetEndPointDefinition";

const WEB_API_URL = "https://localhost:5001/api";

export const defaultHeader = { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json; charset=utf-8" };
export const OdataPostHeader = { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json; odata.metadata=minimal ; charset=utf-8" };

export const GetEndpointURL = (endpointName: string, actionName?: string): string =>
    actionName ? `${WEB_API_URL}/${endpointName}/${actionName}` : `${WEB_API_URL}/${endpointName}`;

export type NameDefinition = {
    Name: string;
};

type EndpointFieldNames = "Songs" | "Bandsongs" | "Bands" | "Sets" | "SetSongs" ;

export const EndpointPartialTypeDefinition: ConfigurationItemCollection<NameDefinition, EndpointFieldNames> = {
    Songs: { Name: "Songs" },
    Bandsongs: { Name: "Bandsongs" },
    Bands: { Name: "Bands" },
    Sets: { Name: "Sets" },
    SetSongs: { Name: "SetSongs" }
};

export type EndPointDefinition = NameDefinition & {
    GetEndpointUrl: () => string;
};

export const EndpointConfiguration: ConfigurationItemCollection<
    EndPointDefinition | BandSongsEndPointDefinition | SetSongsEndPointDefinition | SetEndPointDefinition,
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
    Sets: {
        Name: EndpointPartialTypeDefinition.Sets.Name,
        GetEndpointUrl: () => GetEndpointURL(EndpointPartialTypeDefinition.Sets.Name),
        ActionEndpoints: SetConfiguration
    } as SetEndPointDefinition,
    SetSongs:{
        Name: EndpointPartialTypeDefinition.SetSongs.Name,
        GetEndpointUrl: () => GetEndpointURL(EndpointPartialTypeDefinition.SetSongs.Name),
        ActionEndpoints: SetSongsConfiguration
    }as SetSongsEndPointDefinition

};