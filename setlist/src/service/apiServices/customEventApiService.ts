import validator from "validator";
import { CreateCustomEventRequestAsync, DeleteCustomEventRequestAsync, GetCustomEventRequestAsync, UpdateCustomEventRequestAsync } from "../../api";
import { EndpointConfiguration } from "../../Configuration";
import { CustomEvent } from "../../mapping";
import { IOdataWrapper, ICustomEvent } from "../../models";

export const ReadCustomEventAsync = async (filterOrNextLink: string): Promise<IOdataWrapper<ICustomEvent>> => {

    const default_url_options = {
        protocols: ['http', 'https', 'ftp'],
        require_tld: false,
        require_protocol: false,
        require_host: false,
        require_valid_protocol: false,
        allow_underscores: false,
        allow_trailing_dot: false,
        allow_protocol_relative_urls: false
      };

    const url = validator.isURL(filterOrNextLink,default_url_options) ? filterOrNextLink :
        `${EndpointConfiguration.CustomEvents.GetEndpointUrl()}/${filterOrNextLink.toLowerCase()}`

    const odataCustomEventResources = await GetCustomEventRequestAsync(url);

    const customEvent = odataCustomEventResources.Values.map(resource =>
        CustomEvent.FromResource(resource)
    )

    return { ...odataCustomEventResources, Values: customEvent }
};

export const CreateCustomEventAsync = async (customEvent: ICustomEvent,expand :string | undefined): Promise<ICustomEvent> => {
    const resource = CustomEvent.ToResource(customEvent)

    const result = await CreateCustomEventRequestAsync(resource,expand)

    return CustomEvent.FromResource(result.data)
}

export const UpdateCustomEventAsync = async(customEvent:ICustomEvent,expand :string | undefined):Promise<ICustomEvent> => {
    const resource = CustomEvent.ToResource(customEvent)

    const result = await UpdateCustomEventRequestAsync(resource,expand)

    return CustomEvent.FromResource(result.data)
}

export const DeleteCustomEventAsync = async (customEventId: string): Promise<ICustomEvent> => {
    const result = await DeleteCustomEventRequestAsync(customEventId);

    return CustomEvent.FromResource(result.data);
}