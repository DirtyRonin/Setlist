import { IFilterSetlistSongActionProps, IFilterSetlistSongActionResult, INextLinkActionProps, ISetlistSong, ISetlistSongEntityActionProps, ISong } from "models"
import { IsMiminumStringLength } from "utils"
import { GetSetlistSongdByQueryRequestAsync, GetSetlistSongsRequestAsync, CreateSetlistSongRequestAsync, UpdateSetlistSongRequestAsync, DeleteSetlistSongRequestAsync, GetSetlistSongByIdRequestAsync } from "api/setlistSongApi"
import { UnwrappResponse } from "mapping/ResponseWrapper"

export const fetchSetlistSongCatalogAsync = async ({ filter: { Query, SetlistId } }: IFilterSetlistSongActionProps): Promise<IFilterSetlistSongActionResult> => {
    
    const response = IsMiminumStringLength(Query)
        ? await GetSetlistSongdByQueryRequestAsync(SetlistId, Query)
        : await GetSetlistSongsRequestAsync(SetlistId.toString())

    return UnwrappResponse(response)
}

export const fetchSetlistSongCatalogNextLinkAsync = async (props: INextLinkActionProps): Promise<IFilterSetlistSongActionResult> => {

    const response = await GetSetlistSongsRequestAsync(props.nextLink);
    return UnwrappResponse(response);
}

export const NewSetlistSong = async (props: ISetlistSongEntityActionProps): Promise<ISetlistSong> =>
    await CreateSetlistSongRequestAsync(props.value)

export const editSetlistSongInCatalogAsync = async (props: ISetlistSongEntityActionProps): Promise<ISetlistSong> =>
    await UpdateSetlistSongRequestAsync(props.value)

export const deleteSetlistSongInCatalogAsync = async ({value:{setlistId,songId}}: ISetlistSongEntityActionProps): Promise<number> =>
    await DeleteSetlistSongRequestAsync(setlistId,songId)

export const fetchSetlistSongById = async (setlistId: number,songId:number): Promise<ISetlistSong> =>
    await GetSetlistSongByIdRequestAsync(setlistId,songId)
