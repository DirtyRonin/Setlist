import { ISong } from "../../models";
import { GetSongsRequestAsync, CreateSongRequestAsync, DeleteSongRequestAsync } from "../../api";
import { Song } from "../../mapping";

export const ReadSongsAsync = async (): Promise<Array<ISong>> => {
    const songResources = await GetSongsRequestAsync();
    return songResources.map(resource =>
        Song.FromResource(resource)
    )
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