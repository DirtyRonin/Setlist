import { makeStyles, Theme, createStyles } from "@material-ui/core"
import styled from "styled-components"
import { variables } from "styles/variablesStyle"



export const ActionButton = styled.button`
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
export const Wrapper = styled.section`
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
export const Modal = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 300px;
    width: 70%;
    min-height: 30vh;
    background-color: ${variables.colorWhite};
    border-radius: 20px;
    padding: 20px 25px;
  `
export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${variables.colorGray};
    font-size: 14px;
    height: 50px;
    border-bottom: 1px solid #e2e2ea;
  `
export const Button = styled.button`
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

  export const UseModalStyles = makeStyles((theme: Theme) =>
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