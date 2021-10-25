import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import AsyncButtonComponent from "components/common/asyncButton";
import { BandSong } from "mapping";
import { IBand, IBandSong, ISong } from "models";
import { CreateBandSongAsync } from "service";
import { DefaultLabelStyle, DefaultNodeWrapperStyle } from "styles/defaultNodeStyle";

interface IProps {
    band: IBand
    song: ISong
}

const AddBandSongFromSongsNode = (props: IProps) => {

    const { band, song } = props

    const CreateNewBandSong: IBandSong = BandSong.Create({
        popularity: 0,
        song,
        songId: song.id,
        bandId: band.id
    })

    const IsBandsongExisting =(): boolean => song.bandSongs.length > 0

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
                        <AsyncButtonComponent asyncExecute={CreateBandSongAsync} value={CreateNewBandSong} isExisting={IsBandsongExisting()} />
                    </Col>
                </Row>
            </Container>
        </DefaultNodeWrapperStyle>
    );
}

export default AddBandSongFromSongsNode