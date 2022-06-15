import React, { ChangeEvent, useEffect, useState } from "react"
import { TextField } from "@material-ui/core";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

import { ModalTypes, ICustomEvent, customEventModalActions, ISnackbarActionProps } from "models";
import { CustomEvent } from "mapping";
import { mapQuery } from "utils/routeQueryHelper";
import { IsModalDisabled } from "utils";
import { CustomEventModalHtmlAttributesConfiguration } from "configuration/HtmlAttributesConfigs/customEventHtmlAttributes";

import WrapDateTimePicker from "components/common/dateTimePicker/dateTimePicker";
import AsyncLocationSelect from "components/common/asyncSelect/asyncLocationSelect";
import AsyncBandSelect from "components/common/asyncSelect/asyncBandSelect";
import { ActionButton, UseModalStyles } from "styles/modalStyles";
import { fetchCustomEventById } from "service";
import { IUserInfo } from "store/auth/types";
import { NO_ADMIN_RIGHTS } from "store/epics/catalogEpics/snackbarHelper"
import { InputWrapper } from "models/error/modalError/modalError";

interface IProps {
    handleClose(): void
    customEventModalActionsProvider: customEventModalActions
    query: string
    user: IUserInfo
    pushToSnackbar: (props: ISnackbarActionProps) => void
}

const INSERT_TITLE = 'Please insert a Title'
const UNFETCHED_CONCERT = 'Could not fetch the concert'

const CustomEventModalTemplate = (props: IProps) => {

    const defaultModalError: InputWrapper<string> = { HasError: false, Message: '', Value: '' }
    const modalErrorMessage = (message: string): InputWrapper<string> => ({ ...defaultModalError, HasError: true, Message: message })

    const { query, handleClose, customEventModalActionsProvider, user, pushToSnackbar } = props

    const [isLoading, setIsLoading] = useState(false)
    const [type, setType] = useState<ModalTypes>(ModalTypes.None)
    const [id, setId] = useState(0)

    const [title, setTitle] = useState<InputWrapper<string>>(defaultModalError)
    const [date, setDate] = useState(new Date());
    const [locationId, setLocationId] = useState(0);
    const [bandId, setBandId] = useState(0);

    useEffect(() => {

        if (!query) {
            setTitle(modalErrorMessage(INSERT_TITLE))
            return
        }

        const mapped = mapQuery(query)

        setType(mapped.type)
        setId(mapped.customEventId)

        if(!mapped.customEventId){
            setTitle(modalErrorMessage(INSERT_TITLE))
            return
        }

        if (mapped.customEventId > 0) {

            setIsLoading(true)

            fetchCustomEventById(mapped.customEventId).then(result => {
                setTitle({ HasError: false, Message: '', Value: result.title })
                setDate(result.date)
                setLocationId(result.locationId)
                setBandId(result.bandId)

                setIsLoading(false)
            }).catch(
                error => {
                    setTitle(modalErrorMessage(UNFETCHED_CONCERT))
                    setIsLoading(false)
                }
            )
        }
    }, [])

    const htmlConfig = CustomEventModalHtmlAttributesConfiguration;

    const handleOnClick = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!locationId || !bandId || title.HasError)
            return

        const _customEvent = GetCustomEventForModalType(type)

        const executeCustomEventModalAction = customEventModalActionsProvider[type]

        executeCustomEventModalAction({ value: _customEvent })

        if (type !== "New")
            handleClose()
    };

    const GetCustomEventForModalType = (type: ModalTypes) => {
        const _customEvent: ICustomEvent = {
            ...CustomEvent.CreateEmpty(),
            id: id,
            date: date,
            title: title.Value,
            locationId: locationId,
            bandId: bandId,
        }

        if (type !== "New") {
            _customEvent.id = id
        }

        return _customEvent;
    }

    const isStringInvalid = (value: string): boolean => !value

    const OnChangeTitle = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        event.preventDefault()
        const value = event.target.value

        const newValue = isStringInvalid(value)
            ? { ...modalErrorMessage(INSERT_TITLE), Value: value }
            : { ...defaultModalError, Value: value }

        setTitle(newValue)
    }

    const handleDateChange = (value: MaterialUiPickersDate) => {
        if (value)
            setDate(value)
    };

    const IsReadonly = IsModalDisabled(type)
    const IsAuthorized = user.isAdmin
    const Class = UseModalStyles()

    return (<>
        {!isLoading && <form className={Class.root} noValidate autoComplete="off" onSubmit={handleOnClick} method="GET">
            {/* <TextField disabled={IsReadonly} id={htmlConfig.Title.ControlId} label={htmlConfig.Title.Label} defaultValue={title} /> */}
            <TextField
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
            < AsyncBandSelect
                isReadonly={IsReadonly}
                defaultBandId={bandId}
                setBandId={setBandId}
            />
            < AsyncLocationSelect
                isReadonly={IsReadonly}
                defaultLocationId={locationId}
                setLocationId={setLocationId}
            />
            <WrapDateTimePicker
                date={date}
                isReadonly={IsReadonly}
                htmlConfig={htmlConfig.Date}
                handleDateChange={handleDateChange}
            />
            <ActionButton type="submit">{type}</ActionButton>
        </form>
        }
    </>
    )
}

export default CustomEventModalTemplate