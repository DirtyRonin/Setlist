export type NameDefinition = {
    Name: string;
};

export type EndPointDefinition = NameDefinition & {
    GetEndpointUrl: () => string;
};