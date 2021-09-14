import React, { ChangeEvent, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { MenuDivider, MenuHeader, Menu, MenuItem } from "@szhsin/react-menu";
import { History } from "history";

import { AddBandSongToSetlistHtmlAttributesConfiguration } from "configuration";
import { IBandSong, IFilterSetlistActionProps, ISetlist, ModalTypes } from "models";
import { fetchBandSongById, fetchSetlistsWithSetlistSongsByBandSongId, ReadSetlistAsync } from "service";
import { Header, HeaderOptions, HeaderTitle, NodeListCss, SearchFilterCss } from "styles/catalogStyle";

import Node from "./node/AddBandSongToSetlistModalNode"


import { IsFilterableString, mapQuery } from "utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextField from "@material-ui/core/TextField";
import { BandSong, FilterSetlistActionProps } from "mapping";
import { UseModalStyles, ActionButton } from 'styles/modalStyles';
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import AddButton from "components/common/AddButton/addButton";

interface IProps {
    history: History
    handleClose: () => void
}

const AddBandSongToSetlistModalComponent = ({ history, handleClose }: IProps): JSX.Element => {



    const TITLE = 'Add BandSong To Setlist'
    const ID = `${TITLE}_id`


    const [isLoading, setIsLoading] = useState(false)

    const [bandSong, setBandSong] = useState<IBandSong>(BandSong.EmptyBandSong());

    const [setlists, setSetlists] = useState<ISetlist[]>([]);
    const [count, setCount] = useState(0);
    const [nextLink, setNextLink] = useState('');

    const [searchQuery, setSearchQuery] = useState('');
    const [currentFilter, setFilter] = useState<IFilterSetlistActionProps>(FilterSetlistActionProps.Default())



    useEffect(() => {
        const query = history.location.search ?? ''
        if (query) {
            const mapped = mapQueryRoute(query)
            if (mapped.id) {
                setIsLoading(true)
                fetchBandSongById(mapped.id).then(result => {
                    setBandSong(result)

                    const newFilter = FilterSetlistActionProps.Default(result.Id)
                    setFilter(newFilter)
                    fetchSetlists(newFilter)
                })
            }
        }


    }, []);

    const mapQueryRoute = (query: String) => {
        const args = mapQuery(query)
        const _id = args.get('id') ?? undefined

        return { id: _id }
    }


    const addBandSongToSetlistDef = AddBandSongToSetlistHtmlAttributesConfiguration;

    const fetchSetlists = (filter: IFilterSetlistActionProps): void => {
        fetchSetlistsWithSetlistSongsByBandSongId(filter).then(
            resolve => {
                setSetlists(Array.from(resolve.Values.values()))
                setCount(resolve.OData.Count);
                setNextLink(resolve.OData.NextLink);
                setIsLoading(false)
            }
        ).catch().finally()
    }

    const handleScrollDown = () => {
        ReadSetlistAsync(nextLink).then(
            resolve => {
                setSetlists(setlists.concat(Array.from(resolve.Values.values())));
                setCount(resolve.Count);
                setNextLink(resolve.NextLink);
            }
        );
    }

    const OnChangeQuery = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        event.preventDefault()

        const value = event.target.value
        const newFilter: IFilterSetlistActionProps = { ...currentFilter, filter: { ...currentFilter.filter, Query: value } }

        const refresh = IsFilterableString(currentFilter.filter.Query, newFilter.filter.Query) ? true : false

        setSearchQuery(value)

        if (refresh) {
            setFilter(newFilter)
            fetchSetlists(newFilter)
        }

    }

    const handleShowAddSetlist = () => {

        // setModal({ showModal: true })

        const type: ModalTypes = ModalTypes.New
        const pathName: string = '/setlistModal'


        history.push({
            pathname: pathName,
            search: `?$type=${type}`,
            state: { background: history?.location?.state?.background ?? undefined }
        })
    }


    const Class = UseModalStyles()
    return (
        <div className={Class.root}>
            <DialogContent>
                <Header >
                    <HeaderTitle>`Add '{bandSong.Song.Title}' to...`</HeaderTitle>
                    <HeaderOptions>
                        <SearchFilterCss>
                            <TextField

                                autoFocus
                                fullWidth
                                margin="normal"
                                id='AddBandSongToSetlistModal'
                                value={searchQuery}
                                placeholder='Search...'
                                onChange={OnChangeQuery}
                                type='search'
                            />
                        </SearchFilterCss>
                        <Menu menuButton={<div ><FontAwesomeIcon icon={['fas', "ellipsis-h"]} size="1x" /></div>}>
                            <MenuItem value="Options"  >Options*</MenuItem>
                            <MenuDivider />
                            <MenuHeader>Edit</MenuHeader>
                            <MenuItem value="NewSetlist" onClick={handleShowAddSetlist}>New Setlist</MenuItem>
                        </Menu>
                    </HeaderOptions>
                </Header>
                {!isLoading && <NodeListCss id={addBandSongToSetlistDef.NodeList.ControlId} >
                    {count?.toString()}
                    <InfiniteScroll
                        dataLength={setlists.length}
                        next={handleScrollDown}
                        hasMore={setlists.length < count}
                        loader={<h4>Loading...</h4>}
                        scrollableTarget={addBandSongToSetlistDef.NodeList.ControlId}
                    >
                        {Array.from(setlists.values()).map((setlist, index) => (
                            <Node
                                setlist={setlist}
                                bandSong={bandSong}
                                key={index}
                            />
                        ))}
                    </InfiniteScroll>
                </NodeListCss>}
                <AddButton onClick={handleShowAddSetlist} />
            </DialogContent>

            <DialogActions>
                <ActionButton onClick={handleClose}>Done</ActionButton>
            </DialogActions>
        </div>
    )
};

export default AddBandSongToSetlistModalComponent;