import { ConfigurationItemCollection } from "../ConfigurationItemCollection";
import { GetEndpointURL, EndpointPartialTypeDefinition, EndPointDefinition, NameDefinition } from "./EndPointConfig";

type SetlistActionNames = "AddSetlistToBand" | "GetSetlist" | "GetAllSetlistsFromBand";

export type SetlistEndPointDefinition = EndPointDefinition & {
    ActionEndpoints: ConfigurationItemCollection<EndPointDefinition, SetlistActionNames>;
};

const SetlistPartialTypeDefinition: ConfigurationItemCollection<NameDefinition, SetlistActionNames> = {
    GetSetlist: { Name: "GetSetlist" },
    AddSetlistToBand: { Name: "AddSetlistToBand" },
    GetAllSetlistsFromBand: { Name: "GetAllSetlistsFromBand" },

};

export const SetlistConfiguration: ConfigurationItemCollection<EndPointDefinition, SetlistActionNames> = {
    GetSetlist: {
        Name: SetlistPartialTypeDefinition.GetSetlist.Name,
        GetEndpointUrl: () =>
            GetEndpointURL(EndpointPartialTypeDefinition.Setlists.Name, SetlistPartialTypeDefinition.GetSetlist.Name)
    },
    AddSetlistToBand: {
        Name: SetlistPartialTypeDefinition.AddSetlistToBand.Name,
        GetEndpointUrl: () =>
            GetEndpointURL(EndpointPartialTypeDefinition.Setlists.Name, SetlistPartialTypeDefinition.AddSetlistToBand.Name)
    },
    GetAllSetlistsFromBand: {
        Name: SetlistPartialTypeDefinition.GetAllSetlistsFromBand.Name,
        GetEndpointUrl: () =>
            GetEndpointURL(EndpointPartialTypeDefinition.Setlists.Name, SetlistPartialTypeDefinition.GetAllSetlistsFromBand.Name)
    }
};
