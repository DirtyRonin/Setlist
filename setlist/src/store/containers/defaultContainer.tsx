
import * as React from 'react';
import { connect } from 'react-redux';

import { RootState, ICatalogState } from '../reducers';
import { App } from '../../App';
import { initialStateAsync, INewSong, newSongAsync } from '../actions';

interface IAppConnectedDispatch{
    initialState():void,
    newSong(props:INewSong):void
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
        catalogState: state.catalogReducers.catalogState
    });

    const mapDispatchToProps = (dispatch:any) : IAppConnectedDispatch =>{
        return {
            initialState:() => dispatch(initialStateAsync.request()),
            newSong:(props:INewSong) => dispatch(newSongAsync.request(props))
        };
    };

    const DefaultApp = (props:IAppProps ) => (
        <div>
            <App {...props} />
        </div>
    )

export default connect(mapStateToProps,mapDispatchToProps)(DefaultApp);