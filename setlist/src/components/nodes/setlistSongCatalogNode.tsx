import React, { useState } from "react";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import { History } from "history";

import { Menu, MenuItem, MenuDivider, MenuHeader } from '@szhsin/react-menu';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cloneDeep } from 'lodash'

import { IModalActionsProps, ISetlistSong, ISwapSetlistSongsActionProps, ModalTypes } from "models";
import { DefaultLabelStyle, DefaultNodeImageStyle, DefaultNodeWrapperStyle, DefaultSongNodeStyle } from "styles";
export interface ISetlistSongNodeProps {
    setlistSong: ISetlistSong;
    index: number;
    setlistSongsCount: number;
    history: History
    setModal(props: IModalActionsProps): void
    setSetlistSongsOrder(props: ISwapSetlistSongsActionProps): void
    totalCount:number;
}


const SetlistSongCatalogNodeComponent = (props: ISetlistSongNodeProps): JSX.Element => {
    const {
        setlistSong,
        index,
        setlistSongsCount,
        setModal,
        setSetlistSongsOrder,
        history,
        totalCount
    } = props;

    const [isHover, setHover] = useState(false)

    const createModal = (type: ModalTypes, pathName: string = '/') => {

        setModal({ showModal: true })

        history.push({
            pathname: pathName,
            search: `?$type=${type}&$setlistId=${setlistSong.setlistId}&$songId=${setlistSong.songId}`,
            state: { background: history.location }
        })
    }

    const handleShowEditSetlistSong = () => createModal(ModalTypes.Edit, '/setlistSongModal')
    const handleShowReadSetlistSong = () => createModal(ModalTypes.Read, '/setlistSongModal')
    const handleShowDeleteSetlistSong = () => createModal(ModalTypes.Remove, '/setlistSongModal')

    const swapOrder = (): JSX.Element[] => {
        return Array.from(Array(totalCount), (e, i) => i + 1).map(order =>
            <Dropdown.Item eventKey={order} active={order === setlistSong.order} onSelect={onDropDownSelect}>{order}</Dropdown.Item>

        )
    }

    const onDropDownSelect = (e: string | null) => {
        if (e !== null && e !== String(setlistSong.order)) {
            const newSetlistSong: ISetlistSong = cloneDeep(setlistSong)
            newSetlistSong.order = +e
            setSetlistSongsOrder({ setlistSong: newSetlistSong })
        }
    }

    return (
        <DefaultNodeWrapperStyle
            onMouseEnter={e => {
                setHover(true);
            }}
            onMouseLeave={e => {
                setHover(false)
            }}>
            <Container>
                <Row className="justify-content-xs-center">
                    <Col xs="1">
                        {!isHover ? setlistSong.order : <Dropdown>
                            <Dropdown.Toggle variant="warning" id="dropdown-basic">
                                {setlistSong.order}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {swapOrder()}
                            </Dropdown.Menu>
                        </Dropdown>}
                        {/* <DefaultNodeImageStyle /> */}
                    </Col>
                    <Col xs="3" >
                        <Row >
                            <Col>
                                <DefaultLabelStyle>{setlistSong.song.title}</DefaultLabelStyle>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <DefaultLabelStyle>{setlistSong.song.artist}</DefaultLabelStyle>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="3" >
                        <Row >
                            <Col>
                                <DefaultLabelStyle>{setlistSong.song.genre}</DefaultLabelStyle>
                            </Col>
                        </Row>
                        
                    </Col>
                    <Col xs="3" >
                        <Row >
                            <Col>
                                <DefaultLabelStyle>{setlistSong.song.nineties ? 'Nineties' : ''}</DefaultLabelStyle>
                            </Col>
                        </Row>
                        <Row >
                            <Col>
                                <DefaultLabelStyle>{setlistSong.song.evergreen ? 'Evergreen' : ''}</DefaultLabelStyle>
                            </Col>
                        </Row>
                        
                    </Col>
                    <Col xs='2' >
                        {isHover && <Menu menuButton={<div ><FontAwesomeIcon icon={['fas', "ellipsis-h"]} size="1x" /></div>}>
                            <MenuDivider />
                            <MenuHeader>Edit</MenuHeader>
                            <MenuItem value="Read" onClick={handleShowReadSetlistSong} >{ModalTypes.Read}</MenuItem>
                            <MenuItem value="Edit" onClick={handleShowEditSetlistSong} >{ModalTypes.Edit}</MenuItem>
                            <MenuItem value="Remove" onClick={handleShowDeleteSetlistSong} >{ModalTypes.Remove}</MenuItem>
                        </Menu>}
                    </Col>
                </Row>

            </Container>
        </DefaultNodeWrapperStyle >
    );
};

export default SetlistSongCatalogNodeComponent;