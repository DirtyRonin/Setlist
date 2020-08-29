import { ConfigurationItemCollection } from "./ConfigurationItemCollection";

type FormHtmlAttributesDefinition = {
    Label: string;
    Data_TestId: string;
    Placeholder: string;
    ControlId: string;
};

type SongModalNodeHtmlComponentNames = "Title" | "Artist" | "Genre" | "Nineties" | "Evergreen" | "OriginalKey" | "Comment";

export const SongModalHtmlAttributesConfiguration: Record<
    SongModalNodeHtmlComponentNames,
    FormHtmlAttributesDefinition
> = {
    Title: { Label: "Title", Placeholder: "Enter Title", Data_TestId: "SongModal_Title", ControlId: "SongModal_Title" },
    Artist: { Label: "Artist", Placeholder: "Enter Artist", Data_TestId: "SongModal_Artist", ControlId: "SongModal_Artist" },
    Genre: { Label: "Genre", Placeholder: "Enter Genre", Data_TestId: "SongModal_Genre", ControlId: "SongModal_Genre" },
    Nineties: { Label: "Nineties", Placeholder: "Enter Nineties", Data_TestId: "SongModal_Nineties", ControlId: "SongModal_Nineties" },
    Evergreen: { Label: "Evergreen", Placeholder: "Enter Evergreen", Data_TestId: "SongModal_Evergreen", ControlId: "SongModal_Evergreen" },
    OriginalKey: { Label: "OriginalKey", Placeholder: "Enter OriginalKey", Data_TestId: "SongModal_OriginalKey", ControlId: "SongModal_OriginalKey" },
    Comment: { Label: "Comment", Placeholder: "Enter Comment", Data_TestId: "SongModal_Comment", ControlId: "SongModal_Comment" },

};

type BandModalNodeHtmlComponentNames = "Title";

export const BandModalHtmlAttributesConfiguration: Record<
    BandModalNodeHtmlComponentNames,
    FormHtmlAttributesDefinition
> = {
    Title: { Label: "Title", Placeholder: "Enter Title", Data_TestId: "BandModal_Title", ControlId: "BandModal_Title" }
};

type FilterSongComponentNames = "SearchTitleInput" | "SearchArtistInput" | "SearchGenreInput" | "SearchEvergreenCheckBox" | "SearchNinetiesCheckBox" | "SearchButton";

export type FilterSongHtmlAttributesConfigurationType = ConfigurationItemCollection<
    FormHtmlAttributesDefinition,
    FilterSongComponentNames
>

const filterSongName= "FilterSong"
export const FilterSongHtmlAttributesConfiguration: FilterSongHtmlAttributesConfigurationType = {
    SearchTitleInput: { Label: `Search For Title`, Placeholder: `Enter Title`, Data_TestId: `${filterSongName}_SearchTitle`, ControlId: `${filterSongName}_SearchTitle` },
    SearchArtistInput: { Label: `Search For Artist`, Placeholder: `Enter Artist`, Data_TestId: `${filterSongName}_SearchArtist`, ControlId: `${filterSongName}_SearchArtist` },
    SearchGenreInput: { Label: `Search For Genre`, Placeholder: `Enter Genre`, Data_TestId: `${filterSongName}_SearchGenre`, ControlId: `${filterSongName}_SearchGenre` },
    SearchEvergreenCheckBox: { Label: `Evergreen`, Placeholder: ``, Data_TestId: `${filterSongName}_SearchEvergreen`, ControlId: `${filterSongName}_SearchEvergreen` },
    SearchNinetiesCheckBox: { Label: `90er`, Placeholder: ``, Data_TestId: `${filterSongName}_SearchNineties`, ControlId: `${filterSongName}_SearchNineties` },
    SearchButton: { Label: `Search`, Placeholder: ``, Data_TestId: `${filterSongName}_SearchButton`, ControlId: `${filterSongName}_SearchButton` },
}

type FilterBandComponentNames = "SearchTitleInput";

export const FilterBandHtmlAttributesConfiguration: ConfigurationItemCollection<
    FormHtmlAttributesDefinition,
    FilterBandComponentNames
> = {
    SearchTitleInput: { Label: "Search For Title", Placeholder: "Enter Title", Data_TestId: "FilterBand_SearchTitle", ControlId: "FilterBand_SearchTitle" },
}

type FilterBandSongComponentNames = FilterSongComponentNames;
export type FilterBandSongHtmlAttributesConfigurationType = ConfigurationItemCollection<
FormHtmlAttributesDefinition,
FilterBandSongComponentNames
>

