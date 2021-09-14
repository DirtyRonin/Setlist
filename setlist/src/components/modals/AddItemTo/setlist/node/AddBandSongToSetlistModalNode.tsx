import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import AsyncButtonComponent, { ButtonState } from "components/common/asyncButton";
import { Song, SetlistSong } from "mapping";
import { ISetlist, ISetlistSong, IBandSong } from "models";
import { CreateSetlistSongAsync } from "service";

import { DefaultLabelStyle, DefaultNodeImageStyle, DefaultNodeWrapperStyle } from "styles/defaultNodeStyle";

export interface IAddBandSongToSetlistModalNode {
    setlist: ISetlist
    bandSong: IBandSong
}

const AddSongToSetlistModalNode = (props: IAddBandSongToSetlistModalNode) => {

    const { setlist, bandSong, } = props

    const CreateNewSetlistSong: ISetlistSong = SetlistSong.Create({
        bandSongId: bandSong.Id,
        songId: bandSong.SongId,
        song: Song.EmptySong(),
        setlistId: setlist.Id
    })

    const IsSetlistSongExisting: ButtonState = setlist.SetlistSongs?.size > 0 ? 'Already Existing' : 'INITIAL'

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
                                        <DefaultLabelStyle>{props.setlist.Title}</DefaultLabelStyle>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col >
                    <Col xs="2">
                        <AsyncButtonComponent asyncExecute={CreateSetlistSongAsync} value={CreateNewSetlistSong} defaultState={IsSetlistSongExisting} />
                    </Col>
                </Row>
            </Container>

        </DefaultNodeWrapperStyle >

    );
}

export default AddSongToSetlistModalNode