import * as React from 'react';
import { connect } from "react-redux";
import { GlobalBandFilterComponent } from '../../../components/layout/globalBandFilter';

import { IUser } from '../../../models';

import { IGlobalBandFilterState } from '../../reducers/layoutReducers/GlobalBandFilterReducers';
import { RootState } from '../..';
import * as Action from '../../actions/catalogActions/bandSongCatalogActions';

interface IGlobalBandFilterConnectedDispatch {
    openBandSongsCatalog(bandId: string): void
    closeBandSongsCatalog(): void
}

interface IGlobalBandFilterProps {
    GlobalBandFilter: IGlobalBandFilterState;
    user: IUser
}

export type GlobalBandFilterProps = IGlobalBandFilterProps & IGlobalBandFilterConnectedDispatch

const mapStateToProps = (state: RootState): IGlobalBandFilterProps =>
    ({
        GlobalBandFilter: state.dropDownFilterReducer.GlobalBandFilterState,
        user: state.userReducers.user
    } as IGlobalBandFilterProps);

const mapDispatchToProps = (dispatch: React.Dispatch<any>): IGlobalBandFilterConnectedDispatch => {
    return {
        openBandSongsCatalog: (bandId: string) => dispatch(Action.setBandIdForBandSong(bandId)),
        closeBandSongsCatalog: () => dispatch(Action.closeBandSongsCatalog()),
    }
}

const GlobalBandFilter = (props: GlobalBandFilterProps) => (
    <div>
        <GlobalBandFilterComponent {...props} />
    </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(GlobalBandFilter);