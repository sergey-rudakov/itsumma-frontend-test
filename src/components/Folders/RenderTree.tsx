import React from "react";
import {TreeContext} from "../../utils/context";
import {FolderItems} from "./FolderItems";

export const RenderTree = (arr: any[], parentIndex: number) => {
    const treeItems = arr.map((obj, itemIndex) => {
        let children;
        const index = parentIndex - itemIndex;
        if (obj.children) {
            children = (
                <ul className={obj.parent_id === null ? "open" : ""} key={obj.name + index}>
                    { RenderTree(obj.children, index) }
                </ul>
            );
        }

        return(
            <div key={obj.name + itemIndex}>
                <TreeContext.Provider value={obj}>
                   <FolderItems
                       name={obj.name}
                       objChildLength={obj.children.length}
                       children={children}
                   />
                </TreeContext.Provider>
            </div>
        );
    });

    return treeItems;
};
