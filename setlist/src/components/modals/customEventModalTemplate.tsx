import React, { useEffect, useState } from "react"
import { createStyles, makeStyles, TextField, Theme } from "@material-ui/core";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

import { ModalTypes, ICustomEvent, customEventModalActions } from "models";
import { CustomEvent } from "mapping";
import { mapQuery } from "utils/routeQueryHelper";
import { GetModalTypeByString, GUID_EMPTY, IsModalReadonly } from "utils";
import { CustomEventModalHtmlAttributesConfiguration } from "configuration/HtmlAttributesConfigs/customEventHtmlAttributes";

import WrapDateTimePicker from "components/common/dateTimePicker/dateTimePicker";
import AsyncLocationSelect from "components/common/asyncSelect/asyncLocationSelect";
import { fetchCustomEventById } from "service";
import AsyncSetlistSelect from "components/common/asyncSelect/asyncSetlistSelect";
import AsyncBandSelect from "components/common/asyncSelect/asyncBandSelect";
import { ActionButton, UseModalStyles } from "styles/modalStyles";

interface IProps {
    handleClose(): void
    customEventModalActionsProvider: customEventModalActions
    query: string
}

const CustomEventModalTemplate = (props: IProps) => {

    const { query, handleClose, customEventModalActionsProvider } = props

    const [isLoading, setIsLoading] = useState(false)
    const [type, setType] = useState<ModalTypes>(ModalTypes.None)
    const [id, setId] = useState(0)

    const [title, setTitle] = useState('')
    const [date, setDate] = useState<Date | null>(null);
    const [locationId, setLocationId] = useState(0);
    const [setlistId, setSetlistId] = useState(0);
    const [bandId, setBandId] = useState(0);

    useEffect(() => {
        if (query) {
            const mapped = mapQuery(query)

            setType(mapped.type)
            setId(mapped.id)
            
            if (mapped.id > 0) {

                setIsLoading(true)

                fetchCustomEventById(mapped.id).then(result => {
                    setTitle(result.title)
                    setDate(result.date)
                    setLocationId(result.locationId)
                    setSetlistId(result.setlistId)
                    setBandId(result.bandId)

                    setIsLoading(false)
                })
            }
        }
    }, [])

    const htmlConfig = CustomEventModalHtmlAttributesConfiguration;

    const handleOnClick = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const elements: any = (event.target as any).elements;

        const _customEvent = GetCustomEventForModalType(type, elements)



        const executeCustomEventModalAction = customEventModalActionsProvider[type]

        executeCustomEventModalAction({ value: _customEvent })

        if (type !== "New")
            handleClose()
    };

    const GetCustomEventForModalType = (type: ModalTypes, elements: any) => {
        const _customEvent: ICustomEvent = {
            ...CustomEvent.CreateEmpty(),
            id: id,
            date: date,
            title: elements[htmlConfig.Title.ControlId].value,
            setlistId: setlistId,
            locationId: locationId,
            bandId: bandId,
        }

        if (type !== "New") {
            _customEvent.id = id
        }

        return _customEvent;
    }

    const handleDateChange = (value: MaterialUiPickersDate) => {
        setDate(value)
    };

    const IsReadonly = IsModalReadonly(type)

    const Class = UseModalStyles()

    return (<div>
        {!isLoading && <form className={Class.root} noValidate autoComplete="off" onSubmit={handleOnClick} method="GET">
            <TextField disabled={IsReadonly} id={htmlConfig.Title.ControlId} label={htmlConfig.Title.Label} defaultValue={title} />
            <WrapDateTimePicker
                date={date}
                isReadonly={IsReadonly}
                htmlConfig={htmlConfig.Date}
                handleDateChange={handleDateChange}
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
            < AsyncSetlistSelect
                isReadonly={IsReadonly}
                defaultSetlistId={setlistId}
                setSetlistId={setSetlistId}
            />
            <ActionButton type="submit">{type}</ActionButton>
        </form>
        }
    </div>
    )
}

export default CustomEventModalTemplate