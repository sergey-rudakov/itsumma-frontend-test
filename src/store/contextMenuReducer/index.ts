import {ContextMenuReducerAction, ContextMenuReducerType, IContextMenu} from "./types";

const contextMenuReducer = (state: IContextMenu, action: ContextMenuReducerAction) => {
    switch (action.type) {
        case ContextMenuReducerType.OPEN_CONTEXT_MENU:
            return {...action.payload};
        case ContextMenuReducerType.CLOSE_CONTEXT_MENU:
            return {...state, isVisible: false, posY: null, posX: null};
        default:
            return state;
    }
};

export default contextMenuReducer;
