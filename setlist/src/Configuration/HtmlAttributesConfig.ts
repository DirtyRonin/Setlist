import { ConfigurationItemCollection } from "./";

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


