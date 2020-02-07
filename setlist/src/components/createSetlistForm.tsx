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
    const { IsMajorLibrary, CreateSetlistAsync, AddSetlistToState } = props;

    const htmlConfig = CreateSetlistHtmlAttributesConfiguration;

    const NameInput = IsMajorLibrary ? htmlConfig.MajorLibraryNameInput : htmlConfig.SetlistNameInput;
    const CreateButton = IsMajorLibrary ? htmlConfig.CreateMajorLibraryButton : htmlConfig.CreateSetlistButton;

    const hanldeCreateSetlist = (event: React.FormEvent<FormControlProps>) => {
        event.preventDefault();

        const elements: any = (event.target as any).elements;

        const setlist: setlist = {
            id: "",
            title: elements[NameInput.ControlId].value,
            isLibrary: IsMajorLibrary ? IsMajorLibrary : elements[htmlConfig.IsLibraryCheckbox.ControlId].checked,
            isMajorLibrary: IsMajorLibrary,
            songs: []
        };

        CreateSetlistAsync(setlist)
            .then(newSetlist => AddSetlistToState(newSetlist))
            .catch(error => console.timeLog(error));
    };

    

    return (
        <Form onSubmit={hanldeCreateSetlist} method="GET">
            <Form.Group as={Col} md="6" controlId={NameInput.ControlId}>
                <Form.Label>{NameInput.label}</Form.Label>
                <Form.Control type="text" placeholder={NameInput.Placeholder}></Form.Control>
            </Form.Group>
            {!IsMajorLibrary && <Form.Group as={Col} md="6" controlId={htmlConfig.IsLibraryCheckbox.ControlId}>
                <Form.Check type="checkbox" defaultChecked={IsMajorLibrary} label={htmlConfig.IsLibraryCheckbox.label} />
            </Form.Group>}

            <Button variant="primary" type="submit">
                {CreateButton.label}
            </Button>
        </Form>
    );
};



export default CreateSetlist;
