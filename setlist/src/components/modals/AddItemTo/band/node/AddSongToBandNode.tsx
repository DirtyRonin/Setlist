import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import AsyncButtonComponent from "components/common/asyncButton";
import { BandSong } from "mapping";
import { IBand, IBandSong, ISong } from "models";
import { AddSongToBandRequestAsync } from "api/bandSongApi";
import { SongNodeContainer } from "styles/songStyle";

export interface IAddSongToBandNodeProps {
    band: IBand
    song: ISong
}

type BandWithSongCount = IBand & {
    songs_count?: number
}

const AddSongToBandNode = (props: IAddSongToBandNodeProps) => {

    const { band: customBand, song } = props

    const CreateNewBandSong: IBandSong = BandSong.Create({
        popularity: 0,
        song,
        songId: song.id,
        bandId: customBand.id
    })

    const IsBandsongExisting: boolean = ((customBand as BandWithSongCount).songs_count ?? 0)  > 0

    return (
        <Container>
            <SongNodeContainer >
                <Row>
                    <Col xs="8">
                        <label>{props.band.title}</label>
                    </Col >
                    <Col xs="4">
                        <div>
                            <Col>
                                <AsyncButtonComponent asyncExecute={AddSongToBandRequestAsync} value={CreateNewBandSong} isExisting={IsBandsongExisting} />
                            </Col>
                        </div>
                    </Col>
                </Row>
            </SongNodeContainer>
        </Container>
    );
}

export default AddSongToBandNode