import React, {useContext, useEffect} from "react";
import {hideContextMenu, showContextMenu} from "../../actions/context-menu-actions";
import {ContextApp} from "../../context";
import {IContextMenu} from "../../store/contextMenuReducer/types";
import {IDir} from "../../store/dataReducer/types";

interface ICtxMenuProps {
    children: React.ReactElement;
    currentDir: IDir;
}

const ContextMenuToggle: React.FC<ICtxMenuProps> = ({children, currentDir}) => {
    const {dispatch} = useContext(ContextApp);
    const findElement = (event: React.MouseEvent<HTMLDivElement>, node: IDir) => {
        event.stopPropagation();
        event.preventDefault();
        const ctxMenuProps: IContextMenu = {
            currentElement: node,
            isVisible: true,
            posX: event.clientX,
            posY: event.clientY,
        };
        dispatch!(showContextMenu(ctxMenuProps));
    };
    useEffect(() => {
        function toggleCtxMenu() {
            dispatch!(hideContextMenu());
        }
        document.addEventListener("click", toggleCtxMenu);
        return () => document.removeEventListener("click", toggleCtxMenu);
    }, [dispatch]);
    return (
        <div onContextMenu={(event) => findElement(event, currentDir)}>
            {children}
        </div>
    );
};

export default ContextMenuToggle;
