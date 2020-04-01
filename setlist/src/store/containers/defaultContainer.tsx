
import * as React from 'react';
import { connect } from 'react-redux';

import { RootState, ICatalogState } from '../reducers';
import { App } from '../../App';
import {  newSong, fetchSongCatalog, setCatalogState } from '../actions';
import { createEmptySongCatalog } from '../../service';
import { INewSongActionProps, IFilterSongActionProps } from '../../models';

interface IAppConnectedDispatch {
    setCatalogState(catalogState: ICatalogState): void,
    newSong(props: INewSongActionProps): void
    fetchSongCatalog(props:IFilterSongActionProps): void
}

interface IStateProps{
    catalogState: ICatalogState;
    createEmptySongCatalog:() => ICatalogState ;
}

export type AppProps = IStateProps & IAppConnectedDispatch;

// const mapStateToProps : (state: RootState)  => 
//     Partial<AppProps> = (state: RootState) :Partial<AppProps> =>
//     ({
//         catalogState: state.catalogReducers.catalogState,
//         createEmptySongCatalog
//     } );
 
        
const mapStateToProps = (state: RootState) : IStateProps =>    
        ({
            catalogState: state.catalogReducers.catalogState,
            createEmptySongCatalog
        } as IStateProps);

const mapDispatchToProps = (dispatch: React.Dispatch<any>): IAppConnectedDispatch => {
    return {
        setCatalogState: (catalogState: ICatalogState) => dispatch(setCatalogState(catalogState)),
        newSong: (props: INewSongActionProps) => dispatch(newSong.request(props)),
        fetchSongCatalog: (props:IFilterSongActionProps) => dispatch(fetchSongCatalog.request(props)),
    };
};



const DefaultApp = (props: AppProps) => (
    <div>
        <App {...props} />
    </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(DefaultApp);