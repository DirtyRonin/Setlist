import { IAppState } from "../App";
import { EndpointConfiguration } from "../Configuration";
import { GetSetlists,GetAllSongs } from "./";

const InitialStateRequest = async (): Promise<IAppState> => {
    const endpointName = EndpointConfiguration.Songs.Name;
    const songs = await GetAllSongs();

    const setlists = await GetSetlists();
    const setlistKeys = Object.keys(setlists);
    const setlistOrder = setlistKeys.length > 0 ? setlistKeys : [];
  
    return { songs, setlists, setlistOrder };
};

export default InitialStateRequest;
