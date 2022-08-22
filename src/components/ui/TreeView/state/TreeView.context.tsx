import { nanoid } from "nanoid";
import React, { createContext, useContext } from "react";
import { ITree } from "shared/models/ITree";
import { createNode, removeNode, updateNode } from "./TreeView.action";
import { IAction, recursiveSearch } from "./TreeView.reducer";

interface ITreeViewContext {
    tree: ITree[];
    dispatch: React.Dispatch<IAction>;
    onChange: {
        create?: (node: ITree) => void;
        update?: (node: ITree) => void;
        remove?: (node: ITree[]) => void;
    };
}

const TreeViewContext = createContext<ITreeViewContext | null>(null);
export const TreeViewProvider = TreeViewContext.Provider;

export const useNode = (id: string) => {
    const context = useContext(TreeViewContext);

    if (context === null) {
        throw new Error("can not `useNode` outside the `<TreeView />` component");
    }

    const { tree, dispatch, onChange } = context;
    const currentNode = tree.find((node) => node.id === id);

    if (!currentNode) {
        throw new Error(`can not find ${id} element`);
    }

    const { create, update, remove } = onChange;

    const onCreate = (name: string) => {
        const node = { id: nanoid(), parent_id: currentNode.id, name };
        if (create) { create(node); }
        dispatch(createNode(node));
    };

    const onUpdate = (name: string) => {
        const node = { ...currentNode, name };
        if (update) { update(node); }
        dispatch(updateNode(node));
    };

    const onRemove = () => {
        // Было бы лучше, если бы рекурсивное удаление директории
        const removedNodes = recursiveSearch(tree, currentNode.id);
        if (remove) { remove(removedNodes); }
        // происходило на стороне сервера

        dispatch(removeNode(
            currentNode,
        ));
    };

    return {
        currentNode,
        onCreate,
        onRemove,
        onUpdate,
        tree,
    };
};
