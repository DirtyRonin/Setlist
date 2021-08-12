import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import AsyncButtonComponent, { ButtonState } from "components/common/asyncButton";
import { BandSong } from "mapping";
import { IBand, IBandSong, ISong } from "models";
import { CreateBandSongAsync } from "service";
import { SongNodeContainer } from "styles/songStyle";

export interface IAddSongToBandNodeProps {
    band: IBand
    song: ISong
}

const AddSongToBandNode = (props: IAddSongToBandNodeProps) => {

    const { band: customBand, song } = props

    const CreateNewBandSong: IBandSong = BandSong.Create({
        title: song.Title,
        popularity: 0,
        song,
        songId: song.Id,
        bandId: customBand.Id
    })

    const IsBandsongExisting: ButtonState = customBand.BandSongs?.size > 0 ? 'Already Existing' : 'INITIAL'

    return (
        <Container>
            <SongNodeContainer >
                <Row>
                    <Col xs="8">
                        <label>{props.band.Title}</label>
                    </Col >
                    <Col xs="4">
                        <div>
                            <Col>
                                <AsyncButtonComponent asyncExecute={CreateBandSongAsync} value={CreateNewBandSong} defaultState={IsBandsongExisting} />
                            </Col>
                        </div>
                    </Col>

                </Row>
            </SongNodeContainer>
        </Container>
    );
}

export default AddSongToBandNode