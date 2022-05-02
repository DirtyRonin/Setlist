import React from "react";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import { History } from "history";

import { IModalActionsProps, ISetlistSong, ModalTypes } from "models";
import { DefaultLabelStyle, DefaultNodeImageStyle, DefaultNodeWrapperStyle, DefaultSongNodeStyle } from "styles";

import {
    Menu,
    MenuItem,
    MenuDivider,
    MenuHeader
} from '@szhsin/react-menu';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import useTheme from "@material-ui/core/styles/useTheme";


export interface ISetlistSongNodeProps {
    setlistSong: ISetlistSong;
    index: number;
    setlistSongsCount: number;
    history: History
    setModal(props: IModalActionsProps): void
    setSetlistSongsOrder(props: number[]): void
}


const SetlistSongCatalogNodeComponent = (props: ISetlistSongNodeProps): JSX.Element => {
    const {
        setlistSong,
        index,
        setlistSongsCount,
        setModal,
        setSetlistSongsOrder,
        history
    } = props;

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
        return Array.from(Array(setlistSongsCount), (e, i) => i + 1).map(order =>
            <Dropdown.Item eventKey={order} active={order === setlistSong.order} onSelect={onDropDownSelect}>{order}</Dropdown.Item>

        )
    }

    const onDropDownSelect = (e: string | null) => {
        if (e !== null && e !== String(setlistSong.order)) {
            setSetlistSongsOrder([+e, setlistSong.order])
        }
    }

    const classes = DefaultSongNodeStyle();
    const theme = useTheme();

    return (

        // <Card className={classes.root}>
        //     <div className={classes.details}>
        //         <CardContent className={classes.content}>
        //             <Typography component="h5" variant="h5">
        //                 Live From Space
        //             </Typography>
        //             <Typography variant="subtitle1" color="textSecondary">
        //                 Mac Miller
        //             </Typography>
        //         </CardContent>
        //         <div className={classes.controls}>
        //             <IconButton aria-label="previous">
        //                 {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
        //             </IconButton>
        //             <IconButton aria-label="play/pause">
        //                 <PlayArrowIcon className={classes.playIcon} />
        //             </IconButton>
        //             <IconButton aria-label="next">
        //                 {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
        //             </IconButton>
        //         </div>
        //     </div>
        //     <CardMedia
        //         className={classes.cover}
        //         image="/static/images/cards/live-from-space.jpg"
        //         title="Live from space album cover"
        //     />
        // </Card>



        <DefaultNodeWrapperStyle >
            <Container>
                <Row>
                    <Col xs="10" >
                        <Row>
                            <Col xs="3">
                                {setlistSong.order ?? 0}
                                {/* <DefaultNodeImageStyle /> */}
                            </Col>
                            <Col xs="7">
                                <Row>
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
                        </Row>
                    </Col >
                    <Col xs='1' >
                        <Menu menuButton={<div ><FontAwesomeIcon icon={['fas', "ellipsis-h"]} size="1x" /></div>}>
                            <MenuDivider />
                            <MenuHeader>Edit</MenuHeader>
                            <MenuItem value="Read" onClick={handleShowReadSetlistSong} >{ModalTypes.Read}</MenuItem>
                            <MenuItem value="Edit" onClick={handleShowEditSetlistSong} >{ModalTypes.Edit}</MenuItem>
                            <MenuItem value="Remove" onClick={handleShowDeleteSetlistSong} >{ModalTypes.Remove}</MenuItem>
                        </Menu>
                    </Col>
                    <Col xs='1' >
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {setlistSong.order}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {swapOrder()}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
            </Container>
        </DefaultNodeWrapperStyle >
    );
};

export default SetlistSongCatalogNodeComponent;