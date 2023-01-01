import React, {FC, useState} from "react";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {IContextMenu} from "../../types";
import {contextMenuItems} from "../../utils/constants/contextMenuItems";
import {ModalBlock} from "../ModalBlock";
import styles from "./ContextMenu.module.scss";

export const ContextMenu: FC<IContextMenu> = ({
    handleClick,
    handleClose,
    menuCords,
    name,
}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState("");
    const handleContextMenuItemClick = (type: string) => {
        handleClose();
        setModalType(type);
        setModalOpen(true);
    };

    return(
        <>
            <div onContextMenu={handleClick} style={{ cursor: "context-menu" }}>
                <Menu
                    keepMounted
                    open={menuCords.mouseY !== null}
                    onClose={handleClose}
                    anchorReference="anchorPosition"
                    anchorPosition={
                        menuCords.mouseY !== null && menuCords.mouseX !== null
                            ? { top: menuCords.mouseY, left: menuCords.mouseX }
                            : undefined
                    }
                >
                    {
                        contextMenuItems.map((item, i) => (
                            <MenuItem
                                key={item + i}
                                className={styles.item}
                                onClick={() => handleContextMenuItemClick(item)}
                            >{item}</MenuItem>
                        ))
                    }
                </Menu>
            </div>
            <div>
                {
                    modalOpen ?
                        <ModalBlock
                            type={modalType}
                            setModalOpen={setModalOpen}
                            modalOpen={modalOpen}
                            folderName={name}
                        />
                        : null
                }
            </div>
        </>
    );
};
