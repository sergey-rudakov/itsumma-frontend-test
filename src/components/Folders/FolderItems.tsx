import React, {FC, useState} from "react";
import {IFolderItems, IMenuCords} from "../../types";
import {initialState} from "../../utils/constants/menuCords";
import {ContextMenu} from "../ContextMenu";

import styles from "./Folders.module.scss";

export const FolderItems: FC<IFolderItems> = ({
  name,
  children,
  objChildLength,
}) => {
    const [openMenuItem, setOpenMenuItem] = useState(false);
    const [menuCords, setMenuCords] = useState<IMenuCords>(initialState);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        setMenuCords({
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
        });
    };

    const handleClose = () => {
        setMenuCords(initialState);
    };
    const handleMenuItemClick = () => {
        setOpenMenuItem(!openMenuItem);
    };

    return(
        <li className={styles.inner}>
            <div className={styles.field} onClick={handleMenuItemClick} onContextMenu={handleClick}>
                <div>{name}</div>
                {
                    objChildLength !== 0 ?
                        <img
                            src={openMenuItem ? "images/caret-up.svg" : "images/caret-down.svg"}
                            alt={name}
                            className={styles.arrow}
                        />
                        : null
                }
            </div>
            {
                openMenuItem ?
                <div>{children}</div>
                : null
            }
            <ContextMenu
                menuCords={menuCords}
                handleClick={handleClick}
                handleClose={handleClose}
                name={name}
            />
        </li>
    );
};
