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
    const [id, setId] = useState('')

    const [title, setTitle] = useState('')
    const [date, setDate] = useState<Date | null>(null);
    const [locationId, setLocationId] = useState<string | null>(null);
    const [setlistId, setSetlistId] = useState<string | null>(null);
    const [bandId, setBandId] = useState<string | null>(null);

    useEffect(() => {
        if (query) {
            const mapped = mapQueryRoute(query)

            setType(mapped.type)
            setId(mapped.id)

            if (mapped.id != GUID_EMPTY) {

                setIsLoading(true)

                fetchCustomEventById(mapped.id).then(result => {
                    setTitle(result.Title)
                    setDate(result.Date)
                    setLocationId(result.LocationId)
                    setSetlistId(result.SetlistId)
                    setBandId(result.BandId)

                    setIsLoading(false)
                })
            }
        }
    }, [])

    //query: "?$type=Read&$id=80968fa2-312c-469f-9115-619d2fef06d5"

    const mapQueryRoute = (query: String) => {
        const args = mapQuery(query)
        const _type = GetModalTypeByString(args.get('type') ?? '')
        const _id = args.get('id') ?? GUID_EMPTY

        return { type: _type, id: _id }
    }

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
            ...CustomEvent.EmptyCustomEvent(),
            Id: id,
            Date: date,
            Title: elements[htmlConfig.Title.ControlId].value,
            SetlistId: setlistId,
            LocationId: locationId,
            BandId: bandId,
        }

        if (type !== "New") {
            _customEvent.Id = id
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