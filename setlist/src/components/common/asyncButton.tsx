import React from "react"
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import CircularProgress from "@material-ui/core/CircularProgress";
import Fab from "@material-ui/core/Fab";

import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import ErrorIcon from '@material-ui/icons/Error';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            alignItems: 'center',
        },
        wrapper: {
            margin: theme.spacing(1),
            position: 'relative',
        },
        fabProgress: {
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
        },
        buttonSuccess: {
            backgroundColor: green[500],
            '&:hover': {
                backgroundColor: green[700],
            },
        },
        buttonError: {
            backgroundColor: red[500],
            '&:hover': {
                backgroundColor: red[700],
            },
        },
        buttonProgress: {
            color: green[500],
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
        },
    }),
);

export interface IAsyncButtonProps<T> {
    asyncExecute(value: T): Promise<T> | Promise<boolean>
    value: T
    isExisting: boolean

}

export const AsyncButtonComponent = <T extends {}>(props: IAsyncButtonProps<T>) => {

    const { asyncExecute, value, isExisting } = props

    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(isExisting);
    const [error, setError] = React.useState(false);

    const handleOnClick = () => {
        if (!success && !loading) {
            setLoading(true);
            setError(false)

            asyncExecute(value)
                .then(
                    (result) => {
                        setSuccess(true);
                        setLoading(false);
                    }
                )
                .catch(
                    (e) => {
                        console.log(e)
                        setSuccess(false);
                        setLoading(false);
                        setError(true)
                    })
        }
    }

    const classes = useStyles();
    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
        [classes.buttonError]: error
    });

    return <div className={classes.root}>
        <div className={classes.wrapper}>
            <Fab
                aria-label="save"
                color="primary"
                className={buttonClassname}
                onClick={handleOnClick}
            >
                {success ? <CheckIcon /> : error ? <ErrorIcon /> : <SaveIcon />}
            </Fab>
            {loading && <CircularProgress size={68} className={classes.fabProgress} />}
        </div>
    </div>

}

export default AsyncButtonComponent