import { ISongResource } from "../resources"
import { ISong } from "../models"

export const MapResourceToSong = (resource: ISongResource): ISong => {
    return { ...resource } as ISong
}

export const MapSongToResource = (song: ISong, isCreateResource: boolean): ISongResource =>
    isCreateResource ? { ...song, id: 0 } as ISongResource : { ...song } as ISongResource

