import { FormHtmlAttributesDefinition } from "Configuration";
import { ConfigurationItemCollection } from "Configuration/ConfigurationItemCollection";

// catalog
type SongCatalogComponentNames = "ShowAddSongCheckBox" | "Navbar" | "NodeList"

export const SongCatalogHtmlAttributesConfiguration: ConfigurationItemCollection<
    FormHtmlAttributesDefinition,
    SongCatalogComponentNames
> = {
    ShowAddSongCheckBox: { Label: "Add Songs", Placeholder: "", Data_TestId: "SongCatalog_ShowAddSong", ControlId: "SongCatalog_ShowAddSong" },
    Navbar: { Label: "", Placeholder: "", Data_TestId: "SongCatalog_Options_responsiveNavbar", ControlId: "SongCatalog_Options_responsiveNavbar" },
    NodeList: { Label: "", Placeholder: "", Data_TestId: "SongCatalog_NodeList", ControlId: "SongCatalog_NodeList" },
}


// filter
export type FilterSongComponentNames = "SearchQueryInput" | "SearchEvergreenCheckBox" | "SearchNinetiesCheckBox" ;

export type FilterSongHtmlAttributesConfigurationType = ConfigurationItemCollection<
    FormHtmlAttributesDefinition,
    FilterSongComponentNames
>

const filterSongName = "FilterSong"
export const FilterSongHtmlAttributesConfiguration: FilterSongHtmlAttributesConfigurationType = {
    SearchQueryInput: { Label: `SearchQuery`, Placeholder: `Search...`, Data_TestId: `${filterSongName}_SearchQuery`, ControlId: `${filterSongName}_SearchQuery` },
    SearchEvergreenCheckBox: { Label: `Evergreen`, Placeholder: ``, Data_TestId: `${filterSongName}_SearchEvergreen`, ControlId: `${filterSongName}_SearchEvergreen` },
    SearchNinetiesCheckBox: { Label: `90er`, Placeholder: ``, Data_TestId: `${filterSongName}_SearchNineties`, ControlId: `${filterSongName}_SearchNineties` },
}


// modal
export type SongModalNodeHtmlComponentNames = "Title" | "Artist" | "Genre" | "Nineties" | "Evergreen" | "OriginalKey" | "Comment";

export type SongModalHtmlAttributesConfigurationType = Record<
    SongModalNodeHtmlComponentNames,
    FormHtmlAttributesDefinition
>
export const SongModalHtmlAttributesConfiguration: SongModalHtmlAttributesConfigurationType = {
    Title: { Label: "Title", Placeholder: "Enter Title", Data_TestId: "SongModal_Title", ControlId: "SongModal_Title" },
    Artist: { Label: "Artist", Placeholder: "Enter Artist", Data_TestId: "SongModal_Artist", ControlId: "SongModal_Artist" },
    Genre: { Label: "Genre", Placeholder: "Enter Genre", Data_TestId: "SongModal_Genre", ControlId: "SongModal_Genre" },
    Nineties: { Label: "Nineties", Placeholder: "Enter Nineties", Data_TestId: "SongModal_Nineties", ControlId: "SongModal_Nineties" },
    Evergreen: { Label: "Evergreen", Placeholder: "Enter Evergreen", Data_TestId: "SongModal_Evergreen", ControlId: "SongModal_Evergreen" },
    OriginalKey: { Label: "OriginalKey", Placeholder: "Enter OriginalKey", Data_TestId: "SongModal_OriginalKey", ControlId: "SongModal_OriginalKey" },
    Comment: { Label: "Comment", Placeholder: "Enter Comment", Data_TestId: "SongModal_Comment", ControlId: "SongModal_Comment" },
};