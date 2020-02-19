import Axios from "axios";
import { EndpointConfiguration, defaultHeader } from "../Configuration";
import { song } from "../models";

const bandsongsEndpoint = EndpointConfiguration.Bandsongs;
const endPointWithId = (id: string): string => `${bandsongsEndpoint.GetEndpointUrl!()}/${id}`;

export const AddSongsToBand = async (bandId: string, songIds: string[]): Promise<song[]> => {
    const addResult = await Axios.post<song[]>(endPointWithId(bandId), songIds, {
        headers: defaultHeader
    });

    return addResult.data;
};

export const ReadSongsFromBand = async(bandId: string):Promise<song[]> => {
    const readResult = await Axios.get<song[]>(endPointWithId(bandId),{
        headers: defaultHeader
    });

    return readResult.data;
}

export const RemoveSongFromBand = async(bandId: string, songId:string):Promise<void> => {
    const readResult = await Axios.delete<void>(endPointWithId(bandId),{
        headers: defaultHeader
    });
}