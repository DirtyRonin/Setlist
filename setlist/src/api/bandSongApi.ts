import Axios from "axios";
import { EndpointConfiguration, defaultHeader, BandSongsEndPointDefinition } from "../Configuration";
import { song } from "../models";

const bandsongsEndpoint = (EndpointConfiguration.Bandsongs as BandSongsEndPointDefinition).ActionEndpoints;
const endPointWithId = (actionEndPoint: string,id: string): string => `${actionEndPoint}/${id}`;

type BandSongRef = {
    songId:string
}

const GetBandSongRefsAsync = (songIds: string[]): Array<BandSongRef> => songIds.map(songId => { return {songId}})

export const ReadSongsFromBand = async(bandId: string):Promise<song[]> => {
    const readResult = await Axios.get<song[]>(endPointWithId(bandsongsEndpoint.GetBandsongs.GetEndpointUrl(),bandId),{
        headers: defaultHeader
    });

    return readResult.data;
}

export const AddSongsToBandAsync = async (bandId: string, songIds: string[]): Promise<void> => {

    const bandSongRefs: Array<BandSongRef> = GetBandSongRefsAsync(songIds)

    const addResult = await Axios.put<void>(endPointWithId(bandsongsEndpoint.AddBandsongs.GetEndpointUrl(),bandId), bandSongRefs, {
        headers: defaultHeader
    });
};


export const RemoveSongsFromBandAsync = async(bandId: string, songIds: string[]):Promise<void> => {

    const bandSongRefs: Array<BandSongRef> = GetBandSongRefsAsync(songIds)

    const readResult = await Axios.put<void>(endPointWithId(bandsongsEndpoint.RemoveBandsongs.GetEndpointUrl(),bandId),bandSongRefs,{
        headers: defaultHeader
    });
}