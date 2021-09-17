import React, { ChangeEvent, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { MenuDivider, MenuHeader, Menu, MenuItem } from "@szhsin/react-menu";
import { History } from "history";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";

import { AddBandSongToSetlistHtmlAttributesConfiguration } from "configuration";
import { IFilterSetlistActionProps, ISetlist, ModalTypes } from "models";
import { fetchBandSongById, fetchSetlistsWithFilteredExpands, ReadSetlistAsync } from "service";
import { Header, HeaderOptions, HeaderTitle, NodeListCss, SearchFilterCss } from "styles/catalogStyle";
import { IsFilterableString, mapQuery } from "utils";
import { BandSong, FilterSetlistActionProps } from "mapping";
import { UseModalStyles, ActionButton } from 'styles/modalStyles';
import AddButton from "components/common/AddButton/addButton";

import Node from "./node/AddBandSongToSetlistModalNode"
interface IProps {
    history: History
    handleClose: () => void
}

const AddBandSongToSetlistModalComponent = ({ history, handleClose }: IProps): JSX.Element => {

    const [isLoading, setLoading] = useState(false)

    const [bandSong, setBandSong] = useState(BandSong.EmptyBandSong());

    const [setlists, setSetlists] = useState<ISetlist[]>([]);
    const [count, setCount] = useState(0);
    const [nextLink, setNextLink] = useState('');

    const [searchQuery, setSearchQuery] = useState('');
    const [currentFilter, setFilter] = useState<IFilterSetlistActionProps>(FilterSetlistActionProps.Default({}))



    useEffect(() => {
        const query = history.location.search ?? ''
        if (query) {
            const mapped = mapQueryRoute(query)
            if (mapped.id) {
                setLoading(true)
                fetchBandSongById(mapped.id).then(result => {
                    setBandSong(result)

                    const newFilter = FilterSetlistActionProps.Default({ bandSongId: result.Id })
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


    const htmlConfig = AddBandSongToSetlistHtmlAttributesConfiguration;

    const fetchSetlists = (filter: IFilterSetlistActionProps): void => {
        fetchSetlistsWithFilteredExpands(filter).then(
            resolve => {
                setSetlists(Array.from(resolve.Values.values()))
                setCount(resolve.OData.Count);
                setNextLink(resolve.OData.NextLink);
                setLoading(false)
            }
        ).catch().finally()
    }

    const handleScrollDown = () => {
        setLoading(true)
        ReadSetlistAsync(nextLink).then(
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
                {!isLoading && <NodeListCss id={htmlConfig.NodeList.ControlId} >
                    {count?.toString()}
                    <InfiniteScroll
                        dataLength={setlists.length}
                        next={handleScrollDown}
                        hasMore={setlists.length < count}
                        loader={<h4>Loading...</h4>}
                        scrollableTarget={htmlConfig.NodeList.ControlId}
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