import { ConfigurationItemCollection } from "./ConfigurationItemCollection";

export type FormHtmlAttributesDefinition = {
    Label: string;
    Data_TestId: string;
    Placeholder: string;
    ControlId: string;
};

type AddSongToBandComponentNames = "ShowAddBandCheckBox" | "Navbar" | "NodeList"

export const AddSongToBandHtmlAttributesConfiguration: ConfigurationItemCollection<
    FormHtmlAttributesDefinition,
    AddSongToBandComponentNames
> = {
    ShowAddBandCheckBox: { Label: "Add Band", Placeholder: "", Data_TestId: "AddSongToBand_ShowAddBand", ControlId: "AddSongToBand_ShowAddBand" },
    Navbar: { Label: "", Placeholder: "", Data_TestId: "AddSongToBand_Options_responsiveNavbar", ControlId: "AddSongToBand_Options_responsiveNavbar" },
    NodeList: { Label: "", Placeholder: "", Data_TestId: "AddSongToBand_NodeList", ControlId: "AddSongToBand_NodeList" },
}

type AddSongToSetlistComponentNames = "ShowAddSetlistCheckBox" | "Navbar" | "NodeList"

export const AddSongToSetlistHtmlAttributesConfiguration: ConfigurationItemCollection<
    FormHtmlAttributesDefinition,
    AddSongToSetlistComponentNames
> = {
    ShowAddSetlistCheckBox: { Label: "Add Setlist", Placeholder: "", Data_TestId: "AddSongToSetlist_ShowAddSetlist", ControlId: "AddSongToSetlist_ShowAddSetlist" },
    Navbar: { Label: "", Placeholder: "", Data_TestId: "AddSongToSetlist_Options_responsiveNavbar", ControlId: "AddSongToSetlist_Options_responsiveNavbar" },
    NodeList: { Label: "", Placeholder: "", Data_TestId: "AddSongToSetlist_NodeList", ControlId: "AddSongToSetlist_NodeList" },
}

type AddBandSongToSetlistComponentNames = "ShowAddSetlistCheckBox" | "Navbar" | "NodeList"

export const AddBandSongToSetlistHtmlAttributesConfiguration: ConfigurationItemCollection<
    FormHtmlAttributesDefinition,
    AddBandSongToSetlistComponentNames
> = {
    ShowAddSetlistCheckBox: { Label: "Add Setlist", Placeholder: "", Data_TestId: "AddBandSongToSetlist_ShowAddSetlist", ControlId: "AddBandSongToSetlist_ShowAddSetlist" },
    Navbar: { Label: "", Placeholder: "", Data_TestId: "AddBandSongToSetlist_Options_responsiveNavbar", ControlId: "AddBandSongToSetlist_Options_responsiveNavbar" },
    NodeList: { Label: "", Placeholder: "", Data_TestId: "AddBandSongToSetlist_NodeList", ControlId: "AddBandSongToSetlist_NodeList" },
}

type AddBandSongFromSongsComponentNames = "ShowAddSetlistCheckBox" | "Navbar" | "NodeList"

export const AddBandSongFromSongsHtmlAttributesConfiguration: ConfigurationItemCollection<
    FormHtmlAttributesDefinition,
    AddBandSongFromSongsComponentNames
> = {
    ShowAddSetlistCheckBox: { Label: "Add Setlist", Placeholder: "", Data_TestId: "AddBandSongFromSongs_ShowAddSetlist", ControlId: "AddBandSongFromSongs_ShowAddSetlist" },
    Navbar: { Label: "", Placeholder: "", Data_TestId: "AddBandSongFromSongs_Options_responsiveNavbar", ControlId: "AddBandSongFromSongs_Options_responsiveNavbar" },
    NodeList: { Label: "", Placeholder: "", Data_TestId: "AddBandSongFromSongs_NodeList", ControlId: "AddBandSongFromSongs_NodeList" },
}