import React, {ReactNode} from "react";
import style from "./style.module.scss";

interface IContextMenuItemProps {
    name: string;
    action: () => void;
    icon?: ReactNode;
}

const ContextMenuItem: React.FC<IContextMenuItemProps> = ({name, action, icon}) => {
    return (
        <li className={style.contextMenuItem}
            onClick={action}>
            <div className={style.contextMenuItemIcon}>
                {icon ? icon : null}
            </div>
            {name}
        </li>
    );
};

export default ContextMenuItem;
