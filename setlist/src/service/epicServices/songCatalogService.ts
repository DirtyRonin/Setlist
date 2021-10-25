import { nameof } from "ts-simple-nameof"

import { ISong, IFilterSongActionProps, ISongEntityActionProps, INextLinkActionProps, IFilterSongActionResult, IBandSong, ISetlistSong } from "models";
import { IsMiminumStringLength } from "utils";
import { CreateSongRequestAsync, DeleteSongRequestAsync, FilterSongssWithPivotBySetlistId, GetSongByIdRequestAsync, GetSongdByQueryRequestAsync, GetSongdWithPivotBySetlistId, GetSongsRequestAsync, UpdateSongRequestAsync } from "api/songApi";
import { UnwrappResponse } from "mapping/ResponseWrapper";


const BANDSONGS = nameof<ISong>(x => x.bandSongs)
const SETLISTSONGS = nameof<ISong>(x => x.setlistSongs)
const BANDID = nameof<IBandSong>(x => x.bandId)
const SETLISTID = nameof<ISetlistSong>(x => x.setlistId)

export const fetchSongCatalogAsync = async ({ filter }: IFilterSongActionProps): Promise<IFilterSongActionResult> => {

    const response = IsMiminumStringLength(filter.Query)
        ? await GetSongdByQueryRequestAsync(filter.Query)
        : await GetSongsRequestAsync()

    return UnwrappResponse(response)
}

export const fetchSongCatalogNextLinkAsync = async (props: INextLinkActionProps): Promise<IFilterSongActionResult> => {

    const response = await GetSongsRequestAsync(props.nextLink);
    return UnwrappResponse(response);
}

export const addSongToSongCatalogAsync = async (props: ISongEntityActionProps): Promise<ISong> =>
    await CreateSongRequestAsync(props.value)

export const editSongInCatalogAsync = async (props: ISongEntityActionProps): Promise<ISong> =>
    await UpdateSongRequestAsync(props.value)

export const deleteSongInCatalogAsync = async (props: ISongEntityActionProps): Promise<number> =>
    await DeleteSongRequestAsync(props.value.id)

export const fetchSongById = async (id: number): Promise<ISong> =>
    await GetSongByIdRequestAsync(id);

export const fetchSongsWithFilteredExpands = async ({ filter: { SetlistId, Query } }: IFilterSongActionProps): Promise<IFilterSongActionResult> => {

    if (!SetlistId)
        return { Values: [], Meta: { NextLink: '', Count: 0 } }

    const response = IsMiminumStringLength(Query)
        ? await FilterSongssWithPivotBySetlistId(SetlistId, Query)
        : await GetSongdWithPivotBySetlistId(SetlistId)

    return UnwrappResponse(response);
}
