import React, { ChangeEvent, useEffect, useState } from "react"

import { ModalTypes, songModalActions } from "models";
import { Song } from "mapping";
import { fetchSongById } from "service";
import { mapQuery } from "utils/routeQueryHelper";
import { GetModalTypeByString, GUID_EMPTY, IsModalReadonly } from "utils";
import { SongModalHtmlAttributesConfiguration } from "configuration/HtmlAttributesConfigs/songHtmlAttributes";
import { ActionButton, UseModalStyles } from "styles/modalStyles";
import TextField from "@material-ui/core/TextField";
import { ModalError } from "models/error/modalError/modalError";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

export interface ISongModalComponent {
    handleClose(): void
    songModalActionsProvider: songModalActions
    query: string
}

const SongModalTemplate = ({ query, handleClose, songModalActionsProvider }: ISongModalComponent) => {

    const [isLoading, setLoading] = useState(false)
    const [type, setType] = useState<ModalTypes>(ModalTypes.None)
    const [id, setId] = useState(0)

    const [artist, setArtist] = useState<ModalError<string>>({ HasError: false, Message: '', Value: '' })
    const [title, setTitle] = useState<ModalError<string>>({ HasError: false, Message: '', Value: '' })
    const [genre, setGenre] = useState<ModalError<string>>({ HasError: false, Message: '', Value: '' })

    useEffect(() => {
        if (query) {
            const mapped = mapQuery(query)

            setType(mapped.type)
            setId(mapped.id)


            if (mapped.id) {
                setLoading(true)

                fetchSongById(mapped.id).then(result => {
                    setArtist({ HasError: false, Message: '', Value: result.artist })
                    setTitle({ HasError: false, Message: '', Value: result.title })
                    setGenre({ HasError: false, Message: '', Value: result.genre })
                    setLoading(false)
                })
            }
        }
    }, [])

    const htmlConfig = SongModalHtmlAttributesConfiguration;
    const isStringInvalid = (value: string): boolean => !value

    const OnChangeTitle = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        event.preventDefault()
        const value = event.target.value

        const newValue = isStringInvalid(value) ?
            { HasError: true, Message: 'Please Enter a Title', Value: value } :
            { HasError: false, Message: '', Value: value }

        setTitle(newValue)
    }

    const OnChangeArtist = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        event.preventDefault()
        const value = event.target.value

        const newValue = isStringInvalid(value) ?
            { HasError: true, Message: 'Please Enter an Artist', Value: value } :
            { HasError: false, Message: '', Value: value }

        setArtist(newValue)
    }
    const OnChangeGenre = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        event.preventDefault()
        const value = event.target.value

        const newValue = isStringInvalid(value) ?
            { HasError: true, Message: 'Please Enter an Artist', Value: value } :
            { HasError: false, Message: '', Value: value }

        setGenre(newValue)
    }

    const handleOnClose = () => {
        setTitle({ HasError: false, Message: '', Value: '' })
        setArtist({ HasError: false, Message: '', Value: '' })
        setGenre({ HasError: false, Message: '', Value: '' })
        handleClose()
    }

    const handleSubmit = () => {

        setLoading(true)

        if (!title.HasError && !artist.HasError && !genre.HasError) {
            const executeModalAction = songModalActionsProvider[type]
            executeModalAction({
                value: {
                    ...Song.CreateEmpty(),
                    title: title.Value,
                    artist: artist.Value,
                    genre: genre.Value,
                    id: id
                }
            })
            handleOnClose()
        }
    }

    const IsReadonly = IsModalReadonly(type)
    const Class = UseModalStyles()

    return (
        <div className={Class.root}>
            <DialogContent>
                <DialogContentText>
                    {`${type} Song`}
                </DialogContentText>
                <TextField
                    fullWidth
                    disabled={IsReadonly}
                    margin="normal"
                    id={htmlConfig.Artist.ControlId}
                    value={artist.Value}
                    placeholder={htmlConfig.Artist.Placeholder}
                    onChange={OnChangeArtist}
                    label={htmlConfig.Artist.Label}
                    type={artist.HasError ? 'Error' : 'text'}
                    helperText={artist.Message ?? ''}
                />
                <TextField
                    autoFocus
                    fullWidth
                    disabled={IsReadonly}
                    margin="normal"
                    id={htmlConfig.Title.ControlId}
                    value={title.Value}
                    placeholder={htmlConfig.Title.Placeholder}
                    onChange={OnChangeTitle}
                    error={title.HasError}
                    label={htmlConfig.Title.Label}
                    type={title.HasError ? 'Error' : 'text'}
                    helperText={title.Message ?? ''}
                />
                <TextField
                    fullWidth
                    disabled={IsReadonly}
                    margin="normal"
                    id={htmlConfig.Genre.ControlId}
                    value={genre.Value}
                    placeholder={htmlConfig.Genre.Placeholder}
                    onChange={OnChangeGenre}
                    label={htmlConfig.Genre.Label}
                    type={genre.HasError ? 'Error' : 'text'}
                    helperText={genre.Message ?? ''}
                />
            </DialogContent>
            <DialogActions>
                <ActionButton onClick={handleSubmit}>{type}</ActionButton>
            </DialogActions>
        </div>
    )
}

export default SongModalTemplate