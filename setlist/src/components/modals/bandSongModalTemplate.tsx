import React, { ChangeEvent, useEffect, useState } from "react"

import { ModalTypes, bandSongModalActions } from "models";
import { BandSong } from "mapping";
import { mapQuery, GetModalTypeByString, IsModalReadonly, GUID_EMPTY } from "utils";
import { fetchBandSongById } from "service";
import { BandSongModalHtmlAttributesConfiguration } from "configuration/HtmlAttributesConfigs/bandSongHtmlAttributes";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import { ActionButton, UseModalStyles } from "styles/modalStyles";
import { ModalError } from "models/error/modalError/modalError";

export interface IBandSongModalComponent {
    handleClose(): void
    bandSongModalActionsProvider: bandSongModalActions
    query: string
}

const BandSongModalTemplate = (props: IBandSongModalComponent) => {

    const { query, handleClose, bandSongModalActionsProvider } = props

    const [bandSong, setBandSong] = useState(BandSong.CreateEmpty())
    const [isLoading, setLoading] = useState(false)
    const [type, setType] = useState<ModalTypes>(ModalTypes.None)
    const [bandId, setBandId] = useState(0)
    const [songId, setSongId] = useState(0)

    const [popularity, setPopularity] = useState<ModalError<number>>({ HasError: false, Message: '', Value: 0 })


    useEffect(() => {
        if (query) {
            const mapped = mapQuery(query)

            setType(mapped.type)
            setBandId(mapped.bandId)
            setSongId(mapped.songId)

            if (mapped.songId > 0 && mapped.bandId > 0) {
                setLoading(true)

                fetchBandSongById(mapped.bandId, mapped.songId).then(result => {
                    setBandSong(result)
                    setPopularity({ HasError: false, Message: '', Value: result.popularity })
                    setLoading(false)
                })
            }
        }
    }, [])

    const htmlConfig = BandSongModalHtmlAttributesConfiguration;

    const OnPopularityChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        event.preventDefault()
        const value = event.target.value
        const asNumber = Number.parseFloat(value)

        if (Number.isInteger(asNumber))
            setPopularity({ HasError: false, Message: '', Value: Number.parseInt(value) })
        else
            setPopularity({ HasError: true, Message: 'Invalid Value', Value: asNumber })

    }


    const handleOnClose = () => {
        setBandSong(BandSong.CreateEmpty())
        setPopularity({ HasError: false, Message: '', Value: 0 })
        handleClose()
    }

    const handleSubmit = () => {

        setLoading(true)

        if (!popularity.HasError) {
            const executeModalAction = bandSongModalActionsProvider[type]
            executeModalAction({
                value: {
                    ...bandSong,
                    popularity: popularity.Value,
                    bandId,
                    songId
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
                    {`${type} Band Song`}
                </DialogContentText>
                <TextField
                    autoFocus
                    fullWidth
                    disabled={IsReadonly}
                    margin="normal"
                    id={htmlConfig.Popularity.ControlId}
                    value={popularity.Value}
                    placeholder={htmlConfig.Popularity.Placeholder}
                    onChange={OnPopularityChange}
                    label={htmlConfig.Popularity.Label}
                    type={'number'}
                    helperText={popularity.Message ?? ''}
                />
                <TextField
                    fullWidth
                    disabled
                    margin="normal"
                    id={htmlConfig.Artist.ControlId}
                    value={bandSong.song.artist}
                    placeholder={htmlConfig.Artist.Placeholder}
                    label={htmlConfig.Artist.Label}
                    type={'text'}
                />
                <TextField
                    fullWidth
                    disabled
                    margin="normal"
                    id={htmlConfig.Title.ControlId}
                    value={bandSong.song.title}
                    placeholder={htmlConfig.Title.Placeholder}
                    label={htmlConfig.Title.Label}
                    type={'text'}
                />

                <TextField
                    fullWidth
                    disabled
                    margin="normal"
                    id={htmlConfig.Genre.ControlId}
                    value={bandSong.song.genre}
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

export default BandSongModalTemplate