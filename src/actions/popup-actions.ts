import {PopupReducerAction, popupReducerType, popupType} from "../store/popupReducer/types";

export const showPopupCreate = (): PopupReducerAction => {
    return {
        payload: popupType.create,
        type: popupReducerType.SHOW_POPUP,
    };
};

export const showPopupEdit = (): PopupReducerAction => {
    return {
        payload: popupType.edit,
        type: popupReducerType.SHOW_POPUP,
    };
};

export const showPopupDelete = (): PopupReducerAction => {
    return {
        payload: popupType.delete,
        type: popupReducerType.SHOW_POPUP,
    };
};

export const hidePopup = (): PopupReducerAction => {
    return {
        type: popupReducerType.HIDE_POPUP,
    };
};
