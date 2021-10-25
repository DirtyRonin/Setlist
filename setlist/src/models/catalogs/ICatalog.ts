import { IEntityActionProps } from ".."

export interface ICatalog<TValue, SFilter, ROptions> {
    CatalogType: CatalogTypes;
    Filter: SFilter
    Id: string;
    Title: string;
    Refresh: boolean;
    Values: TValue[];
    Meta: MetaProps;
    CatalogOptions: ROptions;
    // NodeType: NodeTypes;
}

export interface MetaProps {
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


