import * as React from 'react';
import { connect } from "react-redux";
import { combineReducers } from 'redux';
import { GlobalBandFilterComponent } from '../../../components/layout/globalBandFilter';

import { IUser } from '../../../models';
import { StateType } from 'typesafe-actions';

import GlobalBandFilterReducer, { IGlobalBandFilterState } from '../../reducers/layoutReducers/GlobalBandFilterReducers';
import CatalogReducer from "../../reducers/catalogReducers"
import { RootState } from '../..';

export const rootGlobalBandFilterReducer = combineReducers({
    GlobalBandFilterReducer,
    CatalogReducer
  });
  
  export type RootGlobalBandFilterState = StateType<typeof rootGlobalBandFilterReducer>;

interface IGlobalBandFilterConnectedDispatch {

}

interface IGlobalBandFilterProps {
    GlobalBandFilter: IGlobalBandFilterState;
    userId: IUser
}

export type GlobalBandFilterProps = IGlobalBandFilterProps & IGlobalBandFilterConnectedDispatch

const mapStateToProps = (state: RootState): IGlobalBandFilterProps =>
    ({
        GlobalBandFilter: state.dropDownFilterReducer.GlobalBandFilterState,
        userId: state.catalogReducers.catalogState.user
    } as IGlobalBandFilterProps);

const mapDispatchToProps = (dispatch: React.Dispatch<any>): IGlobalBandFilterConnectedDispatch => {
    return {}
}

const GlobalBandFilter = (props: GlobalBandFilterProps) => (
    <div>
        <GlobalBandFilterComponent {...props} />
    </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(GlobalBandFilter);