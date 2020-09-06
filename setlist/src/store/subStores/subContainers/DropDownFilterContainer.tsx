import * as React from 'react';
import { connect } from "react-redux";
import { combineReducers } from 'redux';
import { DropDownFilterComponent } from '../../../components/layout/DropDownFilter';
import { IDropDownFilterState } from '../subReducers';
import { IUser } from '../../../models';
import { StateType } from 'typesafe-actions';

import DropDownFilterReducer from '../subReducers/DropDownFilterReducers';
import CatalogReducer from "../../reducers/catalogReducers"
import { RootState } from '../..';

export const rootDropDownFilterReducer = combineReducers({
    DropDownFilterReducer,
    CatalogReducer
  });
  
  export type RootDropDownFilterState = StateType<typeof rootDropDownFilterReducer>;

interface IDropDownFilterConnectedDispatch {

}

interface IDropDownFilterProps {
    DropDownFilter: IDropDownFilterState;
    userId: IUser
}

export type DropDownFilterProps = IDropDownFilterProps & IDropDownFilterConnectedDispatch

const mapStateToProps = (state: RootState): IDropDownFilterProps =>
    ({
        DropDownFilter: state.dropDownFilterReducer.DropDownFilterState,
        userId: state.catalogReducers.catalogState.user
    } as IDropDownFilterProps);

const mapDispatchToProps = (dispatch: React.Dispatch<any>): IDropDownFilterConnectedDispatch => {
    return {}
}

const DropDownFilter = (props: DropDownFilterProps) => (
    <div>
        <DropDownFilterComponent {...props} />
    </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(DropDownFilter);