import React, { ChangeEvent, useEffect, useState } from "react"

import { ModalTypes, bandSongModalActions } from "models";
import { BandSong } from "mapping";
import { mapQuery, GetModalTypeByString, IsModalReadonly, GUID_EMPTY } from "utils";
import { fetchBandSongById } from "service";
import { BandSongModalHtmlAttributesConfiguration } from "configuration/HtmlAttributesConfigs/bandSongHtmlAttributes";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import { ActionButton, UseModalStyles } from "styles/modalStyles";
import DialogActions from "@material-ui/core/DialogActions";
import { ModalError } from "models/error/modalError/modalError";

export interface IBandSongModalComponent {
    handleClose(): void
    bandSongModalActionsProvider: bandSongModalActions
    query: string
}

const BandSongModalTemplate = (props: IBandSongModalComponent) => {

    const { query, handleClose, bandSongModalActionsProvider } = props

    const [bandSong, setBandSong] = useState(BandSong.EmptyBandSong())
    const [isLoading, setLoading] = useState(false)
    const [type, setType] = useState<ModalTypes>(ModalTypes.None)
    const [id, setId] = useState(GUID_EMPTY)

    const [popularity, setPopularity] = useState<ModalError<number>>({ HasError: false, Message: '', Value: 0 })


    useEffect(() => {
        if (query) {
            const mapped = mapQueryRoute(query)

            setType(mapped.type)
            setId(mapped.id)

            if (mapped.id) {
                setLoading(true)

                fetchBandSongById(mapped.id).then(result => {
                    setBandSong(result)
                    setPopularity({ HasError: false, Message: '', Value: result.Popularity })
                    setLoading(false)
                })
            }
        }
    }, [])

    //query: "?$type=Read&$id=80968fa2-312c-469f-9115-619d2fef06d5"

    const mapQueryRoute = (query: String) => {
        const args = mapQuery(query)
        const _type = GetModalTypeByString(args.get('type') ?? '')
        const _id = args.get('id') ?? ''

        return { type: _type, id: _id }
    }

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
        setBandSong(BandSong.EmptyBandSong())
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
                    Popularity: popularity.Value,
                    Id: id
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
                    value={popularity.Value }
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
                    value={bandSong.Song.Artist}
                    placeholder={htmlConfig.Artist.Placeholder}
                    label={htmlConfig.Artist.Label}
                    type={'text'}
                />
                <TextField
                    fullWidth
                    disabled
                    margin="normal"
                    id={htmlConfig.Title.ControlId}
                    value={bandSong.Song.Title}
                    placeholder={htmlConfig.Title.Placeholder}
                    label={htmlConfig.Title.Label}
                    type={'text'}
                />

                <TextField
                    fullWidth
                    disabled
                    margin="normal"
                    id={htmlConfig.Genre.ControlId}
                    value={bandSong.Song.Genre}
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