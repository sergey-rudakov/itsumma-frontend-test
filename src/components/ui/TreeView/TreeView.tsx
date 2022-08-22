import React, { useMemo, useReducer } from "react";
import { ITree } from "shared/models/ITree";
import { Node } from "./Node";
import { TreeViewProvider } from "./state/TreeView.context";
import { reducer } from "./state/TreeView.reducer";

interface ITreeView {
    data: ITree[];
    onChange: {
        create?: (node: ITree) => void;
        update?: (node: ITree) => void;
        remove?: (node: ITree[]) => void;
    };
}

const TreeView: React.FC<ITreeView> = ({ data, onChange }) => {
    const [tree, dispatch] = useReducer(reducer, data);

    const sortTree = useMemo(() => {
        const root: ITree[] = [];

        const idMapping = tree.reduce((acc, node, currentIndex) => {
            acc[node.id] = Number(currentIndex);
            return acc;
        }, {} as Record<string, number>);

        const copyTree: ITree[] = tree.map((node) => ({ ...node, children: undefined }));

        copyTree.forEach((node) => {
            if (node.parent_id === "null") {
                root.push(node);
                return;
            }
            const parentNode = copyTree[idMapping[node.parent_id]];
            parentNode.children = [...(parentNode.children || []), node];
        });

        return root;
    }, [tree]);

    return (
        <TreeViewProvider value={{ tree, dispatch, onChange }}>
            {sortTree.map((node) =>
                <Node
                    key={node.id}
                    id={node.id}>
                        {node.children}
                </Node>)}
        </TreeViewProvider>
    );
};

export { TreeView };
