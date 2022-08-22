import { ITree } from "shared/models/ITree";
import { Action } from "./TreeView.reducer";

export const createNode = (node: ITree) => {
    return {
        node,
        type: Action.CREATE_NODE,
    };
};

export const updateNode = (node: ITree) => {
    return {
        node,
        type: Action.UPDATE_NODE,
    };
};

export const removeNode = (node: ITree) => {
    return {
        node,
        type: Action.REMOVE_NODE,
    };
};
