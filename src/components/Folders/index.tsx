import React, {useContext} from "react";
import {AppContext} from "../../utils/context";
import {createTree} from "../../utils/helpers/createTree";
import {RenderTree} from "./RenderTree";

import styles from "./Folders.module.scss";

export const Folders = () => {
    const {folders} = useContext(AppContext);

    const tree = createTree(folders, "id", "parent_id");

    const treeList = RenderTree(tree, 0);

    return <div className={styles.wrapper}>{treeList}</div>;
};
