import { ISong } from "../models";
import { GetSongsRequestAsync, CreateSongRequestAsync, DeleteSongRequestAsync } from "../api";
import { MapResourceToSong, MapSongToResource } from "../mapping/songMapping";

export const ReadSongsAsync = async (): Promise<Array<ISong>> => {
    const songResources = await GetSongsRequestAsync();
    return songResources.data.map(resource =>
        MapResourceToSong(resource)
    )
};

export const CreateSongAsync = async (song: ISong): Promise<ISong> => {
    const resource = MapSongToResource(song, true)

    const result = await CreateSongRequestAsync(resource)

    return MapResourceToSong(result.data)
}

export const DeleteSongAsync = async (songId: string): Promise<ISong> => {
    const id:number = Number(songId)

    const result = await DeleteSongRequestAsync(id);

    return MapResourceToSong(result.data);
}