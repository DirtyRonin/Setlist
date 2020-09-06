import { combineReducers } from "redux";
import { ActionType, getType } from "typesafe-actions";
import * as actions from "../../actions/catalogActions/bandCatalogActions"
import * as common from "../../actions/commonActions"
import { IBandCatalog } from "../../../models";
import { FilterBandActionProps, BandCatalog } from "../../../mapping";

export type BandCatalogActions = ActionType<typeof common & typeof actions>;

export interface IBandCatalogState {
    bandCatalog: IBandCatalog;
}


const defaultActionProps = FilterBandActionProps.Default()
const initial: IBandCatalogState ={
    bandCatalog : BandCatalog.CreateAndUpdate(defaultActionProps.filter, { NextLink: "", Count: 0, Context: "" }, {})
} 


export default combineReducers<IBandCatalogState, BandCatalogActions>({
    bandCatalog: (state = initial.bandCatalog, action) => {
        switch (action.type) {
            case getType(actions.openBandsCatalog_New.success):
                return action.payload
            case getType(actions.fetchBandCatalog.success):
                return action.payload
            case getType(actions.fetchBandCatalogNextLink.success):
                return action.payload

            default:
                return state;
        }
    }
})