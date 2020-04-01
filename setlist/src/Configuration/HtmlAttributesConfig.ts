import { ConfigurationItemCollection } from "./ConfigurationItemCollection";

type HtmlAttributesDefinition = {
    label: string;
    Data_TestId: string;
};

type FromHtmlAttributesDefinition = {
    label: string;
    Data_TestId: string;
    Placeholder: string;
    ControlId: string;
};

type CreateSongNodeHtmlComponentNames = "Title" | "Artist" | "Mode";

export const CreateSongNodeHtmlAttributesConfiguration: ConfigurationItemCollection<
    FromHtmlAttributesDefinition,
    CreateSongNodeHtmlComponentNames
> = {
    Title: { label: "Title", Placeholder: "Enter Title", Data_TestId: "CreateSongNode_Title", ControlId: "CreateSongNode_Title" },
    Artist: { label: "Artist", Placeholder: "Enter Artist", Data_TestId: "CreateSongNode_Artist", ControlId: "CreateSongNode_Artist" },
    Mode: { label: "Mode", Placeholder: "Enter Mode", Data_TestId: "CreateSongNode_Mode", ControlId: "CreateSongNode_Mode" }
};

type SongNodeHtmlComponentNames = CreateSongNodeHtmlComponentNames | "Id";

export const SongNodeHtmlAttributesConfiguration: ConfigurationItemCollection<HtmlAttributesDefinition, SongNodeHtmlComponentNames> = {
    Id: { label: "id", Data_TestId: "SongNode_Id" },
    Title: { label: CreateSongNodeHtmlAttributesConfiguration.Title.label, Data_TestId: "SongNode_Title" },
    Artist: { label: CreateSongNodeHtmlAttributesConfiguration.Artist.label, Data_TestId: "SongNode_Artist" },
    Mode: { label: CreateSongNodeHtmlAttributesConfiguration.Mode.label, Data_TestId: "SongNode_Mode" }
};

type CreateSetlistHtmlComponentNames = "SetlistNameInput" | "MajorLibraryNameInput" | "BandSelect" | "CreateSetlistButton"|"CreateMajorLibraryButton";

export const CreateSetlistHtmlAttributesConfiguration: ConfigurationItemCollection<
    FromHtmlAttributesDefinition,
    CreateSetlistHtmlComponentNames
> = {
    SetlistNameInput: { label: "List Name", Placeholder: "Enter List Name", Data_TestId: "CreateSetlist_SetlistName", ControlId: "CreateSetlist_SetlistName" },
    MajorLibraryNameInput: { label: "Major Library Name", Placeholder: "Enter Major Library Name", Data_TestId: "CreateSetlist_SetlistName", ControlId: "CreateSetlist_MajorLibraryName" },
    CreateSetlistButton: { label: "Create Setlist", Placeholder: "", Data_TestId: "CreateSetlist_CreateSetlist", ControlId: "CreateSetlist_CreateSetlist" },
    CreateMajorLibraryButton: { label: "Create Major Library", Placeholder: "", Data_TestId: "CreateSetlist_MajorLibrary", ControlId: "CreateSetlist_MajorLibrary" },
    BandSelect: { label: "Select List Type", Placeholder: "Select List Type", Data_TestId: "Select_ListType", ControlId: "Select_ListType" },
};

type FilterSongComponentNames = "SearchTitleInput" | "SearchArtistInput" | "SearchGenreInput" | "SearchEvergreenCheckBox" |"SearchNinetiesCheckBox" | "SearchButton" ;

export const FilterSongHtmlAttributesConfiguration:ConfigurationItemCollection<
FromHtmlAttributesDefinition,
FilterSongComponentNames
> = {
    SearchTitleInput: { label: "Search For Title", Placeholder: "Enter Title", Data_TestId: "FilterSong_SearchTitle", ControlId: "FilterSong_SearchTitle" },
    SearchArtistInput: { label: "Search For Artist", Placeholder: "Enter Artist", Data_TestId: "FilterSong_SearchArtist", ControlId: "FilterSong_SearchArtist" },
    SearchGenreInput: { label: "Search For Genre", Placeholder: "Enter Genre", Data_TestId: "FilterSong_SearchGenre", ControlId: "FilterSong_SearchGenre" },
    SearchEvergreenCheckBox: { label: "Evergreen", Placeholder: "", Data_TestId: "FilterSong_SearchEvergreen", ControlId: "FilterSong_SearchEvergreen" },
    SearchNinetiesCheckBox: { label: "90er", Placeholder: "", Data_TestId: "FilterSong_SearchNineties", ControlId: "FilterSong_SearchNineties" },
    SearchButton: { label: "Search", Placeholder: "", Data_TestId: "FilterSong_SearchButton", ControlId: "FilterSong_SearchButton" },
}




