import { IBandSongCatalog } from "../../models";
import { FilterBandSongActionProps, BandSongCatalog } from "../../mapping";

export const newBandSongCatalog = (catalogId : string): IBandSongCatalog => {

    const defaultActionProps = FilterBandSongActionProps.Default(catalogId)

    

    return BandSongCatalog.CreateAndUpdate(catalogId,defaultActionProps.filter, { NextLink: "", Count: 0, Context: "" }, {});
}