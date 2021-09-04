import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { makeStyles, Theme, createStyles, TextField, Dialog, Button, DialogTitle, DialogContent, FormControl, InputLabel, Select, Input, MenuItem, DialogActions } from "@material-ui/core";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

import { ModalTypes, ICustomEvent, customEventModalActions } from "models";
import { CustomEvent } from "mapping";
import { fetchCustomEventById } from "service";
import { mapQuery } from "utils/routeQueryHelper";
import { GetModalTypeByString, IsModalReadonly } from "utils";
import { CustomEventModalHtmlAttributesConfiguration } from "configuration/HtmlAttributesConfigs/customEventHtmlAttributes";
import ModalTemplate from "components/common/modalWrapper/modalTemplate";
import WrapDateTimePicker from "components/common/dateTimePicker/dateTimePicker";

const variables = {
    colorGray: '#92929d',
    colorRed: '#fc5a5a',
    colorWhite: '#ffffff'
}

const AcitonButton = styled.button`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    background-color: ${variables.colorRed};
    outline: none;
    cursor: pointer;
    color: ${variables.colorWhite};
    height: 38px;
    border-radius: 20px;
    border: 1px solid ${variables.colorRed};
    :hover {
      color: ${variables.colorRed};
      background-color: ${variables.colorWhite};
    }
  `

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '100%',
            },
        },
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
    }),
);

interface IProps {
    handleCloseModal(): void
    customEventModalActionsProvider: customEventModalActions
    query: string
}

const CustomEventModalComponent = (props: IProps) => {

    const { query, handleCloseModal, customEventModalActionsProvider } = props

    const [customEvent, setCustomEvent] = useState(CustomEvent.EmptyCustomEvent())
    const [isLoading, setIsLoading] = useState(true)
    const [type, setType] = useState<ModalTypes>(ModalTypes.None)
    const [id, setId] = useState('')
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        if (query) {
            const mapped = mapQueryRoute(query)

            setType(mapped.type)
            setId(mapped.id)

            fetchCustomEventById(mapped.id).then(result => {
                setCustomEvent(result)
                setDate(result.Date)

                setIsLoading(false)
            })
        }
    }, [])

    //query: "?$type=Read&$id=80968fa2-312c-469f-9115-619d2fef06d5"

    const mapQueryRoute = (query: String) => {
        const args = mapQuery(query)
        const _type = GetModalTypeByString(args.get('type') ?? '')
        const _id = args.get('id') ?? ''

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
            handleCloseModal()
    };

    const GetCustomEventForModalType = (type: ModalTypes, elements: any) => {
        const _customEvent: ICustomEvent = {
            ...customEvent,
            Title: elements[htmlConfig.Title.ControlId].value,
            Date: date,
            SetlistId: elements[htmlConfig.Setlist.ControlId].value,
            LocationId: elements[htmlConfig.Location.ControlId].value,
            BandId: elements[htmlConfig.Band.ControlId].value
        }

        if (type !== "New") {
            _customEvent.Id = id
        }

        return _customEvent;
    }

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [age, setAge] = React.useState<number | string>('');

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setAge(Number(event.target.value) || '');
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDateChange = (value: MaterialUiPickersDate) => {
        if (value)
            setDate(value);
    };

    const IsReadonly = IsModalReadonly(type)

    return (<ModalTemplate handleCloseModal={handleCloseModal} action={type} title='Custom Event'>
        {!isLoading && <form className={classes.root} noValidate autoComplete="off" onSubmit={handleOnClick} method="GET">
            <TextField disabled={IsReadonly} id={htmlConfig.Title.ControlId} label={htmlConfig.Title.Label} defaultValue={customEvent.Title} />

            <WrapDateTimePicker
                date={date}
                isReadonly={IsReadonly}
                htmlConfig={htmlConfig.Date}
                handleDateChange={handleDateChange}
            />

            <Button onClick={handleClickOpen}>Open select dialog</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Fill the form</DialogTitle>
                <DialogContent>
                    <form className={classes.container}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="demo-dialog-native">Age</InputLabel>
                            <Select
                                native
                                value={age}
                                onChange={handleChange}
                                input={<Input id="demo-dialog-native" />}
                            >
                                <option aria-label="None" value="" />
                                <option value={10}>Ten</option>
                                <option value={20}>Twenty</option>
                                <option value={30}>Thirty</option>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-dialog-select-label">Age</InputLabel>
                            <Select
                                labelId="demo-dialog-select-label"
                                id="demo-dialog-select"
                                value={age}
                                onChange={handleChange}
                                input={<Input />}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>

            <TextField disabled={IsReadonly} id={htmlConfig.Setlist.ControlId} label={htmlConfig.Setlist.Label} defaultValue={customEvent.SetlistId} />
            <TextField disabled={IsReadonly} id={htmlConfig.Location.ControlId} label={htmlConfig.Location.Label} defaultValue={customEvent.LocationId} />
            <TextField disabled={IsReadonly} id={htmlConfig.Band.ControlId} label={htmlConfig.Band.Label} defaultValue={customEvent.BandId} />
            <AcitonButton type="submit">{type}</AcitonButton>
        </form>}
    </ModalTemplate >
    )
}

export default CustomEventModalComponent