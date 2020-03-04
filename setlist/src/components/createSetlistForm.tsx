import React from "react";
import { Form, Button, FormControlProps, Col, Row } from "react-bootstrap";
import { IBandlist, SonglistType, IBandSummary, ISet } from "../models";
import { CreateSetlistHtmlAttributesConfiguration } from "../Configuration";
import { HashTable } from "../Util";

export interface ICreateSetlistProps {
    IsBandListNeeded: boolean;
    BandsSummary: HashTable<IBandSummary>;
    CreateBandAsync(bandlist: IBandlist): Promise<IBandlist>;
    AddBandToState(bandlist: IBandlist): void;
    AddSetlistToBandAsync(setlist: ISet): Promise<ISet>;
    AddSetlistToState(setlist: ISet): void;
}

const CreateSetlist = (props: ICreateSetlistProps): JSX.Element => {
    const { BandsSummary, CreateBandAsync, AddBandToState, AddSetlistToBandAsync,AddSetlistToState } = props;

    const selectNewBandlist = { id: 0, title: "Create New Bandlist" } as IBandSummary;

    const newSelect: IBandSummary[] = [selectNewBandlist].concat(
        Object.values(BandsSummary).map(summary => {
            return { id: summary.id, title: `New Setlist for ${summary.title}` };
        })
    );

    const htmlConfig = CreateSetlistHtmlAttributesConfiguration;

    const NameInput = htmlConfig.SetlistNameInput;
    const CreateButton = htmlConfig.CreateSetlistButton;

    const hanldeCreateSetlist = (event: React.FormEvent<FormControlProps>) => {
        event.preventDefault();

        const elements: any = (event.target as any).elements;

        const isBandList: boolean = elements[htmlConfig.BandSelect.ControlId].value === selectNewBandlist.id;

        if (isBandList) {
            const bandlist: IBandlist = {
                id: "",
                title: elements[NameInput.ControlId].value,
                songs: [],
                songlistType: SonglistType.BandList
            };

            CreateBandAsync(bandlist).then(
                newBandlist => AddBandToState(newBandlist)
            )

        } else {
            const setlist: ISet = {
                id: "",
                title: elements[NameInput.ControlId].value,
                songs: [],
                songlistType: SonglistType.SetList,
                bandId: elements[htmlConfig.BandSelect.ControlId].value
            }

            AddSetlistToBandAsync(setlist).then(
                newSetlist => AddSetlistToState(setlist)
            )
        }
    };

    return (
        <Form onSubmit={hanldeCreateSetlist} method="GET">
            <Form.Group as={Row} controlId={NameInput.ControlId}>
                <Form.Label column md="3">
                    {NameInput.label}
                </Form.Label>
                <Col md="9">
                    <Form.Control type="text" placeholder={NameInput.Placeholder}></Form.Control>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId={htmlConfig.BandSelect.ControlId}>
                <Form.Label column md="3">
                    {htmlConfig.BandSelect.label}
                </Form.Label>
                <Col md="9">
                    <Form.Control as="select">
                        {newSelect.map(summary => (
                            <option key={summary.id} value={summary.id}>{summary.title}</option>
                        ))}
                    </Form.Control>
                </Col>

            </Form.Group>

            <Button variant="primary" type="submit">
                {CreateButton.label}
            </Button>
        </Form>
    );
};

export default CreateSetlist;
