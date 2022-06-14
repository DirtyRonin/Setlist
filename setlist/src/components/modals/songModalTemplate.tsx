import React, { ChangeEvent, useEffect, useState } from "react"

import { ISnackbarActionProps, ModalTypes, songModalActions } from "models";
import { Song } from "mapping";
import { fetchSongById } from "service";
import { mapQuery } from "utils/routeQueryHelper";
import { GetModalTypeByString, GUID_EMPTY, IsModalDisabled } from "utils";
import { SongModalHtmlAttributesConfiguration } from "configuration/HtmlAttributesConfigs/songHtmlAttributes";
import { ActionButton, UseModalStyles } from "styles/modalStyles";
import TextField from "@material-ui/core/TextField";
import { ModalError } from "models/error/modalError/modalError";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import { IUserInfo } from "store/auth/types";
import { NO_ADMIN_RIGHTS } from "store/epics/catalogEpics/snackbarHelper"

export interface ISongModalComponent {
    handleClose(): void
    songModalActionsProvider: songModalActions
    query: string
    user: IUserInfo
    pushToSnackbar: (props: ISnackbarActionProps) => void
}

const SongModalTemplate = ({ query, handleClose, songModalActionsProvider, user, pushToSnackbar }: ISongModalComponent) => {

    const [isLoading, setLoading] = useState(false)
    const [type, setType] = useState<ModalTypes>(ModalTypes.None)
    const [id, setId] = useState(0)

    const [artist, setArtist] = useState<ModalError<string>>({ HasError: false, Message: '', Value: '' })
    const [title, setTitle] = useState<ModalError<string>>({ HasError: false, Message: '', Value: '' })
    const [genre, setGenre] = useState<ModalError<string>>({ HasError: false, Message: '', Value: '' })
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
                    setGenre({ HasError: false, Message: '', Value: result.genre })
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
        const value = event.target.value

        const newValue = isStringInvalid(value) ?
            { HasError: true, Message: 'Please Enter a Genre', Value: value } :
            { HasError: false, Message: '', Value: value }

        setGenre(newValue)
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
        setGenre({ HasError: false, Message: '', Value: '' })
        setEvergreen(false)
        setNineties(false)
        setOriginalKey('')
        setComment('')
        handleClose()
    }

    const handleSubmit = () => {

        if (type !== ModalTypes.Read && !IsAuthorized) {
            pushToSnackbar({ message: NO_ADMIN_RIGHTS, severity: "error" })
            return
        }

        let hasError = false

        if (isStringInvalid(artist.Value)) {
            setArtist({ HasError: true, Message: 'Please Enter an Artist', Value: artist.Value })
            hasError = true
        }
        if (isStringInvalid(title.Value)) {
            setTitle({ HasError: true, Message: 'Please Enter a Title', Value: title.Value })
            hasError = true
        }
        if (isStringInvalid(genre.Value)) {
            setGenre({ HasError: true, Message: 'Please Enter a Genre', Value: genre.Value })
            hasError = true
        }

        if (hasError)
            return

        setLoading(true)

        const executeModalAction = songModalActionsProvider[type]
        executeModalAction({
            value: {
                ...Song.CreateEmpty(),
                title: title.Value,
                artist: artist.Value,
                genre: genre.Value,
                nineties: isNineties,
                evergreen: isEvergreen,
                comment,
                originalKey,
                id: id
            }
        })
        handleOnClose()
    }



    const isDisabled = IsModalDisabled(type)
    const IsAuthorized = user.isAdmin
    const Class = UseModalStyles()

    return (
        <div className={Class.root}>
            <DialogContent>
                <DialogContentText>
                    {`${type} Song`}
                </DialogContentText>
                <TextField
                    autoFocus
                    fullWidth
                    disabled={isDisabled}
                    margin="normal"
                    id={htmlConfig.Artist.ControlId}
                    value={artist.Value}
                    placeholder={htmlConfig.Artist.Placeholder}
                    onChange={OnChangeArtist}
                    label={htmlConfig.Artist.Label}
                    error={artist.HasError}
                    // type={artist.HasError ? 'Error' : 'text'}
                    helperText={artist.Message ?? ''}
                />
                <TextField
                    fullWidth
                    disabled={isDisabled}
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
                    disabled={isDisabled}
                    margin="normal"
                    id={htmlConfig.Genre.ControlId}
                    value={genre.Value}
                    placeholder={htmlConfig.Genre.Placeholder}
                    onChange={OnChangeGenre}
                    error={genre.HasError}
                    label={htmlConfig.Genre.Label}
                    type={genre.HasError ? 'Error' : 'text'}
                    helperText={genre.Message ?? ''}
                />

                <TextField
                    autoFocus
                    fullWidth
                    disabled={isDisabled}
                    margin="normal"
                    id={htmlConfig.OriginalKey.ControlId}
                    value={originalKey}
                    placeholder={htmlConfig.OriginalKey.Placeholder}
                    onChange={OnChangeOriginalKey}
                    label={htmlConfig.OriginalKey.Label}
                />
                <TextField
                    fullWidth
                    disabled={isDisabled}
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
                            disabled={isDisabled}
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
                            disabled={isDisabled}
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