import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import AsyncButtonComponent from "components/common/asyncButton";
import { Song, SetlistSong } from "mapping";
import { ISetlist, ISetlistSong, ISong } from "models";
import { SongNodeContainer } from "styles/songStyle";
import { AddSongToSetlistRequestAsync } from "api/setlistSongApi"

export interface IAddSongToSetlistModalNode {
    setlist: ISetlist
    song: ISong
}

type SetlistWithSongCount = ISetlist & {
    songs_count?: number
}

const AddSongToSetlistModalNode = (props: IAddSongToSetlistModalNode) => {

    const { setlist, song } = props

    const CreateNewSetlistSong: ISetlistSong = SetlistSong.Create({
        songId: song.id,
        song: Song.CreateEmpty(),
        setlistId: setlist.id,
        bandSongId: undefined
    })

    const IsSetlistSongExisting: boolean = ((setlist as SetlistWithSongCount).songs_count ?? 0) > 0

    return (
        <Container>
            <SongNodeContainer >
                <Row>
                    <Col xs="8">
                        <label>{props.setlist.title}</label>
                    </Col >
                    <Col xs="4">
                        <div>
                            <Col>
                                <AsyncButtonComponent asyncExecute={AddSongToSetlistRequestAsync} value={CreateNewSetlistSong} isExisting={IsSetlistSongExisting} />
                            </Col>
                        </div>
                    </Col>

                </Row>
            </SongNodeContainer>
        </Container>
    );
}

export default AddSongToSetlistModalNode