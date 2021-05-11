import React, {Dispatch} from "react";
import {ContextMenuReducerAction, IContextMenu} from "../store/contextMenuReducer/types";
import {DataReducerAction, IDataReducerState} from "../store/dataReducer/types";
import {IPopup, PopupReducerAction} from "../store/popupReducer/types";

export type RootAction =
    DataReducerAction |
    ContextMenuReducerAction |
    PopupReducerAction;

export interface IRootState {
    dataReducer: IDataReducerState;
    contextMenuReducer: IContextMenu;
    popupReducer: IPopup;
}

export interface IContextState {
    dispatch: Dispatch<RootAction>;
    state: IRootState;
}

export const ContextApp = React.createContext<Partial<IContextState>>({});
