import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import AsyncButtonComponent from "components/common/asyncButton";
import { Song, SetlistSong } from "mapping";
import { ISetlist, ISetlistSong, ISnackbarActionProps, ISong } from "models";
import { SongNodeContainer } from "styles/songStyle";
import { AddSongToSetlistRequestAsync } from "api/setlistSongApi"
import { pushToSnackbar } from "store";
import { CREATING_COMPLETED, CREATING_FAILED } from "store/epics/catalogEpics/snackbarHelper";

export interface IAddSongToSetlistModalNode {
    setlist: ISetlist
    song: ISong
    pushToSnackbar: (props: ISnackbarActionProps) => void
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
                                <AsyncButtonComponent asyncExecute={AddSongToSetlistRequestAsync} value={CreateNewSetlistSong} isExisting={IsSetlistSongExisting} pushToSnackbar={pushToSnackbar} successMessage={CREATING_COMPLETED} errorMessage={CREATING_FAILED} />
                            </Col>
                        </div>
                    </Col>

                </Row>
            </SongNodeContainer>
        </Container>
    );
}

export default AddSongToSetlistModalNode