const filterBandSongName= "FilterBandSong"
export const FilterBandSongHtmlAttributesConfiguration:FilterBandSongHtmlAttributesConfigurationType  = {
    SearchTitleInput: { Label: `Search For Title`, Placeholder: `Enter Title`, Data_TestId: `${filterBandSongName}_SearchTitle`, ControlId: `${filterBandSongName}_SearchTitle` },
    SearchArtistInput: { Label: `Search For Artist`, Placeholder: `Enter Artist`, Data_TestId: `${filterBandSongName}_SearchArtist`, ControlId: `${filterBandSongName}_SearchArtist` },
    SearchGenreInput: { Label: `Search For Genre`, Placeholder: `Enter Genre`, Data_TestId: `${filterBandSongName}_SearchGenre`, ControlId: `${filterBandSongName}_SearchGenre` },
    SearchEvergreenCheckBox: { Label: `Evergreen`, Placeholder: ``, Data_TestId: `${filterBandSongName}_SearchEvergreen`, ControlId: `${filterBandSongName}_SearchEvergreen` },
    SearchNinetiesCheckBox: { Label: `90er`, Placeholder: ``, Data_TestId: `${filterBandSongName}_SearchNineties`, ControlId: `${filterBandSongName}_SearchNineties` },
    SearchButton: { Label: `Search`, Placeholder: ``, Data_TestId: `${filterBandSongName}_SearchButton`, ControlId: `${filterBandSongName}_SearchButton` },
}

type SongCatalogComponentNames = "ShowAddSongCheckBox" | "Navbar" | "NodeList"

export const SongCatalogHtmlAttributesConfiguration: ConfigurationItemCollection<
    FormHtmlAttributesDefinition,
    SongCatalogComponentNames
> = {
    ShowAddSongCheckBox: { Label: "Add Songs", Placeholder: "", Data_TestId: "SongCatalog_ShowAddSong", ControlId: "SongCatalog_ShowAddSong" },
    Navbar: { Label: "", Placeholder: "", Data_TestId: "SongCatalog_Options_responsiveNavbar", ControlId: "SongCatalog_Options_responsiveNavbar" },
    NodeList: { Label: "", Placeholder: "", Data_TestId: "SongCatalog_NodeList", ControlId: "SongCatalog_NodeList" },
}

type BandCatalogComponentNames = "ShowAddBandCheckBox" | "Navbar" | "NodeList"

export const BandCatalogHtmlAttributesConfiguration: ConfigurationItemCollection<
    FormHtmlAttributesDefinition,
    BandCatalogComponentNames
> = {
    ShowAddBandCheckBox: { Label: "Add Band", Placeholder: "", Data_TestId: "BandCatalog_ShowAddBand", ControlId: "BandCatalog_ShowAddBand" },
    Navbar: { Label: "", Placeholder: "", Data_TestId: "BandCatalog_Options_responsiveNavbar", ControlId: "BandCatalog_Options_responsiveNavbar" },
    NodeList: { Label: "", Placeholder: "", Data_TestId: "BandCatalog_NodeList", ControlId: "BandCatalog_NodeList" },
}

type BandCatalogNodeComponentNames = "ShowBandSongCatalogCheckBox"

export const BandCatalogNodeHtmlAttributesConfiguration: ConfigurationItemCollection<
    FormHtmlAttributesDefinition,
    BandCatalogNodeComponentNames
> = {
    ShowBandSongCatalogCheckBox: { Label: "Show Band Songs", Placeholder: "", Data_TestId: "BandCatalogNode_ShowBandSongCatalog", ControlId: "BandCatalogNode_ShowBandSongCatalog" },
}

type BandSongCatalogComponentNames = "ShowAddBandSongCheckBox" | "Navbar" | "NodeList"

export const BandSongCatalogHtmlAttributesConfiguration: ConfigurationItemCollection<
    FormHtmlAttributesDefinition,
    BandSongCatalogComponentNames
> = {
    ShowAddBandSongCheckBox: { Label: "Add BandSong", Placeholder: "", Data_TestId: "BandSongCatalog_ShowAddBandSong", ControlId: "BandSongCatalog_ShowAddBandSong" },
    Navbar: { Label: "", Placeholder: "", Data_TestId: "BandSongCatalog_Options_responsiveNavbar", ControlId: "BandSongCatalog_Options_responsiveNavbar" },
    NodeList: { Label: "", Placeholder: "", Data_TestId: "BandSongCatalog_NodeList", ControlId: "BandSongCatalog_NodeList" },
}