import React from "react";
import { Form, Button, FormControlProps, Col, Row } from "react-bootstrap";
import { IBandCatalog, SongCatalogType, IBandSummary, ISetCatalog } from "../models";
import { CreateSetlistHtmlAttributesConfiguration } from "../Configuration";
import { HashTable } from "../Util";

export interface ICreateSetlistProps {
    IsBandListNeeded: boolean;
    BandsSummary: HashTable<IBandSummary>;
    CreateBandAsync(bandlist: IBandCatalog): Promise<IBandCatalog>;
    AddBandToState(bandlist: IBandCatalog): void;
    AddSetlistToBandAsync(setlist: ISetCatalog): Promise<ISetCatalog>;
    AddSetlistToState(setlist: ISetCatalog): void;
}

const CreateSetlist = (props: ICreateSetlistProps): JSX.Element => {
    const { BandsSummary, CreateBandAsync, AddBandToState, AddSetlistToBandAsync,AddSetlistToState } = props;

    const selectNewBandlist = { Id: "", Title: "Create New Bandlist" } as IBandSummary;

    const newSelect: IBandSummary[] = [selectNewBandlist].concat(
        Object.values(BandsSummary).map(summary => {
            return { Id: summary.Id, Title: `New Setlist for ${summary.Title}` } as IBandSummary;
        })
    );

    const htmlConfig = CreateSetlistHtmlAttributesConfiguration;

    const NameInput = htmlConfig.SetlistNameInput;
    const CreateButton = htmlConfig.CreateSetlistButton;

    const hanldeCreateSetlist = (event: React.FormEvent<FormControlProps>) => {
        event.preventDefault();

        const elements: any = (event.target as any).elements;

        const isBandList: boolean = elements[htmlConfig.BandSelect.ControlId].value === selectNewBandlist.Id;

        if (isBandList) {
            const bandlist: IBandCatalog = {
                Id: "",
                Title: elements[NameInput.ControlId].value,
                Songs: [],
                SonglistType: SongCatalogType.BandList
            };

            CreateBandAsync(bandlist).then(
                newBandlist => AddBandToState(newBandlist)
            )

        } else {
            const setlist: ISetCatalog = {
                Id: "",
                Title: elements[NameInput.ControlId].value,
                Songs: [],
                SonglistType: SongCatalogType.SetList,
                BandId: elements[htmlConfig.BandSelect.ControlId].value
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
                            <option key={summary.Id} value={summary.Id}>{summary.Title}</option>
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
