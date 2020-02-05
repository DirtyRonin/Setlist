import { ConfigurationItemCollection } from "./";

type HtmlAttributesDefinition = {
    label: string;
    Data_TestId: string;
};

type FromHtmlAttributesDefinition = {
    label: string;
    Placeholder: string;
    ControlId: string;
};

type CreateSongNodeHtmlComponentNames = "Title" | "Artist" | "Mode";

export const CreateSongNodeHtmlAttributesConfiguration: ConfigurationItemCollection<
    FromHtmlAttributesDefinition,
    CreateSongNodeHtmlComponentNames
> = {
    Title: { label: "Title", Placeholder: "Enter Title", ControlId: "CreateSongNode_Title" },
    Artist: { label: "Artist", Placeholder: "Enter Artist", ControlId: "CreateSongNode_Artist" },
    Mode: { label: "Mode", Placeholder: "Enter Mode", ControlId: "CreateSongNode_Mode" }
};

type SongNodeHtmlComponentNames = CreateSongNodeHtmlComponentNames | "Id";

export const SongNodeHtmlAttributesConfiguration: ConfigurationItemCollection<HtmlAttributesDefinition, SongNodeHtmlComponentNames> = {
    Id: { label: "id", Data_TestId: "SongNode_Id" },
    Title: {label: CreateSongNodeHtmlAttributesConfiguration.Title.label, Data_TestId: "SongNode_Title" },
    Artist: { label:CreateSongNodeHtmlAttributesConfiguration.Artist.label, Data_TestId: "SongNode_Artist" },
    Mode: { label:CreateSongNodeHtmlAttributesConfiguration.Mode.label, Data_TestId: "SongNode_Mode" }
};

type CreateSetlistHtmlComponentNames = "SetlistName" | "IsLibrary" | "IsMajorLibrary";

export const CreateSetlistHtmlAttributesConfiguration: ConfigurationItemCollection<
    FromHtmlAttributesDefinition,
    CreateSetlistHtmlComponentNames
> = {
    SetlistName: {
        label: "Setlist Name",
        Placeholder: "Enter Setlist Name",
        ControlId: "CreateSetlist_SetlistName"
    },
    IsLibrary: { label: "Library", Placeholder: "Select Setlist Attribute", ControlId: "CreateSetlist_library" },
    IsMajorLibrary: { label: "Major Library", Placeholder: "", ControlId: "CreateSetlist_majorlibrary" }
};
