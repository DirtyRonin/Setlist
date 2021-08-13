import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import AsyncButtonComponent, { ButtonState } from "components/common/asyncButton";
import { Song, SetlistSong } from "mapping";
import { ISetlist, ISetlistSong, IBandSong } from "models";
import { CreateSetlistSongAsync } from "service";
import { SongNodeContainer } from "styles/songStyle";

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
        <Container>
            <SongNodeContainer >
                <Row>
                    <Col xs="8">
                        <label>{props.setlist.Title}</label>
                    </Col >
                    <Col xs="4">
                        <div>
                            <Col>
                                <AsyncButtonComponent asyncExecute={CreateSetlistSongAsync} value={CreateNewSetlistSong} defaultState={IsSetlistSongExisting} />
                            </Col>
                        </div>
                    </Col>

                </Row>
            </SongNodeContainer>
        </Container>
    );
}

export default AddSongToSetlistModalNode