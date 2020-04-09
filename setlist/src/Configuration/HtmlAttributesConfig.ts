import { ConfigurationItemCollection } from "./ConfigurationItemCollection";

type HtmlAttributesDefinition = {
    Label: string;
    Data_TestId: string;
};

type FormHtmlAttributesDefinition = {
    Label: string;
    Data_TestId: string;
    Placeholder: string;
    ControlId: string;
};

type CreateSongNodeHtmlComponentNames = "Title" | "Artist" | "Mode";

export const CreateSongNodeHtmlAttributesConfiguration: ConfigurationItemCollection<
    FormHtmlAttributesDefinition,
    CreateSongNodeHtmlComponentNames
> = {
    Title: { Label: "Title", Placeholder: "Enter Title", Data_TestId: "CreateSongNode_Title", ControlId: "CreateSongNode_Title" },
    Artist: { Label: "Artist", Placeholder: "Enter Artist", Data_TestId: "CreateSongNode_Artist", ControlId: "CreateSongNode_Artist" },
    Mode: { Label: "Mode", Placeholder: "Enter Mode", Data_TestId: "CreateSongNode_Mode", ControlId: "CreateSongNode_Mode" }
};

type SongNodeHtmlComponentNames = CreateSongNodeHtmlComponentNames | "Id";

export const SongNodeHtmlAttributesConfiguration: ConfigurationItemCollection<HtmlAttributesDefinition, SongNodeHtmlComponentNames> = {
    Id: { Label: "id", Data_TestId: "SongNode_Id" },
    Title: { Label: CreateSongNodeHtmlAttributesConfiguration.Title.Label, Data_TestId: "SongNode_Title" },
    Artist: { Label: CreateSongNodeHtmlAttributesConfiguration.Artist.Label, Data_TestId: "SongNode_Artist" },
    Mode: { Label: CreateSongNodeHtmlAttributesConfiguration.Mode.Label, Data_TestId: "SongNode_Mode" }
};

type CreateSetlistHtmlComponentNames = "SetlistNameInput" | "MajorLibraryNameInput" | "BandSelect" | "CreateSetlistButton"|"CreateMajorLibraryButton";

export const CreateSetlistHtmlAttributesConfiguration: ConfigurationItemCollection<
    FormHtmlAttributesDefinition,
    CreateSetlistHtmlComponentNames
> = {
    SetlistNameInput: { Label: "List Name", Placeholder: "Enter List Name", Data_TestId: "CreateSetlist_SetlistName", ControlId: "CreateSetlist_SetlistName" },
    MajorLibraryNameInput: { Label: "Major Library Name", Placeholder: "Enter Major Library Name", Data_TestId: "CreateSetlist_SetlistName", ControlId: "CreateSetlist_MajorLibraryName" },
    CreateSetlistButton: { Label: "Create Setlist", Placeholder: "", Data_TestId: "CreateSetlist_CreateSetlist", ControlId: "CreateSetlist_CreateSetlist" },
    CreateMajorLibraryButton: { Label: "Create Major Library", Placeholder: "", Data_TestId: "CreateSetlist_MajorLibrary", ControlId: "CreateSetlist_MajorLibrary" },
    BandSelect: { Label: "Select List Type", Placeholder: "Select List Type", Data_TestId: "Select_ListType", ControlId: "Select_ListType" },
};

type FilterSongComponentNames = "SearchTitleInput" | "SearchArtistInput" | "SearchGenreInput" | "SearchEvergreenCheckBox" |"SearchNinetiesCheckBox" | "SearchButton" ;

export const FilterSongHtmlAttributesConfiguration:ConfigurationItemCollection<
FormHtmlAttributesDefinition,
FilterSongComponentNames
> = {
    SearchTitleInput: { Label: "Search For Title", Placeholder: "Enter Title", Data_TestId: "FilterSong_SearchTitle", ControlId: "FilterSong_SearchTitle" },
    SearchArtistInput: { Label: "Search For Artist", Placeholder: "Enter Artist", Data_TestId: "FilterSong_SearchArtist", ControlId: "FilterSong_SearchArtist" },
    SearchGenreInput: { Label: "Search For Genre", Placeholder: "Enter Genre", Data_TestId: "FilterSong_SearchGenre", ControlId: "FilterSong_SearchGenre" },
    SearchEvergreenCheckBox: { Label: "Evergreen", Placeholder: "", Data_TestId: "FilterSong_SearchEvergreen", ControlId: "FilterSong_SearchEvergreen" },
    SearchNinetiesCheckBox: { Label: "90er", Placeholder: "", Data_TestId: "FilterSong_SearchNineties", ControlId: "FilterSong_SearchNineties" },
    SearchButton: { Label: "Search", Placeholder: "", Data_TestId: "FilterSong_SearchButton", ControlId: "FilterSong_SearchButton" },
}

type SongCatalogComponentNames = "ShowAddSongCheckBox" | "Navbar" | "NodeList"

export const SongCatalogHtmlAttributesConfiguration:ConfigurationItemCollection<
FormHtmlAttributesDefinition,
SongCatalogComponentNames 
> = {
    ShowAddSongCheckBox : { Label: "Add Songs", Placeholder:"", Data_TestId: "SongCatalog_ShowAddSong", ControlId: "SongCatalog_ShowAddSong" },
    Navbar: {Label:"",Placeholder:"", Data_TestId:"SongCatalog_Options_responsiveNavbar", ControlId:"SongCatalog_Options_responsiveNavbar"},
    NodeList: {Label:"",Placeholder:"", Data_TestId:"SongCatalog_NodeList", ControlId:"SongCatalog_NodeList"},
}



