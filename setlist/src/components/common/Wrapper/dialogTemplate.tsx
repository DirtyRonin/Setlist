
import React, { FunctionComponent } from "react"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"

import { Button, Header } from "styles/modalStyles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface IProps {
    open: boolean
    title: string
    close: () => void
}

const DialogTemplate: FunctionComponent<IProps> = ({ open, title, close, children }) => {


    return (
        <Dialog open={open} aria-labelledby="form-dialog-title">
            <Header>
                <DialogTitle>{title}</DialogTitle>
                <Button onClick={close}>
                    <FontAwesomeIcon icon={['fas', "window-close"]} size="1x" />
                </Button>
            </Header>
            {children}
        </Dialog>
    )
}

export default DialogTemplate