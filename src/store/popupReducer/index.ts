import {IPopup, PopupReducerAction, popupReducerType} from "./types";

const popupReducer = (state: IPopup, action: PopupReducerAction) => {
    switch (action.type) {
        case popupReducerType.SHOW_POPUP:
            return {isVisible: true, type: action.payload};
        case popupReducerType.HIDE_POPUP:
            return {isVisible: false, type: null};
        default:
            return state;
    }
};

export default popupReducer;
