import {combineReducers} from "../utils/combineReducers";
import contextMenuReducer from "./contextMenuReducer";
import {IContextMenu} from "./contextMenuReducer/types";
import dataReducer from "./dataReducer";
import {IDataReducerState} from "./dataReducer/types";
import popupReducer from "./popupReducer";
import {IPopup} from "./popupReducer/types";

const dataState: IDataReducerState = {
    data: [],
    error: null,
    loading: false,
};

const ctxMenuState: IContextMenu = {
    currentElement: null,
    isVisible: false,
    posX: null,
    posY: null,
};

const popupState: IPopup = {
    isVisible: false,
    type: null,
};

export const initialState = {
    contextMenuReducer: ctxMenuState,
    dataReducer: dataState,
    popupReducer: popupState,
};
export const rootReducer = combineReducers({dataReducer, contextMenuReducer, popupReducer});
