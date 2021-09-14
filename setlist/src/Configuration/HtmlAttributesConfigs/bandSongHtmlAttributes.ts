import { FormHtmlAttributesDefinition } from "Configuration";
import { ConfigurationItemCollection } from "Configuration/ConfigurationItemCollection";
import { FilterSongComponentNames, SongModalNodeHtmlComponentNames } from "./songHtmlAttributes";

//catalog
type BandSongCatalogComponentNames = "ShowAddBandSongCheckBox" | "Navbar" | "NodeList"

export const BandSongCatalogHtmlAttributesConfiguration: ConfigurationItemCollection<
    FormHtmlAttributesDefinition,
    BandSongCatalogComponentNames
> = {
    ShowAddBandSongCheckBox: { Label: "Add BandSong", Placeholder: "", Data_TestId: "BandSongCatalog_ShowAddBandSong", ControlId: "BandSongCatalog_ShowAddBandSong" },
    Navbar: { Label: "", Placeholder: "", Data_TestId: "BandSongCatalog_Options_responsiveNavbar", ControlId: "BandSongCatalog_Options_responsiveNavbar" },
    NodeList: { Label: "", Placeholder: "", Data_TestId: "BandSongCatalog_NodeList", ControlId: "BandSongCatalog_NodeList" },
}

//modal
type BandSongModalNodeHtmlComponentNames = SongModalNodeHtmlComponentNames | 'Popularity'

export type BandSongModalHtmlAttributesConfigurationType = Record<
    BandSongModalNodeHtmlComponentNames,
    FormHtmlAttributesDefinition
>
export const BandSongModalHtmlAttributesConfiguration: BandSongModalHtmlAttributesConfigurationType = {
    Title: { Label: "Title", Placeholder: "Enter Title", Data_TestId: "BandSongModal_Title", ControlId: "BandSongModal_Title" },
    Artist: { Label: "Artist", Placeholder: "Enter Artist", Data_TestId: "BandSongModal_Artist", ControlId: "BandSongModal_Artist" },
    Genre: { Label: "Genre", Placeholder: "Enter Genre", Data_TestId: "BandSongModal_Genre", ControlId: "BandSongModal_Genre" },
    Nineties: { Label: "Nineties", Placeholder: "Enter Nineties", Data_TestId: "BandSongModal_Nineties", ControlId: "BandSongModal_Nineties" },
    Evergreen: { Label: "Evergreen", Placeholder: "Enter Evergreen", Data_TestId: "BandSongModal_Evergreen", ControlId: "BandSongModal_Evergreen" },
    OriginalKey: { Label: "OriginalKey", Placeholder: "Enter OriginalKey", Data_TestId: "BandSongModal_OriginalKey", ControlId: "BandSongModal_OriginalKey" },
    Comment: { Label: "Comment", Placeholder: "Enter Comment", Data_TestId: "BandSongModal_Comment", ControlId: "BandSongModal_Comment" },
    Popularity: { Label: "Popularity", Placeholder: "Enter Popularity", Data_TestId: "BandSongModal_Popularity", ControlId: "BandSongModal_Popularity" },
};


//filter
type FilterBandSongComponentNames = "SearchQueryInput";
export type FilterBandSongHtmlAttributesConfigurationType = ConfigurationItemCollection<
    FormHtmlAttributesDefinition,
    FilterBandSongComponentNames
>

const filterBandSongName = "FilterBandSong"
export const FilterBandSongHtmlAttributesConfiguration: FilterBandSongHtmlAttributesConfigurationType = {
    SearchQueryInput: { Label: `Search Query`, Placeholder: `Search...`, Data_TestId: `${filterBandSongName}_SearchQuery`, ControlId: `${filterBandSongName}_SearchQuery` },

}