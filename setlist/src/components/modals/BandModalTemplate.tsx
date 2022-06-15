import React, { ChangeEvent, useEffect, useState } from 'react'
import { DialogActions, DialogContent, DialogContentText, TextField } from '@material-ui/core'


import { InputWrapper } from 'models/error/modalError/modalError';
import { bandModalActions, ModalTypes } from 'models';
import { GetModalTypeByString, GUID_EMPTY, IsModalDisabled, mapQuery } from 'utils';
import { BandModalHtmlAttributesConfiguration } from 'configuration/HtmlAttributesConfigs/bandHtmlAttributes';
import { ActionButton, UseModalStyles } from 'styles/modalStyles';
import { Band } from 'mapping';
import { fetchBandById } from 'service/epicServices/bandCatalogService';

interface IProps {
    bandModalActionsProvider: bandModalActions
    handleClose: () => void
    query: string
}

const htmlConfig = BandModalHtmlAttributesConfiguration;

const BandModalTemplate = ({ bandModalActionsProvider, handleClose, query }: IProps) => {

    const [title, setTitle] = useState<InputWrapper<string>>({ HasError: false, Message: '', Value: '' })
    const [isLoading, setLoading] = useState(false)

    const [type, setType] = useState<ModalTypes>(ModalTypes.None)
    const [id, setId] = useState(GUID_EMPTY)

    useEffect(() => {
        if (query) {
            const mapped = mapQuery(query)

            setType(mapped.type)

            if (mapped.id) {
                setLoading(true)

                fetchBandById(mapped.id).then(result => {
                    setId(mapped.id)
                    setTitle({ HasError: false, Message: '', Value: result.title })
                    setLoading(false)
                })
            }
        }
    }, [])

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
                    ...Band.CreateEmpty(),
                    title: title.Value,
                    id: id
                }
            })
            handleOnClose()
        }
    }

    const IsReadonly = IsModalDisabled(type)
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

