

import React, { useEffect, useState,  forwardRef } from "react";
import { FormControl, Dropdown, FormControlProps } from "react-bootstrap";

import { DropDownMenuContainer } from "../../styles";
import { GUID_EMPTY, IHashTable, IsMiminumStringLength, QueryBuilder, FilterBuilder } from "../../Util";
import { GlobalBandFilterProps } from "../../store/containers/layoutContainers/GlobalBandFilterContainer"
import { nameof } from "ts-simple-nameof";
import { IBand, IBandUser } from "../../models";
import { ReadBandUsersAsync } from "../../service";



export const GlobalBandFilterComponent = (props: GlobalBandFilterProps) => {


    const { user, openBandSongsCatalog } = props
    const [filter, setFilter] = useState("");
    const [bands, setBands] = useState({} as IHashTable<IBand>);
    const [selectedBand, setSelectedBand] = useState({} as IBand);

    useEffect(() => {
        // check if current user has been fetched yet
        if (user.id !== GUID_EMPTY)
            fetchBandUsersAsync()
    }, [filter, user]);

    useEffect(() => {
        // check if current user has been fetched yet
        if (selectedBand.Id !== undefined)
            openBandSongsCatalog(selectedBand.Id)
    }, [selectedBand]);

    type ButtonProps = React.ComponentPropsWithoutRef<'button'>
    type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

    const Delegate_SetFilter = (event: React.ChangeEvent<FormControlElement>) => {
        setFilter(event.target.value)
    }
    const Delegate_OpenBandSongCatalog = (eventKey: string | null, e: React.SyntheticEvent<unknown>): void => {
        if (eventKey) {
            setSelectedBand(bands[eventKey])
        }
    }

    const myToggle = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
        <Dropdown.Toggle type="button" ref={ref} className="ToggleMenu" >
            {props.children}
        </Dropdown.Toggle>
    ));

    const myMenu = forwardRef<HTMLInputElement, FormControlProps>((props, ref) => {

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
                    {React.Children.toArray(props.children)}
                </ul>
            </DropDownMenuContainer>
        )

    });

    const fetchBandUsersAsync = async (): Promise<void> => {

        let query = new QueryBuilder().count()

        const filters: FilterBuilder[] = []

        const bandExpand = `${nameof<IBandUser>(x => x.Band)}`

        filters.push(new FilterBuilder().filterGuidExpression(nameof<IBandUser>(x => x.UserId), 'eq', user.id))

        if (IsMiminumStringLength(filter)) {
            filters.push(new FilterBuilder().startsWithFilterExpression(`${bandExpand}/${nameof<IBand>(x => x.Title)}`, filter))
        }

        // example expand and filter
        // https://stackoverflow.com/questions/51525409/odata-multiple-expands-and-filter
        // e.g. https://localhost:5001/odata/BandSongs/?$expand=Song&$filter=song/title eq 'No Limit'
        if (filters.length) {
            query.filter(() => filters.reduce((prev, current) => prev.and(() => current)))
        }

        query = query.orderBy(`${bandExpand}/${nameof<IBand>(x => x.Title)}`)

        query.expand(bandExpand)

        const url = query.toQuery()

        const result = await ReadBandUsersAsync(url);

        const hashBands = result.Values.reduce((acc, cur) => {
            acc[cur.Band.Title] = cur.Band;
            return acc;
        }, {} as IHashTable<IBand>);

        setBands(hashBands)
    }

    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle as={myToggle} id="dropdown-custom-components">
                    {selectedBand.Title !== undefined ? `${selectedBand.Title}` : 'Select Band'}
                </Dropdown.Toggle>

                <Dropdown.Menu as={myMenu} onChange={Delegate_SetFilter} >
                    {Object.keys(bands).map(bandId =>
                        <Dropdown.Item onSelect={Delegate_OpenBandSongCatalog} eventKey={bandId}>{bands[bandId].Title}</Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

