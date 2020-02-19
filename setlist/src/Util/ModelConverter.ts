import { songlist, bandlist } from "../models"

export const ToBandlist = (songlist: songlist): bandlist => { return { id: songlist.id, title: songlist.title, bandsongs: [] } as bandlist }
export const ToSonglist = (bandlist: bandlist): songlist => {
    return {
        id: bandlist.id,
        title: bandlist.title,
        isBandList: true,
        isMainList: false,
        songs: bandlist.bandsongs
    } as songlist
}