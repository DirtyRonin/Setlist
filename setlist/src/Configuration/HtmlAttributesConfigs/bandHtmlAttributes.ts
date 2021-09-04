import { FormHtmlAttributesDefinition } from "Configuration";
import { ConfigurationItemCollection } from "Configuration/ConfigurationItemCollection";

//catalog
type BandCatalogComponentNames = "ShowAddBandCheckBox" | "Navbar" | "NodeList"

export const BandCatalogHtmlAttributesConfiguration: ConfigurationItemCollection<
    FormHtmlAttributesDefinition,
    BandCatalogComponentNames
> = {
    ShowAddBandCheckBox: { Label: "Add Band", Placeholder: "", Data_TestId: "BandCatalog_ShowAddBand", ControlId: "BandCatalog_ShowAddBand" },
    Navbar: { Label: "", Placeholder: "", Data_TestId: "BandCatalog_Options_responsiveNavbar", ControlId: "BandCatalog_Options_responsiveNavbar" },
    NodeList: { Label: "", Placeholder: "", Data_TestId: "BandCatalog_NodeList", ControlId: "BandCatalog_NodeList" },
}


//catalogNode
type BandCatalogNodeComponentNames = "ShowBandSongCatalogCheckBox"

export const BandCatalogNodeHtmlAttributesConfiguration: ConfigurationItemCollection<
    FormHtmlAttributesDefinition,
    BandCatalogNodeComponentNames
> = {
    ShowBandSongCatalogCheckBox: { Label: "Show Band Songs", Placeholder: "", Data_TestId: "BandCatalogNode_ShowBandSongCatalog", ControlId: "BandCatalogNode_ShowBandSongCatalog" },
}


//filter
type FilterBandComponentNames = "SearchQueryInput";

export const FilterBandHtmlAttributesConfiguration: ConfigurationItemCollection<
    FormHtmlAttributesDefinition,
    FilterBandComponentNames
> = {
    SearchQueryInput: { Label: "SearchQuery", Placeholder: "Search...", Data_TestId: "FilterBand_SearchQuery", ControlId: "FilterBand_SearchQuery" },
}


//modal
type BandModalNodeHtmlComponentNames = "Title";

export const BandModalHtmlAttributesConfiguration: Record<
    BandModalNodeHtmlComponentNames,
    FormHtmlAttributesDefinition
> = {
    Title: { Label: "Title", Placeholder: "Enter Title", Data_TestId: "BandModal_Title", ControlId: "BandModal_Title" }
};