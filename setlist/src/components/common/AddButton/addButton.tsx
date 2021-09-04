import React from "react";
import styled from "styled-components";

const variables = {
    color: '#0062ff',
    colorBorder: '#e2e2ea',
    crossSize: 16
  }

export const AddButtonCross = styled.div`
  position: absolute;
  left: 50%;
  top: 25%;
  width: ${variables.crossSize}px;
  height: ${variables.crossSize}px;
  :before,
  :after {
    position: absolute;
    left: 0;
    content: '';
    height: ${variables.crossSize}px;
    width: 2px;
    background-color: #92929d;
  }
  :before {
    transform: rotate(90deg);
  }
  :after {
    transform: rotate(180deg);
  }
`
export const AddButtonWrapper = styled.button`
  height: 35px;
  width: 100%;
  border-radius: 0 0 15px 15px;
  outline: none;
  border: 1px solid ${variables.colorBorder};
  position: relative;
  background-color: white;
  :hover {
    border: 1px dashed ${variables.color};
  }
  :hover ${AddButtonCross}:before {
    background-color: ${variables.color};
  }
  :hover ${AddButtonCross}:after {
    background-color: ${variables.color};
  }
`

interface IProps{
    onClick:()=> void
}

const AddButton = ({onClick}:IProps) => {
    return (<AddButtonWrapper onClick={onClick} >
        <AddButtonCross onClick={onClick} />
    </AddButtonWrapper>)
}

export default AddButton

