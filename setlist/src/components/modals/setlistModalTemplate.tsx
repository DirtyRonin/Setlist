import React, { ChangeEvent, useEffect, useState } from 'react'
import { DialogActions, DialogContent, DialogContentText, TextField } from '@material-ui/core'


import { InputWrapper } from 'models/error/modalError/modalError';
import { setlistModalActions, ModalTypes } from 'models';
import { GetModalTypeByString, GUID_EMPTY, IsModalDisabled, mapQuery } from 'utils';
import { fetchSetlistById } from 'service';
import { SetlistModalHtmlAttributesConfiguration } from 'configuration/HtmlAttributesConfigs/setlistHtmlAttributes';
import { ActionButton, UseModalStyles } from 'styles/modalStyles';
import { Setlist } from 'mapping';

interface IProps {
    setlistModalActionsProvider: setlistModalActions
    handleClose: () => void
    query: string
}

const htmlConfig = SetlistModalHtmlAttributesConfiguration;

const SetlistModalTemplate = ({ setlistModalActionsProvider, handleClose, query }: IProps) => {

    const [title, setTitle] = useState<InputWrapper<string>>({ HasError: false, Message: '', Value: '' })
    const [comment, setComment] = useState<InputWrapper<string>>({ HasError: false, Message: '', Value: '' })
    const [isLoading, setLoading] = useState(false)

    const [type, setType] = useState<ModalTypes>(ModalTypes.None)
    const [id, setId] = useState(0)

    useEffect(() => {
        if (query) {
            const mapped = mapQuery(query)

            setType(mapped.type)

            if (mapped.id) {
                setLoading(true)

                fetchSetlistById(mapped.id).then(result => {
                    setId(mapped.id)
                    setTitle({ HasError: false, Message: '', Value: result.title })
                    setComment({ HasError: false, Message: '', Value: result.comment })
                    setLoading(false)
                })
            }
        }
    }, [])

    const handleOnClose = () => {
        setTitle({ HasError: false, Message: '', Value: '' })
        setComment({ HasError: false, Message: '', Value: '' })
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

    const OnChangeComment = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        event.preventDefault()
        const value = event.target.value

        if (!value)
            setComment({ HasError: true, Message: 'Please Enter a Name', Value: '' })
        else
            setComment({ HasError: false, Message: '', Value: value })
    }

    const handleSubmit = () => {

        setLoading(true)

        if (title.HasError === false && comment.HasError === false) {
            const executeSetlistModalAction = setlistModalActionsProvider[type]
            executeSetlistModalAction({
                value: {
                    ...Setlist.CreateEmpty(),
                    title: title.Value,
                    comment: comment.Value,
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
                    {`${type} Setlist`}
                </DialogContentText>
                <TextField
                    fullWidth
                    disabled={IsReadonly}
                    margin="normal"
                    id={htmlConfig.Comment.ControlId}
                    value={comment.Value}
                    placeholder={htmlConfig.Comment.Placeholder}
                    onChange={OnChangeComment}
                    label={htmlConfig.Comment.Label}
                    type={comment.HasError ? 'Error' : 'text'}
                    helperText={comment.Message ?? ''}
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
            </DialogContent>

            <DialogActions>
                <ActionButton onClick={handleSubmit}>{type}</ActionButton>
            </DialogActions>
        </div>
    )
}

export default SetlistModalTemplate

