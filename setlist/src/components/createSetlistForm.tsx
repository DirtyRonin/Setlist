import React from "react";
import { Form, Button, FormControlProps, Col, Row, InputGroup } from "react-bootstrap";
import { IBandCatalog, CatalogType, IBandSummary, ISetCatalog } from "../models";
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
    const { BandsSummary, CreateBandAsync, AddBandToState, AddSetlistToBandAsync, AddSetlistToState } = props;

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
                SonglistType: CatalogType.BandList,
                Filter: {
                    Title: "",
                    Artist: "",
                    Genre: "",
                    Evergreen: false,
                    Nineties: false
                },
                ToBeUpdated: false
            };

            CreateBandAsync(bandlist).then(
                newBandlist => AddBandToState(newBandlist)
            )

        } else {
            const setlist: ISetCatalog = {
                Id: "",
                Title: elements[NameInput.ControlId].value,
                Songs: [],
                SonglistType: CatalogType.SetList,
                BandId: elements[htmlConfig.BandSelect.ControlId].value,
                Filter: {
                    Title: "",
                    Artist: "",
                    Genre: "",
                    Evergreen: false,
                    Nineties: false
                },
                ToBeUpdated: false
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
                    <InputGroup>
                        <Form.Control type="search" placeholder={NameInput.Placeholder} />
                    </InputGroup>
                </Col>

            </Form.Group>

            <Form.Group as={Row} controlId={htmlConfig.BandSelect.ControlId}>
                <Form.Label column md="3">
                    {htmlConfig.BandSelect.label}
                </Form.Label>
                <Form.Control as="select" column md="9">
                    {newSelect.map(summary => (
                        <option key={summary.Id} value={summary.Id}>{summary.Title}</option>
                    ))}
                </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
                {CreateButton.label}
            </Button>
        </Form>
    );
};

export default CreateSetlist;
