type ConfigurationItemCollection<T, N extends string> = {
    [P in N]: T;
};

// Web Api
const WEB_API_URL = "http://localhost:5000/api";

export const ACCESS_CONTROL_ALLOW_ORIGIN_HEADER = { "Access-Control-Allow-Origin": "*" };

type EndpointFieldNames = "Songs" | "Setlists" | "Bands";

type EndpointDefinition = {
    Name: string;
    GetEndpointUrl?: () => string;
};

export const GetEndpointURL = (endpointName: string): string => `${WEB_API_URL}/${endpointName}`;

type SongFieldNames = "Id" | "Title" | "Artist" | "Mode";

type FieldDefinition = {
    label: string;
    Title: string;
    Placeholder: string;
    Data_TestId: string;
};

const EndpointPartialTypeDefinition: ConfigurationItemCollection<EndpointDefinition, EndpointFieldNames> = {
    Songs: { Name: "Songs" },
    Setlists: { Name: "Setlists" },
    Bands: { Name: "Bands" }
};

const EndpointTypeDefinition: ConfigurationItemCollection<EndpointDefinition, EndpointFieldNames> = {
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

const SongTypeDefinition: ConfigurationItemCollection<FieldDefinition, SongFieldNames> = {
    Id: { label: "id", Title: "id", Placeholder: "",Data_TestId:"" },
    Title: { label: "Title", Title: "title", Placeholder: "Enter Title",Data_TestId:"SongNode_Title"  },
    Artist: { label: "Artist", Title: "artist", Placeholder: "Enter Artist",Data_TestId:"SongNode_Artist" },
    Mode: { label: "Mode", Title: "mode", Placeholder: "Enter Mode",Data_TestId:"SongNode_Mode" }
};

export default { SongTypeDefinition, EndpointTypeDefinition };
