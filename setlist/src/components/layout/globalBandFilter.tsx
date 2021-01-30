

import { useState, useRef } from "react";
import { FormControl, Dropdown, FormControlProps } from "react-bootstrap";
import React from "react";
import { DropDownMenuContainer } from "../../styles";
import { IHashTable } from "../../Util";
import { GlobalBandFilterProps } from "../../store/containers/layoutContainers/GlobalBandFilterContainer"



export const GlobalBandFilterComponent = (props: GlobalBandFilterProps) => {

    const {userId}= props
    const filterValues:IHashTable<string>  = {}

    const [filter, setFilter] = useState("");
    const [availableBands, setAvailableBands] = useState(['']);

    const inputRef = useRef<HTMLButtonElement>(null);

    type ButtonProps = React.ComponentPropsWithoutRef<'button'>
    type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

    const Delegate_SetFilter = (event: React.ChangeEvent<FormControlElement>) => {
        setFilter(event.target.value)
        //

    }

    const myToggle = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
        <Dropdown.Toggle type="button" ref={ref} className="ToggleMenu" >
            {props.children}
        </Dropdown.Toggle>
    ));

    const myMenu = React.forwardRef<HTMLInputElement, FormControlProps>((props, ref) => {

        return (
            <DropDownMenuContainer ref={ref} className={props.className} id="beast">
                <FormControl
                    autoFocus
                    className="mx-3 my-2 w-auto"
                    placeholder="Type to filter..."
                    onChange={props.onChange}
                    value={filter}
                />
                <ul className="list-unstyled">
                    {React.Children.toArray(props.children).filter(
                        (child) =>
                            !filter || (child as any).props.children.toLowerCase().startsWith(filter),
                    )}
                </ul>
            </DropDownMenuContainer>
        )

    });

    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle as={myToggle} id="dropdown-custom-components">
                    Select Band
                </Dropdown.Toggle>

                <Dropdown.Menu as={myMenu} onChange={Delegate_SetFilter} >
                    { Object.keys(filterValues).map(filterKey =>
                        <Dropdown.Item eventKey={filterKey}>{filterValues[filterKey]}</Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

