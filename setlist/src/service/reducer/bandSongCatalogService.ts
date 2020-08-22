import { Catalog, IStatusBandSongCatalogActionProps } from "../../models";
import { FilterBandSongActionProps, BandSongCatalog } from "../../mapping";
import { ICatalogState } from "../../store";
import { HashTable } from "../../Util";

export const createEmptyBandSongCatalog = (props: IStatusBandSongCatalogActionProps, catalogState: ICatalogState): ICatalogState => {

    const { parentId } = props;
    const { catalogs, catalogsOrder, modal } = catalogState

    const defaultActionProps = FilterBandSongActionProps.Default(parentId)

    var bandSongCatalog = BandSongCatalog.CreateAndUpdate(parentId, defaultActionProps.filter, { NextLink: "", Count: 0, Context: "" }, {});

    var parentName = catalogs['Band Catalog_id'].Values.get(parentId)?.Title
    
    //get bandSong Title only until it will be delievered by fetch
    if(parentName != undefined){
        bandSongCatalog.Title = parentName;
    }
    

    const newCatalogs: HashTable<Catalog> = { ...catalogs, [bandSongCatalog.Id]: bandSongCatalog };

    const newCatalogsOrder: Array<string> = [...catalogsOrder, bandSongCatalog.Id]

    return { catalogs: newCatalogs, catalogsOrder: newCatalogsOrder, modal } as ICatalogState
}

export const closeBandSongCatalog = (props: IStatusBandSongCatalogActionProps, catalogState: ICatalogState): ICatalogState => {
    
    const { parentId } = props;
    const { catalogs, catalogsOrder, modal } = catalogState

    const bandSongCatalogId = BandSongCatalog.GetCatalogId(parentId);

    const newCatalogs: HashTable<Catalog> = { ...catalogs };
    delete newCatalogs[bandSongCatalogId];

    const newCatalogsOrder: Array<string> = catalogsOrder.filter( order => order != bandSongCatalogId )

    return { catalogs: newCatalogs, catalogsOrder: newCatalogsOrder, modal } as ICatalogState
}