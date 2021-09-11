import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import AsyncButtonComponent, { ButtonState } from "components/common/asyncButton";
import { Song, SetlistSong } from "mapping";
import { ISetlist, ISetlistSong, ISong, IBandSong } from "models";
import { CreateSetlistSongAsync } from "service";
import { SongNodeContainer } from "styles/songStyle";

export interface IAddSongToSetlistModalNode {
    setlist: ISetlist
    song: ISong
}

const AddSongToSetlistModalNode = (props: IAddSongToSetlistModalNode) => {

    const { setlist, song } = props

    const CreateNewSetlistSong: ISetlistSong = SetlistSong.Create({
        songId: song.Id,
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