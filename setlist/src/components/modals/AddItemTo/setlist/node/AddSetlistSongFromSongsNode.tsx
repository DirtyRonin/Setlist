import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import AsyncButtonComponent from "components/common/asyncButton";
import { SetlistSong, Song } from "mapping";
import { ISetlist, ISetlistSong, ISnackbarActionProps, ISong } from "models";
import { AddSongToSetlistRequestAsync } from "api/setlistSongApi";
import { DefaultLabelStyle, DefaultNodeWrapperStyle } from "styles/defaultNodeStyle";
import { CREATING_COMPLETED, CREATING_FAILED } from "store/epics/catalogEpics/snackbarHelper"

interface IProps {
    setlist: ISetlist
    song: ISong
    pushToSnackbar: (props: ISnackbarActionProps) => void
}

type SongtWithSetlistCount = ISong & {
    setlists_count?: number
}

const AddBandSongFromSongsNode = (props: IProps) => {

    const { setlist, song, pushToSnackbar } = props

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
                        <AsyncButtonComponent asyncExecute={AddSongToSetlistRequestAsync} value={CreateNewSetlistSong} isExisting={IsSongInSetlistExisting} pushToSnackbar={pushToSnackbar} successMessage={CREATING_COMPLETED} errorMessage={CREATING_FAILED} />
                    </Col>
                </Row>
            </Container>
        </DefaultNodeWrapperStyle>
    );
}

export default AddBandSongFromSongsNode