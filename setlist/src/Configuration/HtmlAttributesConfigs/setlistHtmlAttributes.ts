import { FormHtmlAttributesDefinition } from "Configuration"
import { ConfigurationItemCollection } from "Configuration/ConfigurationItemCollection"

//catalog
type SetlistCatalogComponentNames = "ShowAddSetlistCheckBox" | "Navbar" | "NodeList"

export const SetlistCatalogHtmlAttributesConfiguration: ConfigurationItemCollection<
    FormHtmlAttributesDefinition,
    SetlistCatalogComponentNames
> = {
    ShowAddSetlistCheckBox: { Label: "Add Setlist", Placeholder: "", Data_TestId: "SetlistCatalog_ShowAddSetlist", ControlId: "SetlistCatalog_ShowAddSetlist" },
    Navbar: { Label: "", Placeholder: "", Data_TestId: "SetlistCatalog_Options_responsiveNavbar", ControlId: "SetlistCatalog_Options_responsiveNavbar" },
    NodeList: { Label: "", Placeholder: "", Data_TestId: "SetlistCatalog_NodeList", ControlId: "SetlistCatalog_NodeList" },
}


//filter
type SetlistBandComponentNames = "SearchQueryInput";
const filterSetlist = "FilterSetlist"
export const FilterSetlistHtmlAttributesConfiguration: ConfigurationItemCollection<
    FormHtmlAttributesDefinition,
    SetlistBandComponentNames
> = {
    SearchQueryInput: { Label: `SearchQuery`, Placeholder: `Search...`, Data_TestId: `${filterSetlist}_SearchQuery`, ControlId: `${filterSetlist}_SearchQuery` },
}


//modal
type SetlistModalNodeHtmlComponentNames = "Title" | "Comment";

export const SetlistModalHtmlAttributesConfiguration: Record<
    SetlistModalNodeHtmlComponentNames,
    FormHtmlAttributesDefinition
> = {
    Title: { Label: "Title", Placeholder: "Enter Title", Data_TestId: "SetlistModal_Title", ControlId: "SetlistModal_Title" },
    Comment: { Label: "Comment", Placeholder: "Enter Comment", Data_TestId: "SetlistModal_Comment", ControlId: "SetlistModal_Comment" },
};