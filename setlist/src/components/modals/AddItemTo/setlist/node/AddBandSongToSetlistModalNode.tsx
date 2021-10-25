import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import AsyncButtonComponent from "components/common/asyncButton";
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
        bandSongId: bandSong.id,
        songId: bandSong.songId,
        song: Song.CreateEmpty(),
        setlistId: setlist.id
    })

    const IsSetlistSongExisting: boolean = setlist.setlistSongs?.size > 0 

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
                        <AsyncButtonComponent asyncExecute={CreateSetlistSongAsync} value={CreateNewSetlistSong} isExisting={IsSetlistSongExisting} />
                    </Col>
                </Row>
            </Container>

        </DefaultNodeWrapperStyle >

    );
}

export default AddSongToSetlistModalNode