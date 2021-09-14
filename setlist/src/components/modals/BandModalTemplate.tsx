import React, { ChangeEvent, useEffect, useState } from 'react'
import { DialogActions, DialogContent, DialogContentText, TextField } from '@material-ui/core'


import { ModalError } from 'models/error/modalError/modalError';
import { bandModalActions, ModalTypes } from 'models';
import { GetModalTypeByString, GUID_EMPTY, IsModalReadonly, mapQuery } from 'utils';
import { fetchBandById } from 'service';
import { BandModalHtmlAttributesConfiguration } from 'configuration/HtmlAttributesConfigs/bandHtmlAttributes';
import { ActionButton, UseModalStyles } from 'styles/modalStyles';
import { Band } from 'mapping';

interface IProps {
    bandModalActionsProvider: bandModalActions
    handleClose: () => void
    query: string
}

const htmlConfig = BandModalHtmlAttributesConfiguration;

const BandModalTemplate = ({ bandModalActionsProvider, handleClose, query }: IProps) => {

    const [title, setTitle] = useState<ModalError<string>>({ HasError: false, Message: '', Value: '' })
    const [isLoading, setLoading] = useState(false)

    const [type, setType] = useState<ModalTypes>(ModalTypes.None)
    const [id, setId] = useState(GUID_EMPTY)

    useEffect(() => {
        if (query) {
            const mapped = mapQueryRoute(query)

            setType(mapped.type)

            if (mapped.id) {
                setLoading(true)

                fetchBandById(mapped.id).then(result => {
                    setId(mapped.id)
                    setTitle({ HasError: false, Message: '', Value: result.Title })
                    setLoading(false)
                })
            }
        }
    }, [])

    const mapQueryRoute = (query: String) => {
        const args = mapQuery(query)
        const _type = GetModalTypeByString(args.get('type') ?? '')
        const _id = args.get('id') ?? ''

        return { type: _type, id: _id }
    }


    const handleOnClose = () => {
        setTitle({ HasError: false, Message: '', Value: '' })
        handleClose()
    }

    const OnChangeTitle = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        event.preventDefault()
        const value = event.target.value

        if (!value)
            setTitle({ HasError: true, Message: 'Please Enter a Name', Value: value })
        else
            setTitle({ HasError: false, Message: '', Value: value })

    }

    const handleSubmit = () => {

        setLoading(true)

        if (title.HasError === false) {
            const executeBandModalAction = bandModalActionsProvider[type]
            executeBandModalAction({
                value: {
                    ...Band.EmptyBand(),
                    Title: title.Value,
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
                    {`${type} Band`}
                </DialogContentText>
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
            </DialogContent>
            <DialogActions>
                <ActionButton onClick={handleSubmit}>{type}</ActionButton>
            </DialogActions>
        </div>
    )
}

export default BandModalTemplate

