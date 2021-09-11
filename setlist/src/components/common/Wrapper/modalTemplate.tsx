
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle"
import React, { FunctionComponent } from "react"
import ReactDom from "react-dom"
import { Button, Header, Modal, Wrapper } from "styles/modalStyles"

interface IModalTemplateProps {
  title: string
  handleCloseModal: () => void
}

const ModalTemplate: FunctionComponent<IModalTemplateProps> = ({ title, handleCloseModal, children }) => {

  const element = document.getElementById('modal_rooter')
  if (!element) {
    throw new Error('The element #portal wasn`t found')
  }

  return ReactDom.createPortal(<Wrapper>
    <Modal>
      <Header>
        <DialogTitle>{title}</DialogTitle>
        <Button onClick={handleCloseModal}>
          <FontAwesomeIcon icon={['fas', "window-close"]} size="1x" />
        </Button>
      </Header>
      {children}
    </Modal>
  </Wrapper>,
    element)
}

export default ModalTemplate