import Axios from "axios";
import { EndpointConfiguration, defaultHeader, BandSongsEndPointDefinition } from "../Configuration";
import { ISong } from "../models";




const bandsongsEndpoint = (EndpointConfiguration.Bandsongs as BandSongsEndPointDefinition).ActionEndpoints;
const endPointWithId = (actionEndPoint: string,id: string): string => `${actionEndPoint}/${id}`;

type BandSongRef = {
    songId:string
}

const GetBandSongRefs = (songIds: string[]): Array<BandSongRef> => songIds.map(songId => { return {songId}})

export const ReadSongsFromBand = async(bandId: number):Promise<ISong[]> => {
    const readResult = await Axios.get<ISong[]>(endPointWithId(bandsongsEndpoint.GetBandsongs.GetEndpointUrl(),bandId.toString()),{
        headers: defaultHeader
    });

    return readResult.data;
}

export const AddSongsToBandAsync = async (bandId: string, songIds: string[]): Promise<void> => {

    const bandSongRefs: Array<BandSongRef> = GetBandSongRefs(songIds)

    await Axios.put<void>(endPointWithId(bandsongsEndpoint.AddBandsongs.GetEndpointUrl(),bandId), bandSongRefs, {
        headers: defaultHeader
    });
};


export const RemoveSongsFromBandAsync = async(bandId: string, songIds: string[]):Promise<void> => {

    const bandSongRefs: Array<BandSongRef> = GetBandSongRefs(songIds)

    await Axios.put<void>(endPointWithId(bandsongsEndpoint.RemoveBandsongs.GetEndpointUrl(),bandId),bandSongRefs,{
        headers: defaultHeader
    });
}