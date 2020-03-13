import { ISong, SonglistType, IMainlist } from "../../models";
import { SonglistBase } from ".";
import { EndpointConfiguration } from "../../Configuration";

class MainList extends SonglistBase implements IMainlist {
    private static readonly id = "mainList_id"
    private static readonly endpointName = EndpointConfiguration.Songs.Name;

    constructor(songs: ISong[] = []) {
        super(
            MainList.id,
            MainList.endpointName,
            SonglistType.MainList,
            songs
        )
    }
}


export const CreateMainList = (songs: ISong[] = []): IMainlist => new MainList(songs);