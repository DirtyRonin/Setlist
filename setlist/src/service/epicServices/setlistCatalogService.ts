import { nameof } from "ts-simple-nameof"

import { IFilterSetlistActionProps, IFilterSetlistActionResult, INextLinkActionProps, ISetlist, ISetlistEntityActionProps, ISetlistSong } from "models"
import { IsMiminumStringLength, QueryBuilder, FilterBuilder, GUID_EMPTY } from "utils"
import { CreateSetlistRequestAsync, DeleteSetlistRequestAsync, FilterSetlistsWithPivotBySongId, GetSetlistByIdRequestAsync, GetSetlistdByQueryRequestAsync, GetSetlistsRequestAsync, GetSetlistsWithPivotBySongId, UpdateSetlistRequestAsync } from "api/setlistApi"
import { UnwrappResponse } from "mapping/ResponseWrapper"

const SETLISTSONGS = `${nameof<ISetlist>(_ => _.setlistSongs)}`

export const fetchSetlistCatalogAsync = async ({ filter }: IFilterSetlistActionProps): Promise<IFilterSetlistActionResult> => {

    const response = IsMiminumStringLength(filter.Query)
        ? await GetSetlistdByQueryRequestAsync(filter.Query)
        : await GetSetlistsRequestAsync()

    return UnwrappResponse(response)
}

export const fetchSetlistCatalogNextLinkAsync = async (props: INextLinkActionProps): Promise<IFilterSetlistActionResult> => {

    const response = await GetSetlistsRequestAsync(props.nextLink);
    return UnwrappResponse(response);
}

export const addSetlistToSetlistCatalogAsync = async (props: ISetlistEntityActionProps): Promise<ISetlist> =>
    await CreateSetlistRequestAsync(props.value)

export const editSetlistInCatalogAsync = async (props: ISetlistEntityActionProps): Promise<ISetlist> =>
    await UpdateSetlistRequestAsync(props.value)

export const deleteSetlistInCatalogAsync = async (props: ISetlistEntityActionProps): Promise<number> =>
    await (DeleteSetlistRequestAsync(props.value.id))

export const fetchSetlistById = async (id: number): Promise<ISetlist> =>
    await GetSetlistByIdRequestAsync(id)

export const fetchSetlistsWithFilteredExpands = async ({ filter: {SongId,Query} }: IFilterSetlistActionProps): Promise<IFilterSetlistActionResult> => {

    if (!SongId)
        return { Values: [], Meta: { NextLink: '', Count: 0 } }

    const response = IsMiminumStringLength(Query)
        ? await FilterSetlistsWithPivotBySongId(SongId, Query)
        : await GetSetlistsWithPivotBySongId(SongId)

    return UnwrappResponse(response);
}

