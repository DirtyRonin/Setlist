import { ConfigurationItemCollection } from "../ConfigurationItemCollection";
import { GetEndpointURL, EndpointPartialTypeDefinition, EndPointDefinition, NameDefinition } from "./EndPointConfig";

type SetActionNames = "AddSet" | "GetSet" | "GetSetsByBandId";

export type SetEndPointDefinition = EndPointDefinition & {
    ActionEndpoints: ConfigurationItemCollection<EndPointDefinition, SetActionNames>;
};

const SetPartialTypeDefinition: ConfigurationItemCollection<NameDefinition, SetActionNames> = {
    GetSet: { Name: "GetSet" },
    AddSet: { Name: "AddSet" },
    GetSetsByBandId: { Name: "GetSetsByBandId" },

};

export const SetConfiguration: ConfigurationItemCollection<EndPointDefinition, SetActionNames> = {
    GetSet: {
        Name: SetPartialTypeDefinition.GetSet.Name,
        GetEndpointUrl: () =>
            GetEndpointURL(EndpointPartialTypeDefinition.Sets.Name, SetPartialTypeDefinition.GetSet.Name)
    },
    AddSet: {
        Name: SetPartialTypeDefinition.AddSet.Name,
        GetEndpointUrl: () =>
            GetEndpointURL(EndpointPartialTypeDefinition.Sets.Name, SetPartialTypeDefinition.AddSet.Name)
    },
    GetSetsByBandId: {
        Name: SetPartialTypeDefinition.GetSetsByBandId.Name,
        GetEndpointUrl: () =>
            GetEndpointURL(EndpointPartialTypeDefinition.Sets.Name, SetPartialTypeDefinition.GetSetsByBandId.Name)
    }
};
