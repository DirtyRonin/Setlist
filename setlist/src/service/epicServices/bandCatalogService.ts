import { IsMiminumStringLength } from "utils";
import { IFilterBandActionProps, IBand, INextLinkActionProps, IBandEntityActionProps, IFilterBandActionResult, IBandUser, IBandSong } from "models";
import { CreateBandRequestAsync, DeleteBandRequestAsync, FilterBandsWithPivotBySongId, GetBandByIdRequestAsync, GetBanddByQueryRequestAsync, GetBandsRequestAsync, GetBandsWithPivotBySongId, UpdateBandRequestAsync } from "api/bandApi";
import { UnwrappResponse } from "mapping/ResponseWrapper";

export const fetchBandCatalogAsync = async ({ filter }: IFilterBandActionProps): Promise<IFilterBandActionResult> => {

    const response = IsMiminumStringLength(filter.Query)
        ? await GetBanddByQueryRequestAsync(filter.Query)
        : await GetBandsRequestAsync()

    return UnwrappResponse(response)
}

export const fetchBandCatalogNextLinkAsync = async (props: INextLinkActionProps): Promise<IFilterBandActionResult> => {

    const response = await GetBandsRequestAsync(props.nextLink);
    return UnwrappResponse(response);
}

export const addBandToBandCatalogAsync = async (props: IBandEntityActionProps): Promise<IBand> =>
    await CreateBandRequestAsync(props.value)

export const editBandInCatalogAsync = async (props: IBandEntityActionProps): Promise<IBand> =>
    await UpdateBandRequestAsync(props.value)

export const deleteBandInCatalogAsync = async (props: IBandEntityActionProps): Promise<number> =>
    await DeleteBandRequestAsync(props.value.id)

export const fetchBandById = async (id: number): Promise<IBand> =>
    await GetBandByIdRequestAsync(id);

export const fetchBandsWithFilteredExpands = async ({ filter: { SongId, Query } }: IFilterBandActionProps): Promise<IFilterBandActionResult> => {

    if (!SongId)
        return { Values: [], Meta: { NextLink: '', Count: 0 } }

    const response = IsMiminumStringLength(Query)
        ? await FilterBandsWithPivotBySongId(SongId, Query)
        : await GetBandsWithPivotBySongId(SongId)

    return UnwrappResponse(response);
}


