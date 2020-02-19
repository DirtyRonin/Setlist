import React from "react";
import { Form, Button, FormControlProps, Col } from "react-bootstrap";
import { songlist,bandlist } from "../models";
import { CreateSetlistHtmlAttributesConfiguration } from "../Configuration";

export interface ICreateSetlistProps {
    IsBandList: boolean;
    CreateBandAsync: (bandlist: bandlist) => Promise<bandlist>;
    AddBandToState: (bandlist: bandlist) => void;
}

const CreateSetlist = (props: ICreateSetlistProps): JSX.Element => {
    const { IsBandList, CreateBandAsync,AddBandToState } = props;

    const htmlConfig = CreateSetlistHtmlAttributesConfiguration;

    const NameInput = htmlConfig.SetlistNameInput;
    const CreateButton = htmlConfig.CreateSetlistButton;

    const hanldeCreateSetlist = (event: React.FormEvent<FormControlProps>) => {
        event.preventDefault();

        const elements: any = (event.target as any).elements;

        const isBandList: boolean = elements[htmlConfig.IsLibraryCheckbox.ControlId].checked;
        if (isBandList) {
            const songlist: bandlist = {
                id: "",
                title: elements[NameInput.ControlId].value,
                bandsongs: []
            };

            CreateBandAsync(songlist)
                .then(newBandlist => AddBandToState(newBandlist))
                .catch(error => console.timeLog(error));
        }
    };

    return (
        <Form onSubmit={hanldeCreateSetlist} method="GET">
            <Form.Group as={Col} md="6" controlId={NameInput.ControlId}>
                <Form.Label>{NameInput.label}</Form.Label>
                <Form.Control type="text" placeholder={NameInput.Placeholder}></Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId={htmlConfig.IsLibraryCheckbox.ControlId}>
                <Form.Check type="checkbox" defaultChecked={IsBandList} label={htmlConfig.IsLibraryCheckbox.label} />
            </Form.Group>

            <Button variant="primary" type="submit">
                {CreateButton.label}
            </Button>
        </Form>
    );
};

export default CreateSetlist;
