import { AxiosResponse } from "axios";
import { IFilterActionResultBase } from "models/actions";
import { IResponseWrapper } from "models/api";

export const WrappResponse = <T>(response: AxiosResponse<any>): IResponseWrapper<T> => ({
        Values: response.data["data"] ?? [],
        Count: response.data["total"] ?? 0, //result.data["@odata.count"],
        NextLink: response.data["next_page_url"] ?? '',

})

// IFilterActionResultBase

export const UnwrappResponse = <T>({ NextLink, Values, Count }: IResponseWrapper<T>): IFilterActionResultBase<T> => ({
        Values,
        Meta: { NextLink, Count }

})

export const UnwrappPivot = <Ressource, EntityType>(response: AxiosResponse<Ressource>, convert: (prop: Ressource) => EntityType): IResponseWrapper<EntityType> => {
        const wrapped = WrappResponse<Ressource>(response);

        return {
                ...wrapped,Values:wrapped.Values.map(x => convert(x))
        }
}