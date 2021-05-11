import React, {ReactNode, useContext} from "react";
import {ContextApp} from "../../context";
import style from "./style.module.scss";

interface IContextMenuProps {
    children?: ReactNode[];
}

const ContextMenu: React.FC<IContextMenuProps> = ({children}): React.ReactElement | null => {
    const {state} = useContext(ContextApp);
    const {posX, posY, isVisible} = state!.contextMenuReducer;
    return (
        isVisible ?
            <ul className={style.contextMenu} style={{top: `${posY}px`, left: `${posX}px`}}>
                {children}
            </ul>
            : null
    );
};

export default ContextMenu;
