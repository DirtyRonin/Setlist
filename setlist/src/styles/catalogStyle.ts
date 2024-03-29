import { CSSProperties } from 'react';
import styled from "styled-components";

export const ContainerCss = styled.div`
    min-height: 500px;    
    max-height: 1200px;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 650px;
    flex-grow: 4;
    background-color: white;
`;

const variables = {
  color: '#0062ff',
  colorBorder: '#e2e2ea',
}

export const Header = styled.div`
  border-radius: 15px 15px 0 0;
  border-top: 1px solid ${variables.colorBorder};
  border-left: 1px solid ${variables.colorBorder};
  border-right: 1px solid ${variables.colorBorder};
  display: flex;
  justify-content: space-between;
`

export const HeaderTitle = styled.span`
  font-size: 16px;
  letter-spacing: 0.1px;
  color: #696974;
  padding: 15px 20px;
`
export const HeaderOptions = styled.div`
  padding: 0 20px;
  display: flex;
  align-items: center;
  @media (max-width: 450px) {
    display: none;
  }
`

export const NodeListCss = styled.div`
    overflow: auto;
    max-height: 800px;    
    display: grid;
    grid-template-columns: none;
    grid-template-rows: repeat(4, auto);
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    border-left: 1px solid ${variables.colorBorder};
    border-right: 1px solid ${variables.colorBorder};
    padding: 20px 0;
    background: none;
`;


//min-height für die Darstellung des Optionsmenüs
export const InfinitScrollCss: CSSProperties = {
  minHeight: '300px'
}


export const SearchFilterCss = styled.div`
margin-right: 40px;
`;


export const SongFilterCss = styled.div`
    border: 1px solid lightgrey;
    border-radius: 1px;
    padding: 8px;
`;

