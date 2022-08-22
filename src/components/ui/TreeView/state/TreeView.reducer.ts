import { ITree } from "shared/models/ITree";

export enum Action {
    CREATE_NODE = "CREATE_NODE",
    REMOVE_NODE = "REMOVE_NODE",
    UPDATE_NODE = "UPDATE_NODE",
}

export interface IAction {
    type: Action;
    node: ITree;
}

export const recursiveSearch = (state: ITree[], id: string): ITree[] => {
    return state.reduce((acc, node) => {
        if (node.id === id) { acc.push(node); }
        if (node.parent_id === id) {
            acc.push(...recursiveSearch(state, node.id));
        }
        return acc;
    }, [] as ITree[]);
};

export function reducer(state: ITree[], action: IAction) {
    switch (action.type) {
        case Action.CREATE_NODE:
            return [...state, action.node];
        case Action.UPDATE_NODE:
            return state.map((node) => {
                if (node.id === action.node.id) {
                    const newNode = { ...node };
                    newNode.name = action.node.name;
                    return newNode;
                }
                return node;
            });
        case Action.REMOVE_NODE:
            const removedNodes = recursiveSearch(state, action.node.id);
            return state.filter((node) => !removedNodes.includes(node));
        default: return [...state];
    }
}
