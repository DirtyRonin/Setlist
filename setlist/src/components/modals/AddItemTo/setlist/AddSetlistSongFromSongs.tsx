import React, { ChangeEvent, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { MenuDivider, Menu, MenuItem } from "@szhsin/react-menu";
import { History } from "history";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";


import { AddBandSongFromSongsHtmlAttributesConfiguration } from "configuration";
import { IFilterSongActionProps, ISong } from "models";
import { fetchSetlistById, fetchSongsWithFilteredExpands } from "service";
import { Header, HeaderOptions, HeaderTitle, InfinitScrollCss, NodeListCss, SearchFilterCss } from "styles/catalogStyle";
import { UseModalStyles, ActionButton } from 'styles/modalStyles';

import { Setlist, FilterSongActionProps } from "mapping";
import { mapQuery } from "utils/routeQueryHelper";
import { IsFilterableString } from "utils";
import AddButton from "components/common/AddButton/addButton";

import Node from "./node/AddSetlistSongFromSongsNode"
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { GetSongsRequestAsync } from "api/songApi";

interface IProps {
    history: History
    handleClose(): void
}

const AddSetlistSongFromSongsComponent = ({ history, handleClose }: IProps): JSX.Element => {

    const [isLoading, setLoading] = useState(false)

    const [setlist, setSetlist] = useState(Setlist.CreateEmpty());


    const [songs, setSongs] = useState<ISong[]>([]);
    const [count, setCount] = useState(0);
    const [nextLink, setNextLink] = useState('');

    const [searchQuery, setSearchQuery] = useState('');
    const [currentFilter, setFilter] = useState<IFilterSongActionProps>(FilterSongActionProps.Default({}))

    useEffect(() => {
        const query = history.location.search ?? ''
        if (query) {
            const { setlistId } = mapQuery(query)
            if (setlistId) {

                setLoading(true)
                fetchSetlistById(setlistId).then(result => {
                    setSetlist(result)

                    const newFilter = FilterSongActionProps.Default({ setlistId })
                    setFilter(newFilter)
                    fetchSongs(newFilter)
                })
            }
        }
    }, []);

    const fetchSongs = (filter: FilterSongActionProps): void => {
        fetchSongsWithFilteredExpands(filter).then(
            resolve => {
                setSongs(Array.from(resolve.Values.values()))
                setCount(resolve.Meta.Count);
                setNextLink(resolve.Meta.NextLink);
                setLoading(false)
            }
        ).catch().finally()
    }

    const handleScrollDown = () => {
        setLoading(true)
        GetSongsRequestAsync(nextLink).then(
            resolve => {
                setSongs(songs.concat(resolve.Values));
                setCount(resolve.Count);
                setNextLink(resolve.NextLink);
                setLoading(false)
            }
        );
    }

    const OnChangeQuery = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        event.preventDefault()

        const value = event.target.value
        const newFilter: IFilterSongActionProps = { ...currentFilter, filter: { ...currentFilter.filter, Query: value } }

        const refresh = IsFilterableString(currentFilter.filter.Query, newFilter.filter.Query) ? true : false

        setSearchQuery(value)

        if (refresh) {
            setLoading(true)
            setFilter(newFilter)
            fetchSongs(newFilter)
        }

    }

    const htmlConfig = AddBandSongFromSongsHtmlAttributesConfiguration;

    const Class = UseModalStyles()

    return (
        <div className={Class.root}>
            <DialogContent>
                <Header >
                    <HeaderTitle>`Add To '{setlist.title}' to...`</HeaderTitle>
                    <HeaderOptions>
                        <SearchFilterCss>
                            <TextField
                                autoFocus
                                fullWidth
                                margin="normal"
                                id='AddSongToBandModal'
                                value={searchQuery}
                                placeholder='Search...'
                                onChange={OnChangeQuery}
                                type='search'
                            />
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox color="default" />}
                                    label="Favorites Only" />
                            </FormGroup>
                        </SearchFilterCss>
                        <Menu menuButton={<div ><FontAwesomeIcon icon={['fas', "ellipsis-h"]} size="1x" /></div>}>
                            <MenuItem value="Options"  >Options*</MenuItem>
                            <MenuDivider />
                        </Menu>
                    </HeaderOptions>
                </Header>
                <NodeListCss id={htmlConfig.NodeList.ControlId} >
                    {count?.toString()}
                    <InfiniteScroll
                        dataLength={songs.length}
                        next={handleScrollDown}
                        hasMore={songs.length < count}
                        loader={<h4>Loading...</h4>}
                        scrollableTarget={htmlConfig.NodeList.ControlId}
                        style={InfinitScrollCss}
                    >
                        {!isLoading && Array.from(songs.values()).map((song, index) => (
                            <Node
                                setlist={setlist}
                                song={song}
                                key={index}
                            />
                        ))}
                    </InfiniteScroll>
                </NodeListCss>
                <AddButton onClick={() => { }} />
            </DialogContent>

            <DialogActions>
                <ActionButton onClick={handleClose}>Done</ActionButton>
            </DialogActions>
        </div>
    )


};

export default AddSetlistSongFromSongsComponent;
