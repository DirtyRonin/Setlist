import { IBandResource } from "../resources"
import { IBand, IBandSong } from "../models"
import { GUID_EMPTY } from "../Util"

export const MapResourceToBand = (resource: IBandResource): IBand => {
    const { Id, Title } = resource
    return {
        Id,
        Title,
        BandSongs: []
    } as IBand
}

export const MapBandToResource = (band: IBand, isCreateResource: boolean): IBandResource =>
    isCreateResource ? { ...band, Id: GUID_EMPTY } as IBandResource : { ...band } as IBandResource