import { FormHtmlAttributesDefinition } from "Configuration"
import { ConfigurationItemCollection } from "Configuration/ConfigurationItemCollection"
import { FilterSongComponentNames, SongModalNodeHtmlComponentNames } from "./songHtmlAttributes";


// catalog
type SetlistSongCatalogComponentNames = "ShowAddSetlistSongCheckBox" | "Navbar" | "NodeList"

export const SetlistSongCatalogHtmlAttributesConfiguration: ConfigurationItemCollection<
    FormHtmlAttributesDefinition,
    SetlistSongCatalogComponentNames
> = {
    ShowAddSetlistSongCheckBox: { Label: "Add SetlistSong", Placeholder: "", Data_TestId: "SetlistSongCatalog_ShowAddSetlistSong", ControlId: "SetlistSongCatalog_ShowAddSetlistSong" },
    Navbar: { Label: "", Placeholder: "", Data_TestId: "SetlistSongCatalog_Options_responsiveNavbar", ControlId: "SetlistSongCatalog_Options_responsiveNavbar" },
    NodeList: { Label: "", Placeholder: "", Data_TestId: "SetlistSongCatalog_NodeList", ControlId: "SetlistSongCatalog_NodeList" },
}


// modal
type SetlistSongModalNodeHtmlComponentNames = SongModalNodeHtmlComponentNames

const modalName = "BandSongModal"

export type SetlistSongModalHtmlAttributesConfigurationType = Record<
SetlistSongModalNodeHtmlComponentNames,
    FormHtmlAttributesDefinition
>
export const SetlistSongModalHtmlAttributesConfiguration: SetlistSongModalHtmlAttributesConfigurationType = {
    Title: { Label: `Title`, Placeholder: `Enter Title`, Data_TestId: `${modalName}_Title`, ControlId: `${modalName}_Title` },
    Artist: { Label: `Artist`, Placeholder: `Enter Artist`, Data_TestId: `${modalName}_Artist`, ControlId: `${modalName}_Artist` },
    Genre: { Label: `Genre`, Placeholder: `Enter Genre`, Data_TestId: `${modalName}_Genre`, ControlId: `${modalName}_Genre` },
    Nineties: { Label: `Nineties`, Placeholder: `Enter Nineties`, Data_TestId: `${modalName}_Nineties`, ControlId: `${modalName}_Nineties` },
    Evergreen: { Label: `Evergreen`, Placeholder: `Enter Evergreen`, Data_TestId: `${modalName}_Evergreen`, ControlId: `${modalName}_Evergreen` },
    OriginalKey: { Label: `OriginalKey`, Placeholder: `Enter OriginalKey`, Data_TestId: `${modalName}_OriginalKey`, ControlId: `${modalName}_OriginalKey` },
    Comment: { Label: `Comment`, Placeholder: `Enter Comment`, Data_TestId: `${modalName}_Comment`, ControlId: `${modalName}_Comment` },
};


// filter
type SetlistSongComponentNames = FilterSongComponentNames;

export type FilterSetlistSongHtmlAttributesConfigurationType= ConfigurationItemCollection<
    FormHtmlAttributesDefinition,
    SetlistSongComponentNames
> 
const filterSetlistSongName = "FilterSetlistSong"

export const FilterSetlistSongHtmlAttributesConfiguration: FilterSetlistSongHtmlAttributesConfigurationType= {
    SearchTitleInput: { Label: `Search For Title`, Placeholder: `Enter Title`, Data_TestId: `${filterSetlistSongName}_SearchTitle`, ControlId: `${filterSetlistSongName}_SearchTitle` },
    SearchArtistInput: { Label: `Search For Artist`, Placeholder: `Enter Artist`, Data_TestId: `${filterSetlistSongName}_SearchArtist`, ControlId: `${filterSetlistSongName}_SearchArtist` },
    SearchGenreInput: { Label: `Search For Genre`, Placeholder: `Enter Genre`, Data_TestId: `${filterSetlistSongName}_SearchGenre`, ControlId: `${filterSetlistSongName}_SearchGenre` },
    SearchEvergreenCheckBox: { Label: `Evergreen`, Placeholder: ``, Data_TestId: `${filterSetlistSongName}_SearchEvergreen`, ControlId: `${filterSetlistSongName}_SearchEvergreen` },
    SearchNinetiesCheckBox: { Label: `90er`, Placeholder: ``, Data_TestId: `${filterSetlistSongName}_SearchNineties`, ControlId: `${filterSetlistSongName}_SearchNineties` },
    SearchButton: { Label: `Search`, Placeholder: ``, Data_TestId: `${filterSetlistSongName}_SearchButton`, ControlId: `${filterSetlistSongName}_SearchButton` },
}