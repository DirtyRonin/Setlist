import React, { ChangeEvent, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { MenuDivider, MenuHeader, Menu, MenuItem } from "@szhsin/react-menu";
import { History } from "history";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";

import { AddSongToSetlistHtmlAttributesConfiguration } from "configuration";
import { ISetlist, IFilterSetlistActionProps, ModalTypes, setlistModalActions } from "models";
import { fetchSetlistsWithFilteredExpands, fetchSongById, ReadSetlistAsync } from "service";
import { Header, HeaderOptions, HeaderTitle, InfinitScrollCss, NodeListCss, SearchFilterCss } from "styles/catalogStyle";
import { UseModalStyles, ActionButton } from 'styles/modalStyles';

import { FilterSetlistActionProps, Song } from "mapping";
import { mapQuery } from "utils/routeQueryHelper";
import { IsFilterableString } from "utils";
import AddButton from "components/common/AddButton/addButton";

import Node from "./node/AddSongToSetlistModalNode"
import { GetSetlistsRequestAsync } from "api/setlistApi";

interface IProps {
    history: History
    handleClose: () => void
}

const AddSongToSetlistModalComponent = ({ history, handleClose }: IProps): JSX.Element => {

    const [isLoading, setLoading] = useState(false)

    const [song, setSong] = useState(Song.CreateEmpty());

    const [setlists, setSetlists] = useState<ISetlist[]>([]);
    const [count, setCount] = useState(0);
    const [nextLink, setNextLink] = useState('');

    const [searchQuery, setSearchQuery] = useState('');
    const [currentFilter, setFilter] = useState<IFilterSetlistActionProps>(FilterSetlistActionProps.Default({}))

    useEffect(() => {
        const query = history.location.search ?? ''
        if (query) {
            const mapped = mapQuery(query)
            if (mapped.id) {
                setLoading(true)
                fetchSongById(mapped.id).then(result => {
                    setSong(result)

                    const newFilter = FilterSetlistActionProps.Default({ songId: result.id })
                    setFilter(newFilter)
                    fetchSetlists(newFilter)
                })
            }
        }


    }, []);

    const htmlConfig = AddSongToSetlistHtmlAttributesConfiguration;

    const fetchSetlists = (filter: IFilterSetlistActionProps): void => {
        fetchSetlistsWithFilteredExpands(filter).then(
            resolve => {
                setSetlists(resolve.Values)
                setCount(resolve.Meta.Count);
                setNextLink(resolve.Meta.NextLink);
                setLoading(false)
            }
        ).catch().finally()
    }

    const handleScrollDown = () => {
        setLoading(true)
        GetSetlistsRequestAsync(nextLink).then(
            resolve => {
                setSetlists(setlists.concat(resolve.Values));
                setCount(resolve.Count);
                setNextLink(resolve.NextLink);
                setLoading(false)
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
            setLoading(true)
            setFilter(newFilter)
            fetchSetlists(newFilter)
        }

    }

    const handleShowAddSetlist = () => {
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
                    <HeaderTitle>`Add '{song.title}' to...`</HeaderTitle>
                    <HeaderOptions>
                        <SearchFilterCss>
                            <TextField
                                autoFocus
                                fullWidth
                                margin="normal"
                                id='AddSongToSetlistModal'
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
                {!isLoading && <NodeListCss id={htmlConfig.NodeList.ControlId} >
                    {count?.toString()}
                    <InfiniteScroll
                        dataLength={setlists.length}
                        next={handleScrollDown}
                        hasMore={setlists.length < count}
                        loader={<h4>Loading...</h4>}
                        scrollableTarget={htmlConfig.NodeList.ControlId}
                        style={InfinitScrollCss}
                    >
                        {setlists.map((setlist, index) => (
                            <Node
                                setlist={setlist}
                                song={song}
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

export default AddSongToSetlistModalComponent;