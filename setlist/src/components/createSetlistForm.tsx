import React from "react";
import { Form, Button, FormControlProps, Col } from "react-bootstrap";
import { setlist } from "../models/DndListModels";
import { CreateSetlistHtmlAttributesConfiguration } from "../Configuration";

export interface ICreateSetlistProps {
    IsMajorLibrary: boolean;
    CreateSetlistAsync: (setlist: setlist) => Promise<setlist>;
    AddSetlistToState: (setlist: setlist) => void;
}

const CreateSetlist = (props: ICreateSetlistProps): JSX.Element => {
    const htmlConfig = CreateSetlistHtmlAttributesConfiguration;

    const { IsMajorLibrary, CreateSetlistAsync: AsyncCreateSetlist, AddSetlistToState } = props;

    const hanldeCreateSetlist = (event: React.FormEvent<FormControlProps>) => {
        event.preventDefault();

        const elements: any = (event.target as any).elements;

        const setlist: setlist = {
            id: "",
            title: elements[htmlConfig.SetlistName.ControlId].value,
            isLibrary: elements[htmlConfig.IsLibrary.ControlId].checked,
            isMajorLibrary: elements[htmlConfig.IsMajorLibrary.ControlId].checked,
            songs: []
        };

        AsyncCreateSetlist(setlist)
            .then(newSetlist => AddSetlistToState(newSetlist))
            .catch(error => console.timeLog(error));
    };
    return (
        <Form onSubmit={hanldeCreateSetlist} method="GET">
            <Form.Group as={Col} md="4" controlId={htmlConfig.SetlistName.ControlId}>
                <Form.Label>{htmlConfig.SetlistName.label}</Form.Label>
                <Form.Control type="text" placeholder={htmlConfig.SetlistName.Placeholder}></Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="4" hidden={IsMajorLibrary} controlId={htmlConfig.IsLibrary.ControlId}>
                <Form.Check type="checkbox" defaultChecked={IsMajorLibrary} label={htmlConfig.IsLibrary.label} />
            </Form.Group>
            <Form.Group as={Col} md="4" hidden={true} controlId={htmlConfig.IsMajorLibrary.ControlId}>
                <Form.Check type="checkbox" defaultChecked={IsMajorLibrary} label={htmlConfig.IsMajorLibrary.ControlId} />
            </Form.Group>

            <Button variant="primary" type="submit">
                {`Create Setlist ${IsMajorLibrary ? "as Major Library" : ""}`}
            </Button>
        </Form>
    );
};

export default CreateSetlist;
