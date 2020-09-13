import { combineReducers } from "redux";
import { ActionType, getType } from "typesafe-actions";
import * as actions from "../../actions/catalogActions/bandCatalogActions"
import * as common from "../../actions/commonActions"
import { IBandCatalog, NodeTypes } from "../../../models";
import { FilterBandActionProps, BandCatalog } from "../../../mapping";

export type BandCatalogActions = ActionType<typeof common & typeof actions>;

export interface IBandCatalogState {
    bandCatalog: IBandCatalog;
}

export type BandState = {
    bandState: IBandCatalogState
}

const defaultActionProps = FilterBandActionProps.Default()
const initial: BandState = {
    bandState: {
        bandCatalog: BandCatalog.CreateAndUpdate(defaultActionProps.filter, { NextLink: "", Count: 0, Context: "" }, {}, NodeTypes.Initial)
    }
}

export default combineReducers<BandState, BandCatalogActions>({
    bandState: (state = initial.bandState, action) => {
        switch (action.type) {
            case getType(actions.openBandsCatalog_New.success):
                return { ...state, bandCatalog: action.payload }
            case getType(actions.fetchBandCatalog.success):
                return { ...state, bandCatalog: action.payload }
            case getType(actions.fetchBandCatalogNextLink.success):
                return { ...state, bandCatalog: action.payload }
            case getType(actions.closeBandsCatalog.success):
                return initial.bandState
            default:
                return state;
        }
    }
})