import { nameof } from "ts-simple-nameof";

import { IFilterBandSongActionProps, IBandSong, ISong, INextLinkActionProps, IFilterBandSongActionResult, IBandSongEntityActionProps, IBand } from "models";
import { IsMiminumStringLength } from "utils";
import { CreateBandSongRequestAsync, DeleteBandSongRequestAsync, GetBandSongByIdRequestAsync, GetBandSongdByQueryRequestAsync, GetBandSongsRequestAsync, UpdateBandSongRequestAsync } from "api/bandSongApi";
import { UnwrappResponse } from "mapping/ResponseWrapper";

export const fetchBandSongCatalogAsync = async ({ filter: { Query, bandId } }: IFilterBandSongActionProps): Promise<IFilterBandSongActionResult> => {
    
    const response = IsMiminumStringLength(Query)
        ? await GetBandSongdByQueryRequestAsync(bandId, Query)
        : await GetBandSongsRequestAsync(bandId.toString())

    return UnwrappResponse(response)
}

export const fetchBandSongCatalogNextLinkAsync = async (props: INextLinkActionProps): Promise<IFilterBandSongActionResult> => {

    const response = await GetBandSongsRequestAsync(props.nextLink);
    return UnwrappResponse(response);
}

export const NewBandSong = async (props: IBandSongEntityActionProps): Promise<IBandSong> =>
    await CreateBandSongRequestAsync(props.value)

export const editBandSongInCatalogAsync = async (props: IBandSongEntityActionProps): Promise<IBandSong> =>
    await UpdateBandSongRequestAsync(props.value)

export const deleteBandSongInCatalogAsync = async ({value:{bandId,songId}}: IBandSongEntityActionProps): Promise<number> =>
    await DeleteBandSongRequestAsync(bandId,songId)

export const fetchBandSongById = async (bandId: number,songId:number): Promise<IBandSong> =>
    await GetBandSongByIdRequestAsync(bandId,songId)

