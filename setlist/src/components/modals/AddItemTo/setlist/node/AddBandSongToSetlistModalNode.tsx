import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import AsyncButtonComponent from "components/common/asyncButton";
import { Song, SetlistSong } from "mapping";
import { ISetlist, ISetlistSong, IBandSong, ISnackbarActionProps } from "models";
import { CreateSetlistSongAsync } from "service";

import { DefaultLabelStyle, DefaultNodeImageStyle, DefaultNodeWrapperStyle } from "styles/defaultNodeStyle";
import { CREATING_COMPLETED, CREATING_FAILED } from "store/epics/catalogEpics/snackbarHelper"

export interface IAddBandSongToSetlistModalNode {
    setlist: ISetlist
    bandSong: IBandSong
    pushToSnackbar: (props: ISnackbarActionProps) => void
}

const AddSongToSetlistModalNode = (props: IAddBandSongToSetlistModalNode) => {

    const { setlist, bandSong, pushToSnackbar } = props

    const CreateNewSetlistSong: ISetlistSong = SetlistSong.Create({
        bandSongId: bandSong.bandId,
        songId: bandSong.songId,
        song: Song.CreateEmpty(),
        setlistId: setlist.id
    })

    const IsSetlistSongExisting: boolean = setlist.setlistSongs?.length > 0 

    return (

        <DefaultNodeWrapperStyle >

            <Container>
                <Row>
                    <Col xs="10" >
                        <Row>
                            <Col xs="3">
                                <DefaultNodeImageStyle />
                            </Col>
                            <Col xs="9">
                                <Row>
                                    <Col>
                                        <DefaultLabelStyle>{props.setlist.title}</DefaultLabelStyle>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col >
                    <Col xs="2">
                        <AsyncButtonComponent asyncExecute={CreateSetlistSongAsync} value={CreateNewSetlistSong} isExisting={IsSetlistSongExisting} pushToSnackbar={pushToSnackbar} successMessage={CREATING_COMPLETED} errorMessage={CREATING_FAILED} />
                    </Col>
                </Row>
            </Container>

        </DefaultNodeWrapperStyle >

    );
}

export default AddSongToSetlistModalNode