import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import AsyncButtonComponent from "components/common/asyncButton";
import { SetlistSong, Song } from "mapping";
import { ISetlist, ISetlistSong, ISong } from "models";
import { AddSongToSetlistRequestAsync } from "api/setlistSongApi";
import { DefaultLabelStyle, DefaultNodeWrapperStyle } from "styles/defaultNodeStyle";

interface IProps {
    setlist: ISetlist
    song: ISong
}

type SongtWithSetlistCount = ISong & {
    setlists_count?: number
}

const AddBandSongFromSongsNode = (props: IProps) => {

    const { setlist, song } = props

    const CreateNewSetlistSong: ISetlistSong = SetlistSong.Create({
        setlistId: setlist.id,
        song: Song.CreateEmpty(),
        songId: song.id,
        bandSongId: undefined
    })

    const IsSongInSetlistExisting: boolean = ((song as SongtWithSetlistCount).setlists_count ?? 0) > 0

    return (
        <DefaultNodeWrapperStyle>
            <Container>
                <Row>
                    <Col xs="3" >
                        <Row >
                            <Col>
                                <DefaultLabelStyle>{song.title}</DefaultLabelStyle>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <DefaultLabelStyle>{song.artist}</DefaultLabelStyle>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="3" >
                        <Row >
                            <Col>
                                <DefaultLabelStyle>{song.genre}</DefaultLabelStyle>
                            </Col>
                        </Row>
                        <Row >
                            <Col>
                                <DefaultLabelStyle>{song.originalKey}</DefaultLabelStyle>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="2" >
                        <Row >
                            <Col>
                                <DefaultLabelStyle>{song.nineties ? 'Nineties' : ''}</DefaultLabelStyle>
                            </Col>
                        </Row>
                        <Row >
                            <Col>
                                <DefaultLabelStyle>{song.evergreen ? 'Evergreen' : ''}</DefaultLabelStyle>
                            </Col>
                        </Row>

                    </Col>
                    <Col xs="2" >
                        <Row >
                            <Col>
                                <DefaultLabelStyle>{song.comment}</DefaultLabelStyle>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="2">
                        <AsyncButtonComponent asyncExecute={AddSongToSetlistRequestAsync} value={CreateNewSetlistSong} isExisting={IsSongInSetlistExisting} />
                    </Col>
                </Row>
            </Container>
        </DefaultNodeWrapperStyle>
    );
}

export default AddBandSongFromSongsNode