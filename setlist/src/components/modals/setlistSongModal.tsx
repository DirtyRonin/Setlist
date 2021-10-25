import React, { useEffect, useState } from "react"

import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import { ActionButton, UseModalStyles } from "styles/modalStyles";

import { ModalTypes, setlistSongModalActions } from "models"
import { SetlistSong } from "mapping"
import { mapQuery, GetModalTypeByString } from "utils"
import { SetlistSongModalHtmlAttributesConfiguration } from "configuration/HtmlAttributesConfigs/setlistSongHtmlAttributes"
import { fetchSetlistSongById } from "service"

export interface ISetlistSongModalComponent {
    handleClose(): void
    setlistSongModalActionsProvider: setlistSongModalActions
    query: string
}

const SetlistSongModalComponent = (props: ISetlistSongModalComponent) => {

    const { query, handleClose, setlistSongModalActionsProvider } = props

    const [setlistSong, setSetlistSong] = useState(SetlistSong.CreateEmpty())
    const [isLoading, setLoading] = useState(false)
    const [type, setType] = useState<ModalTypes>(ModalTypes.None)

    // const [bandId, setBandId] = useState(0)
    const [songId, setSongId] = useState(0)
    const [setlistId, setSetlistId] = useState(0)

    useEffect(() => {
        if (query) {
            const mapped = mapQuery(query)

            setType(mapped.type)
            setSongId(mapped.songId)
            setSetlistId(mapped.setlistId)
            setLoading(true)

            if (mapped.songId > 0 && mapped.setlistId > 0) {
                fetchSetlistSongById(mapped.setlistId, mapped.songId).then(result => {
                    setSetlistSong(result)
                    setLoading(false)
                })
            }

        }
    }, [])

    const htmlConfig = SetlistSongModalHtmlAttributesConfiguration

    const handleOnClose = () => {
        setSetlistSong(SetlistSong.CreateEmpty())
        handleClose()
    }

    const handleSubmit = () => {

        setLoading(true)

        const executeModalAction = setlistSongModalActionsProvider[type]
        executeModalAction({
            value: {
                ...setlistSong,
                setlistId,
                songId
            }
        })
        handleOnClose()
    }

    const Class = UseModalStyles()
    return (
        <div className={Class.root}>
            <DialogContent>
                <DialogContentText>
                    {`${type} Band Song`}
                </DialogContentText>
                <TextField
                    fullWidth
                    disabled
                    margin="normal"
                    id={htmlConfig.Artist.ControlId}
                    value={setlistSong.song.artist}
                    placeholder={htmlConfig.Artist.Placeholder}
                    label={htmlConfig.Artist.Label}
                    type={'text'}
                />
                <TextField
                    fullWidth
                    disabled
                    margin="normal"
                    id={htmlConfig.Title.ControlId}
                    value={setlistSong.song.title}
                    placeholder={htmlConfig.Title.Placeholder}
                    label={htmlConfig.Title.Label}
                    type={'text'}
                />

                <TextField
                    fullWidth
                    disabled
                    margin="normal"
                    id={htmlConfig.Genre.ControlId}
                    value={setlistSong.song.genre}
                    placeholder={htmlConfig.Genre.Placeholder}
                    label={htmlConfig.Genre.Label}
                    type={'text'}
                />


            </DialogContent>
            <DialogActions>
                <ActionButton onClick={handleSubmit}>{type}</ActionButton>
            </DialogActions>
        </div>
    )
}

export default SetlistSongModalComponent