import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import AsyncButtonComponent from "components/common/asyncButton";
import { BandSong } from "mapping";
import { IBand, IBandSong, ISnackbarActionProps, ISong } from "models";
import { CreateBandSongAsync } from "service";
import { DefaultLabelStyle, DefaultNodeWrapperStyle } from "styles/defaultNodeStyle";
import { CREATING_COMPLETED, CREATING_FAILED } from "store/epics/catalogEpics/snackbarHelper"

interface IProps {
    band: IBand
    song: ISong
    pushToSnackbar: (props: ISnackbarActionProps) => void
}

const AddBandSongFromSongsNode = (props: IProps) => {

    const { band, song, pushToSnackbar } = props

    const CreateNewBandSong: IBandSong = BandSong.Create({
        popularity: 0,
        song,
        songId: song.id,
        bandId: band.id
    })

    const IsBandsongExisting = (): boolean => song.bandSongs.length > 0

    return (
        <DefaultNodeWrapperStyle>
            <Container>
                <Row>
                    <Col xs="8">
                        <Row>
                            <Col>
                                <DefaultLabelStyle>{song.title}</DefaultLabelStyle>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <DefaultLabelStyle>{song.artist}</DefaultLabelStyle>
                            </Col>
                        </Row>
                    </Col >
                    <Col xs="4">
                        <AsyncButtonComponent asyncExecute={CreateBandSongAsync} value={CreateNewBandSong} isExisting={IsBandsongExisting()} pushToSnackbar={pushToSnackbar} successMessage={CREATING_COMPLETED} errorMessage={CREATING_FAILED} />
                    </Col>
                </Row>
            </Container>
        </DefaultNodeWrapperStyle>
    );
}

export default AddBandSongFromSongsNode