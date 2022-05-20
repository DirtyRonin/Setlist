import React from 'react';
import { TableColumn } from "react-data-table-component";
import { cloneDeep } from "lodash"

import { SetlistSong } from 'mapping/setlistSong';
import { Song } from 'mapping/song';

import { ICustomEvent, ISetlistSong, ISnackbarActionProps, ISong } from "models";
import AsyncButtonComponent from 'components/common/asyncButton';
import {CREATING_COMPLETED,CREATING_FAILED} from "store/epics/catalogEpics/snackbarHelper"


export type EditorSong = Omit<ISong, 'setlists'> & {
    setlists: number[]
}


const setlistEditorNode = (
    { events, setlistId, songs, asyncExecute ,pushToSnackbar}:
        { events: ICustomEvent[]; setlistId: number; songs: EditorSong[]; asyncExecute: (setlistSong: ISetlistSong) => Promise<boolean>; pushToSnackbar: (pushToSnackbar: ISnackbarActionProps) => void }
): TableColumn<EditorSong>[] => {

    const IsSetlistSongExisting = (item: EditorSong): boolean => {
        const result = songs.find(x => x.id === item.id)?.setlists.includes(setlistId) ?? false
        return result;
    }

    const clonedEvents = cloneDeep(events);
    const currentEvent = clonedEvents.pop()


    let columns: TableColumn<EditorSong>[] = []

    columns.push(
        {
            name: 'Artist',
            selector: row => row.artist,
            sortable: true,
            wrap: true,
            compact: true
        },
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
            wrap: true,
            compact: true
        }
    )

    clonedEvents.forEach(event => columns.push(getAsEventColumn(event)))

    columns.push(
        {
            name: 'Current Setlist',
            button: true,
            cell: (item) => <AsyncButtonComponent asyncExecute={asyncExecute} value={CreateNewSetlistSong({ song: item, setlistId })} isExisting={IsSetlistSongExisting(item)} pushToSnackbar={pushToSnackbar} successMessage={CREATING_COMPLETED} errorMessage={CREATING_FAILED} />,
        }
    )

    if (currentEvent)
        columns.push(getAsEventColumn(currentEvent))

    return columns

    // return [
    //     {
    //         name: 'Artist',
    //         selector: row => row.artist,
    //         sortable: true
    //     },
    //     {
    //         name: 'Title',
    //         selector: row => row.title,
    //         sortable: true,
    //     },

    //     getAsEventColumn(events[0]),
    //     getAsEventColumn(events[1]),
    //     {
    //         name: 'Add Song',
    //         button: true,
    //         cell: (item) => <AsyncButtonComponent asyncExecute={asyncExecute} value={CreateNewSetlistSong({ song: item, setlistId })} isExisting={IsSetlistSongExisting(item)} />,
    //     },
    // ];
}

const getAsEventColumn = (event: ICustomEvent): TableColumn<EditorSong> => ({
    name: event ? formatDate(event.date) : '',
    selector: row => row.setlists.includes(event?.setlist.id) ? 'X' : 'O',
    sortable: true,
    center: true,
    omit: event === undefined ? true : false, // hide column 
    conditionalCellStyles: [
        {
            when: row => row.setlists.includes(event?.setlist.id),
            style: {
                backgroundColor: 'rgba(63, 195, 128, 0.9)',
                color: 'white',
                '&:hover': {
                    cursor: 'pointer',
                },
            },
        },
    ],
    allowOverflow: true
})

const formatDate = (date: Date | string): string =>
    new Date(date).toLocaleString('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit' })



const CreateNewSetlistSong = ({ song, setlistId }: { song: EditorSong; setlistId: number; }): ISetlistSong =>
    SetlistSong.Create({
        songId: song.id,
        song: Song.CreateEmpty(),
        setlistId: setlistId,
        bandSongId: undefined
    });


export default setlistEditorNode