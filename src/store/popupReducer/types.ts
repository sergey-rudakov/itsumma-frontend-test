
export enum popupType {
    create = "create",
    edit = "edit",
    delete = "delete",
}

export interface IPopup {
    isVisible: boolean;
    type: popupType | null;
}

export enum popupReducerType {
    SHOW_POPUP = "SHOW_POPUP",
    HIDE_POPUP = "HIDE_POPUP",
}

export interface IShowPopup {
    type: popupReducerType.SHOW_POPUP;
    payload: popupType;
}

export interface IHidePopup {
    type: popupReducerType.HIDE_POPUP;
}

export type PopupReducerAction = IShowPopup | IHidePopup;
