import { IEntityActionProps } from ".."

export interface ICatalog<TValue, SFilter, ROptions> {
    CatalogType: CatalogTypes;
    Filter: SFilter
    Id: string;
    Title: string;
    Refresh: boolean;
    Values: Map<string, TValue>;
    OData: ODataProps;
    CatalogOptions: ROptions;
    // NodeType: NodeTypes;
}

export interface ODataProps {
    Context: string
    Count: number
    NextLink: string
}

export interface IContainerProps {
    catalogId: string
    addToCatalog?: any
    executeNodeAction?: (props: IEntityActionProps) => void
}

export type CatalogTypes = "Song Catalog" | "Band Catalog" | "BandSong Catalog" | "Setlist Catalog" | "SetlistSong Catalog" | "Location Catalog" | "CustomEvent Catalog" | "None"
export const CatalogTypes: Record<CatalogTypes, CatalogTypes> = {
    "Song Catalog": "Song Catalog",
    "Band Catalog": "Band Catalog",
    "BandSong Catalog": "BandSong Catalog",
    "Setlist Catalog": "Setlist Catalog",
    "SetlistSong Catalog": "SetlistSong Catalog",
    "Location Catalog":"Location Catalog",
    "CustomEvent Catalog" : "CustomEvent Catalog",
    "None": "None"
} as const


// export type NodeTypes = 'Edit' | 'Add' | 'Initial'
// export const NodeTypes: Record<NodeTypes, NodeTypes> = {
//     Edit: 'Edit',
//     Add: 'Add',
//     Initial: 'Initial'
// } as const


