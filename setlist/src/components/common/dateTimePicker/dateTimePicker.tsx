import React, { useState } from 'react'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers'
import { Theme } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { FormHtmlAttributesDefinition } from 'configuration';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        datepicker: {
            margin: "2px 0px 2px 0px",
            height: "60px",
            width: 'fit-content',
            padding: "20px 15px 10px",
            borderBottom: "2px solid blue",
            backgroundColor: "#fff",
            color: "#2c2c2c",
            // width: 300,
            fontWeight: 600
        }
    }),
);

interface IProps {
    isReadonly: boolean
    handleDateChange: (date: MaterialUiPickersDate) => void
    htmlConfig: FormHtmlAttributesDefinition
    date: Date | null
}

export default function WrapDateTimePicker({ date, isReadonly, htmlConfig, handleDateChange }: IProps) {

    const classes = useStyles();

    return (<MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DateTimePicker
        
            readOnly={isReadonly}
            ampm={false}
            clearable={true}
            fullWidth
            onChange={handleDateChange}
            value={date}
            format={'dd.MM.yyyy HH:mm'}
            label={date && htmlConfig.Label}
            placeholder={htmlConfig.Placeholder} //<--- you can also use placeholder
            // emptyLabel="custom label" //<--- custom placeholder when date is null
            InputProps={{ className: !date ? classes.datepicker : '' }} //<----apply style when no date selected
        />
    </MuiPickersUtilsProvider>)
}



