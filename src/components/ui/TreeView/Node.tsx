import classNames from "classnames";
import React, { PropsWithChildren, useState } from "react";
import {
    MdAddCircleOutline,
    MdRemove,
    MdRemoveCircleOutline,
} from "react-icons/all";
import { ITree } from "shared/models/ITree";
import { NodeCRUD } from "./NodeCRUD";
import { useNode } from "./state/TreeView.context";
import treeView from "./TreeView.module.scss";

interface INode {
    id: string;
    children?: ITree[];
}

const Node: React.FC<PropsWithChildren<INode>> = ({ children, id }) => {
    const [opened, setOpened] = useState<boolean>(false);
    const { currentNode } = useNode(id);

    const nodeIcon = () => {
        if (children) {
            return opened ? <MdRemoveCircleOutline className={treeView.openIcon} /> :
                <MdAddCircleOutline className={treeView.openIcon} />;
        }
        return <MdRemove className={treeView.openIcon} />;
    };

    const nodeStyle = classNames(
        treeView.container,
        children ? treeView.node : treeView.children,
    );

    return (
        <div>
            <div className={nodeStyle}>
                {nodeIcon()}
                <div className={treeView.title} onClick={() => setOpened(!opened)}>{currentNode.name}</div>
                <NodeCRUD id={currentNode.id} />
            </div>
            {opened &&
                <div style={{ marginLeft: "10px" }}>
                    {children && children.map((node) =>
                        <Node
                            key={node.id}
                            id={node.id}>
                                {node.children}
                        </Node>)}
                </div>}
        </div>
    );
};

export { Node };
