import { ISong, IOdataWrapper } from "../../models";
import { GetSongsRequestAsync, CreateSongRequestAsync, DeleteSongRequestAsync } from "../../api";
import { Song } from "../../mapping";

export const ReadSongsAsync = async (filter:string): Promise<IOdataWrapper<ISong>> => {
    const odataSongResources = await GetSongsRequestAsync(filter);

    const songs = odataSongResources.Values.map(resource =>
        Song.FromResource(resource)
    )

     

    return {...odataSongResources,Values:songs}
};

export const CreateSongAsync = async (song: ISong): Promise<ISong> => {
    const resource = Song.ToResource(song)

    const result = await CreateSongRequestAsync(resource)

    return Song.FromResource(result.data)
}

export const DeleteSongAsync = async (songId: string): Promise<ISong> => {
    const result = await DeleteSongRequestAsync(songId);

    return Song.FromResource(result.data);
}