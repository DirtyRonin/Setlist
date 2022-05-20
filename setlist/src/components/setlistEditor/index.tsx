import React, { useEffect, useState } from 'react';
import { ICustomEvent, ISetlistSong, ISnackbarActionProps, ModalTypes } from 'models';
import DataTable from "react-data-table-component";
import api from 'api/baseApi';
import { AddSongToSetlistRequestAsync } from "api/setlistSongApi"
import { mapQuery } from 'utils/routeQueryHelper';
import setlistEditorNode, { EditorSong } from 'components/nodes/setlistEditorNode';
import { fetchingFailed } from 'store/epics/catalogEpics/snackbarHelper';

interface IProps {
    handleClose(): void
    query: string
    pushToSnackbar: (props: ISnackbarActionProps) => void
}

type SetlistEditor = {
    events: ICustomEvent[]
    songs: EditorSong[]
}

const SetlistEditor = ({ query, handleClose, pushToSnackbar }: IProps): JSX.Element => {


    const [isLoading, setLoading] = useState(true);
    const [type, setType] = useState<ModalTypes>(ModalTypes.None)
    const [id, setId] = useState(0)

    const [songs, setSongs] = useState<EditorSong[]>([]);
    const [events, setEvents] = useState<ICustomEvent[]>([]);

    useEffect(() => {
        if (query) {
            const mapped = mapQuery(query)

            setId(mapped.customEventId) // customEventId

            if (mapped.customEventId) {
                setLoading(true)

                api().get<SetlistEditor>(`api/setlistsongsEditor/${mapped.customEventId}`).then(
                    result => {
                        const { songs, events } = result.data
                        if (songs)
                            setSongs(Object.values(songs))
                        if (events)
                            setEvents(events)

                    }
                )
                    .catch(error => fetchingFailed)
                    .finally(() => setLoading(false))
            }
        }
    }, [])



    const asyncExecute = async (setlistSong: ISetlistSong): Promise<boolean> => {
        const result = await AddSongToSetlistRequestAsync(setlistSong)

        if (result) {
            const newSongs = [...songs];
            const newSong = newSongs.find(x => x.id === setlistSong.songId)
            if (newSong) {
                newSong.setlists.push(setlistSong.setlistId)
                setSongs(newSongs)
            }


        }
        return result;
    }

    return <div>
        <DataTable
            title="Movie List - Custom Cells"
            columns={setlistEditorNode({ events, setlistId: id, songs, asyncExecute, pushToSnackbar })}
            data={songs}
            pagination
            progressPending={isLoading}
            noDataComponent='No Prior Setlist'
        />
    </div>
}



export default SetlistEditor;