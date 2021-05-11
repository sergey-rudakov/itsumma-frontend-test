import {ContextMenuReducerAction, ContextMenuReducerType, IContextMenu} from "../store/contextMenuReducer/types";

export const showContextMenu = (payload: IContextMenu): ContextMenuReducerAction => {
    return {
        payload,
        type: ContextMenuReducerType.OPEN_CONTEXT_MENU,
    };
};

export const hideContextMenu = (): ContextMenuReducerAction => {
    return {
        type: ContextMenuReducerType.CLOSE_CONTEXT_MENU,
    };
};
