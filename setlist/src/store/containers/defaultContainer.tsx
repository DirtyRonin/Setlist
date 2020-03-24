
import * as React from 'react';
import { connect } from 'react-redux';

import { HashTable } from '../../Util';
import { ISongCatalog } from '../../models';
import { RootState } from '../reducers';
import { App } from '../../App';
import { fetchSongCatalogsAsync } from '../actions';

export interface IAppState {
    catalogState:ICatalogState;
    // availableBandlists: HashTable<IBandSummary>;
}

export interface ICatalogState{
    songLists: HashTable<ISongCatalog>;
    songListOrder: string[];
}

interface IAppConnectedDispatch{
    FetchSongCatalog():void
}

export interface IAppProps extends IAppConnectedDispatch  {
    catalogState?:ICatalogState;
    // InitialStateRequest(): Promise<IAppState>;
    // ReadBandsSummaryAsync(): Promise<HashTable<IBandSummary>>;

    // CreateSongAsync(song: ISong): Promise<ISong>;
    // DeleteSongAsync(songId: string): Promise<ISong>;
    // CreateBandAsync: (band: IBandCatalog) => Promise<IBandCatalog>;
    // DeleteBandAsync(bandId: string): Promise<void>;
    // AddSongsToBandAsync(bandId: string, songIds: string[]): Promise<void>;
    // RemoveSongsFromBandAsync(bandId: string, songIds: string[]): Promise<void>;

    // AddSetlistToBandAsync: (setlist: ISetCatalog) => Promise<ISetCatalog>;
}

const mapStateToProps : (state: RootState) => 
    Partial<IAppProps> = (state:RootState):Partial<IAppProps>=>
    ({
        catalogState: state.appReducers.catalogState
    });

    const mapDispatchToProps = (dispatch:any) : IAppConnectedDispatch =>{
        return {
            FetchSongCatalog:() => dispatch(fetchSongCatalogsAsync.request())
        };
    };

    const DefaultApp = (props:IAppProps ) => (
        <div>
            <App {...props} />
        </div>
    )

export default connect(mapStateToProps,mapDispatchToProps)(DefaultApp);