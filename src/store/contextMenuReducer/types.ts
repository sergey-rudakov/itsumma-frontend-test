
export interface IContextMenu {
    isVisible: boolean;
    posX: number | null;
    posY: number | null;
    currentElement: any;
}

export enum ContextMenuReducerType {
    OPEN_CONTEXT_MENU = "OPEN_CONTEXT_MENU",
    CLOSE_CONTEXT_MENU = "CLOSE_CONTEXT_MENU",
}

export interface IOpenContextMenu {
    type: ContextMenuReducerType.OPEN_CONTEXT_MENU;
    payload: IContextMenu;
}

export interface ICloseContextMenu {
    type: ContextMenuReducerType.CLOSE_CONTEXT_MENU;
}

export type ContextMenuReducerAction = IOpenContextMenu | ICloseContextMenu;
