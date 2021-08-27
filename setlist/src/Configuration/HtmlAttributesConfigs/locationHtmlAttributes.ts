import { FormHtmlAttributesDefinition } from "configuration"
import { ConfigurationItemCollection } from "configuration/ConfigurationItemCollection"



// catalog
type LocationCatalogComponentNames = "ShowAddLocationCheckBox" | "Navbar" | "NodeList"

export const LocationCatalogHtmlAttributesConfiguration: ConfigurationItemCollection<
    FormHtmlAttributesDefinition,
    LocationCatalogComponentNames
> = {
    ShowAddLocationCheckBox: { Label: "Add Location", Placeholder: "", Data_TestId: "LocationCatalog_ShowAddLocation", ControlId: "LocationCatalog_ShowAddLocation" },
    Navbar: { Label: "", Placeholder: "", Data_TestId: "LocationCatalog_Options_responsiveNavbar", ControlId: "LocationCatalog_Options_responsiveNavbar" },
    NodeList: { Label: "", Placeholder: "", Data_TestId: "LocationCatalog_NodeList", ControlId: "LocationCatalog_NodeList" },
}


// filter
export type FilterLocationComponentNames = "SearchNameInput" 

export type FilterLocationHtmlAttributesConfigurationType = ConfigurationItemCollection<
    FormHtmlAttributesDefinition,
    FilterLocationComponentNames
>

const filterLocationName = "FilterLocation"
export const FilterLocationHtmlAttributesConfiguration: FilterLocationHtmlAttributesConfigurationType = {
    SearchNameInput: { Label: `Search For Name`, Placeholder: `Enter Name`, Data_TestId: `${filterLocationName}_SearchName`, ControlId: `${filterLocationName}_SearchName` }
}

// modal
export type LocationModalNodeHtmlComponentNames = "Name" | "Address" 

export type LocationModalHtmlAttributesConfigurationType = Record<
    LocationModalNodeHtmlComponentNames,
    FormHtmlAttributesDefinition
>
export const LocationModalHtmlAttributesConfiguration: LocationModalHtmlAttributesConfigurationType = {
    Name: { Label: "Name", Placeholder: "Enter Name", Data_TestId: "LocationModal_Name", ControlId: "LocationModal_Name" },
    Address: { Label: "Address", Placeholder: "Enter Address", Data_TestId: "LocationModal_Address", ControlId: "LocationModal_Address" },
    
};