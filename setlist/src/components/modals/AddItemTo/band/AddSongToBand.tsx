import React, { ChangeEvent, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { MenuDivider, MenuHeader, Menu, MenuItem } from "@szhsin/react-menu";
import { History } from "history";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";

import { AddSongToBandHtmlAttributesConfiguration } from "configuration";
import { IBand, IFilterBandActionProps, ModalTypes } from "models";
import { Header, HeaderOptions, HeaderTitle, InfinitScrollCss, NodeListCss, SearchFilterCss } from "styles/catalogStyle";
import { UseModalStyles, ActionButton } from 'styles/modalStyles';

import { FilterBandActionProps, Song } from "mapping";
import { mapQuery } from "utils/routeQueryHelper";
import { IsFilterableString } from "utils";
import AddButton from "components/common/AddButton/addButton";

import Node from "./node/AddSongToBandNode"
import { GetBandsRequestAsync } from "api/bandApi";
import { fetchSongById } from "service/epicServices";
import { fetchBandsWithFilteredExpands } from "service/epicServices/bandCatalogService";

export interface IAddSongToBandComponent {
    history: History
    userId: string
    handleClose(): void
}

const AddSongToBandComponent = ({ history, userId, handleClose }: IAddSongToBandComponent): JSX.Element => {

    const [isLoading, setLoading] = useState(false)

    const [song, setSong] = useState(Song.CreateEmpty());


    const [bands, setBands] = useState<IBand[]>([]);
    const [count, setCount] = useState(0);
    const [nextLink, setNextLink] = useState('');

    const [searchQuery, setSearchQuery] = useState('');
    const [currentFilter, setFilter] = useState<IFilterBandActionProps>(FilterBandActionProps.Default({}))

    useEffect(() => {
        const query = history.location.search ?? ''
        if (query) {
            const mapped = mapQuery(query)
            if (mapped.id) {
                setLoading(true)
                fetchSongById(mapped.id).then(result => {
                    setSong(result)

                    const newFilter = FilterBandActionProps.Default({ songId: result.id })
                    setFilter(newFilter)
                    fetchBands(newFilter)
                })
            }
        }
    }, []);

    const fetchBands = (filter: IFilterBandActionProps): void => {
        fetchBandsWithFilteredExpands(filter).then(
            resolve => {
                setBands(resolve.Values)
                setCount(resolve.Meta.Count);
                setNextLink(resolve.Meta.NextLink);
                setLoading(false)
            }
        ).catch().finally()
    }

    const handleScrollDown = () => {
        setLoading(true)
        GetBandsRequestAsync(nextLink).then(
            resolve => {
                setBands(bands.concat(resolve.Values));
                setCount(resolve.Count);
                setNextLink(resolve.NextLink);
                setLoading(false)
            }
        );
    }

    const OnChangeQuery = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        event.preventDefault()

        const value = event.target.value
        const newFilter: IFilterBandActionProps = { ...currentFilter, filter: { ...currentFilter.filter, Query: value } }

        const refresh = IsFilterableString(currentFilter.filter.Query, newFilter.filter.Query) ? true : false

        setSearchQuery(value)

        if (refresh) {
            setLoading(true)
            setFilter(newFilter)
            fetchBands(newFilter)
        }

    }

    const handleShowAddBand = () => {

        const type: ModalTypes = ModalTypes.New
        const pathName: string = '/bandModal'

        history.push({
            pathname: pathName,
            search: `?$type=${type}`,
            state: { background: history?.location?.state?.background ?? undefined }
        })
    }


    const htmlConfig = AddSongToBandHtmlAttributesConfiguration;

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
                                id='AddSongToBandModal'
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
                            <MenuItem value="NewBand" onClick={handleShowAddBand}>New Band</MenuItem>
                        </Menu>
                    </HeaderOptions>
                </Header>
                {!isLoading && <NodeListCss id={htmlConfig.NodeList.ControlId} >
                    {count?.toString()}
                    <InfiniteScroll
                        dataLength={bands.length}
                        next={handleScrollDown}
                        hasMore={bands.length < count}
                        loader={<h4>Loading...</h4>}
                        scrollableTarget={htmlConfig.NodeList.ControlId}
                        style={InfinitScrollCss}
                    >
                        {bands.map((band, index) => (
                            <Node
                                band={band}
                                song={song}
                                key={index}
                            />
                        ))}
                    </InfiniteScroll>
                </NodeListCss>}
                <AddButton onClick={handleShowAddBand} />
            </DialogContent>

            <DialogActions>
                <ActionButton onClick={handleClose}>Done</ActionButton>
            </DialogActions>
        </div>
    )


};

export default AddSongToBandComponent;
