import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import AsyncButtonComponent from "components/common/asyncButton";
import { BandSong } from "mapping";
import { IBand, IBandSong, ISnackbarActionProps, ISong } from "models";
import { AddSongToBandRequestAsync } from "api/bandSongApi";
import { SongNodeContainer } from "styles/songStyle";
import { CREATING_COMPLETED, CREATING_FAILED } from "store/epics/catalogEpics/snackbarHelper"

export interface IAddSongToBandNodeProps {
    band: IBand
    song: ISong
    pushToSnackbar: (props: ISnackbarActionProps) => void
}

type BandWithSongCount = IBand & {
    songs_count?: number
}

const AddSongToBandNode = (props: IAddSongToBandNodeProps) => {

    const { band: customBand, song,pushToSnackbar } = props

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
                                <AsyncButtonComponent asyncExecute={AddSongToBandRequestAsync} value={CreateNewBandSong} isExisting={IsBandsongExisting} pushToSnackbar={pushToSnackbar} successMessage={CREATING_COMPLETED} errorMessage={CREATING_FAILED} />
                            </Col>
                        </div>
                    </Col>
                </Row>
            </SongNodeContainer>
        </Container>
    );
}

export default AddSongToBandNode