
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { FunctionComponent } from "react"
import ReactDom from "react-dom"
import styled from "styled-components"

const variables = {
    colorGray: '#92929d',
    colorRed: '#fc5a5a',
    colorWhite: '#ffffff'
}

const Wrapper = styled.section`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(23, 23, 37, 0.4);
    z-index: 100;
  `
const Modal = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 300px;
    width: 30%;
    min-height: 30vh;
    background-color: ${variables.colorWhite};
    border-radius: 20px;
    padding: 20px 25px;
  `
const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${variables.colorGray};
    font-size: 14px;
    height: 50px;
    border-bottom: 1px solid #e2e2ea;
  `
const Button = styled.button`
    background-color: ${variables.colorWhite};
    border: none;
    outline: none;
    cursor: pointer;
    svg {
      fill: ${variables.colorGray};
      :hover {
        fill: #0062ff;
      }
    }
  `
const Title = styled.div`
    color: #171725;
    font-size: 24px;
    margin: 30px 0;
  `


interface IModalTemplateProps {
    title: string
    action:string
    handleCloseModal: () => void
}

const ModalTemplate: FunctionComponent<IModalTemplateProps> = ({ title,action, handleCloseModal, children }) => {

    const element = document.getElementById('modal_rooter')
    if (!element) {
        throw new Error('The element #portal wasn`t found')
    }

    return ReactDom.createPortal(<Wrapper>
        <Modal>
            <Header>
                <span>{title}</span>
                <Button onClick={handleCloseModal}>
                    <FontAwesomeIcon icon={['fas', "window-close"]} size="1x" />
                </Button>
            </Header>
            <Title>
                <span>{action}</span>
            </Title>
            {children}
        </Modal>
    </Wrapper>,
    element)
}

export default ModalTemplate