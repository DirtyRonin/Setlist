import React, { ChangeEvent, useEffect, useState } from 'react'
import { DialogActions, DialogContent, DialogContentText, TextField } from '@material-ui/core'


import { ModalError } from 'models/error/modalError/modalError';
import { locationModalActions, ModalTypes } from 'models';
import { GetModalTypeByString, GUID_EMPTY, IsModalReadonly, mapQuery } from 'utils';
import { fetchLocationById } from 'service';
import { LocationModalHtmlAttributesConfiguration } from 'configuration/HtmlAttributesConfigs/locationHtmlAttributes';
import { AcitonButton, UseModalStyles } from 'styles/modalStyles';

interface IProps {
    locationModalActionsProvider: locationModalActions
    handleClose: () => void
    query: string
}

const htmlConfig = LocationModalHtmlAttributesConfiguration;

const LocationModalTemplate = ({ locationModalActionsProvider, handleClose, query }: IProps) => {

    const [name, setName] = useState<ModalError<string>>({ HasError: false, Message: '', Value: '' })
    const [address, setAddress] = useState<ModalError<string>>({ HasError: false, Message: '', Value: '' })
    const [isLoading, setLoading] = useState(false)

    const [type, setType] = useState<ModalTypes>(ModalTypes.None)
    const [id, setId] = useState(GUID_EMPTY)

    useEffect(() => {
        if (query) {
            const mapped = mapQueryRoute(query)

            setType(mapped.type)

            if (mapped.id) {
                setLoading(true)

                fetchLocationById(mapped.id).then(result => {
                    setId(mapped.id)
                    setName({ HasError: false, Message: '', Value: result.Name })
                    setAddress({ HasError: false, Message: '', Value: result.Address })
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
        setName({ HasError: false, Message: '', Value: '' })
        setAddress({ HasError: false, Message: '', Value: '' })
        handleClose()
    }

    const isNameInvalid = (value: string): boolean => !value
    const isAddressInvalid = (value: string): boolean => !value

    const OnChangeName = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        event.preventDefault()
        const value = event.target.value

        if (isNameInvalid(value))
            setName({ HasError: true, Message: 'Please Enter a Name', Value: value })
        else
            setName({ HasError: false, Message: '', Value: value })

    }

    const OnChangeAddress = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        event.preventDefault()
        const value = event.target.value

        if (isAddressInvalid(value))
            setAddress({ HasError: true, Message: 'Please Enter a Name', Value: '' })
        else
            setAddress({ HasError: false, Message: '', Value: value })
    }

    const handleSubmit = () => {

        setLoading(true)

        if (name.HasError === false && address.HasError === false) {
            const executeLocationModalAction = locationModalActionsProvider[type]
            executeLocationModalAction({
                value: {
                    Name: name.Value,
                    Address: address.Value,
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
                    {`${type} Location`}
                </DialogContentText>
                <TextField
                    autoFocus
                    fullWidth
                    disabled={IsReadonly}
                    margin="normal"
                    id={htmlConfig.Name.ControlId}
                    value={name.Value}
                    placeholder={htmlConfig.Name.Placeholder}
                    onChange={OnChangeName}
                    error={name.HasError}
                    label={htmlConfig.Name.Label}
                    type={name.HasError ? 'Error' : 'text'}
                    helperText={name.Message ?? ''}
                />
                <TextField
                    fullWidth
                    disabled={IsReadonly}
                    margin="normal"
                    id={htmlConfig.Address.ControlId}
                    value={address.Value}
                    placeholder={htmlConfig.Address.Placeholder}
                    onChange={OnChangeAddress}
                    label={htmlConfig.Address.Label}
                    type={address.HasError ? 'Error' : 'text'}
                    helperText={address.Message ?? ''}
                />
            </DialogContent>
            <DialogActions>
                <AcitonButton onClick={handleSubmit}>{type}</AcitonButton>
            </DialogActions>
        </div>
    )
}

export default LocationModalTemplate

