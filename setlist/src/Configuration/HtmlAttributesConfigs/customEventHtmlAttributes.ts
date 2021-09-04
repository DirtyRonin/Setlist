import { FormHtmlAttributesDefinition } from "configuration"
import { ConfigurationItemCollection } from "configuration/ConfigurationItemCollection"

type CustomEventCatalogComponentNames = "ShowAddCustomEventCheckBox" | "Navbar" | "NodeList"

export const CustomEventCatalogHtmlAttributesConfiguration: ConfigurationItemCollection<
    FormHtmlAttributesDefinition,
    CustomEventCatalogComponentNames
> = {
    ShowAddCustomEventCheckBox: { Label: "Add CustomEvent", Placeholder: "", Data_TestId: "CustomEventCatalog_ShowAddCustomEvent", ControlId: "CustomEventCatalog_ShowAddCustomEvent" },
    Navbar: { Label: "", Placeholder: "", Data_TestId: "CustomEventCatalog_Options_responsiveNavbar", ControlId: "CustomEventCatalog_Options_responsiveNavbar" },
    NodeList: { Label: "", Placeholder: "", Data_TestId: "CustomEventCatalog_NodeList", ControlId: "CustomEventCatalog_NodeList" },
}

// filter
export type FilterCustomEventComponentNames = "SearchQueryInput"

export type FilterCustomEventHtmlAttributesConfigurationType = ConfigurationItemCollection<
    FormHtmlAttributesDefinition,
    FilterCustomEventComponentNames
>

const filterCustomEventName = "FilterCustomEvent"
export const FilterCustomEventHtmlAttributesConfiguration: FilterCustomEventHtmlAttributesConfigurationType = {
    SearchQueryInput: { Label: `SearchQuery`, Placeholder: `Search...`, Data_TestId: `${filterCustomEventName}_SearchQuery`, ControlId: `${filterCustomEventName}_SearchQuery` },
}


// modal
export type CustomEventModalNodeHtmlComponentNames = 'Date' | 'Title' | 'Location' | 'Band' | 'Setlist'

export type CustomEventModalHtmlAttributesConfigurationType = Record<
    CustomEventModalNodeHtmlComponentNames,
    FormHtmlAttributesDefinition
>
export const CustomEventModalHtmlAttributesConfiguration: CustomEventModalHtmlAttributesConfigurationType = {
    Date: { Label: "Date", Placeholder: "Enter Date", Data_TestId: `${filterCustomEventName}_Date`, ControlId: `${filterCustomEventName}_Date` },
    Title: { Label: "Title", Placeholder: "Enter Title", Data_TestId: `${filterCustomEventName}_Title`, ControlId: `${filterCustomEventName}_Title` },
    Location: { Label: "Location", Placeholder: "Enter Location", Data_TestId: `${filterCustomEventName}_Location`, ControlId: `${filterCustomEventName}_Location` },
    Band: { Label: "Band", Placeholder: "Enter Band", Data_TestId: `${filterCustomEventName}_Band`, ControlId: `${filterCustomEventName}_Band` },
    Setlist: { Label: "Setlist", Placeholder: "Enter Setlist", Data_TestId: `${filterCustomEventName}_Setlist`, ControlId: `${filterCustomEventName}_Setlist` },

};