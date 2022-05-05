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
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

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
    const [genre, setGenre] = useState('')
    const [isEvergreen, setEvergreen] = useState(false)
    const [isNineties, setNineties] = useState(false)
    const [originalKey, setOriginalKey] = useState('')
    const [comment, setComment] = useState('')

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
                    setGenre(result.genre)
                    setEvergreen(result.evergreen)
                    setNineties(result.nineties)
                    setOriginalKey(result.originalKey)
                    setComment(result.comment)
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
        setGenre(event.target.value)
    }
    const OnChangeOriginalKey = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        event.preventDefault()
        setOriginalKey(event.target.value)
    }
    const OnChangeComment = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        event.preventDefault()
        setComment(event.target.value)
    }
    const OnChangeEvergreen = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
        setEvergreen(checked)
    }
    const OnChangeNineties = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
        setNineties(checked)
    }

    const handleOnClose = () => {
        setTitle({ HasError: false, Message: '', Value: '' })
        setArtist({ HasError: false, Message: '', Value: '' })
        setGenre('')
        setEvergreen(false)
        setNineties(false)
        setOriginalKey('')
        setComment('')
        handleClose()
    }

    const handleSubmit = () => {

        setLoading(true)

        if (!title.HasError && !artist.HasError) {
            const executeModalAction = songModalActionsProvider[type]
            executeModalAction({
                value: {
                    ...Song.CreateEmpty(),
                    title: title.Value,
                    artist: artist.Value,
                    genre,
                    nineties: isNineties,
                    evergreen: isEvergreen,
                    comment,
                    originalKey,
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
                    value={genre}
                    placeholder={htmlConfig.Genre.Placeholder}
                    onChange={OnChangeGenre}
                    label={htmlConfig.Genre.Label}
                />

                <TextField
                    autoFocus
                    fullWidth
                    disabled={IsReadonly}
                    margin="normal"
                    id={htmlConfig.OriginalKey.ControlId}
                    value={originalKey}
                    placeholder={htmlConfig.OriginalKey.Placeholder}
                    onChange={OnChangeOriginalKey}
                    label={htmlConfig.OriginalKey.Label}
                />
                <TextField
                    fullWidth
                    disabled={IsReadonly}
                    margin="normal"
                    id={htmlConfig.Comment.ControlId}
                    value={comment}
                    placeholder={htmlConfig.Comment.Placeholder}
                    onChange={OnChangeComment}
                    label={htmlConfig.Comment.Label}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            disabled={IsReadonly}
                            id={htmlConfig.Evergreen.ControlId}
                            checked={isEvergreen}
                            onChange={OnChangeEvergreen}
                        />
                    }
                    label={htmlConfig.Evergreen.Label}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            disabled={IsReadonly}
                            id={htmlConfig.Nineties.ControlId}
                            checked={isNineties}
                            onChange={OnChangeNineties}
                        />
                    }
                    label={htmlConfig.Nineties.Label}
                />

            </DialogContent>
            <DialogActions>
                <ActionButton onClick={handleSubmit}>{type}</ActionButton>
            </DialogActions>
        </div>
    )
}

export default SongModalTemplate