import React from "react";
import {IDir} from "../../store/dataReducer/types";
import {ContextMenuToggle} from "../context-menu";
import DirectoryItem from "./directory-item";
import style from "./style.module.scss";

interface IDirectoryProps {
    data: IDir[];
}

const Directory: React.FC<IDirectoryProps> = ({data}) => {
    return (
        <ul className={style.list}>
            {data.map((tree) => {
                return (
                    <ContextMenuToggle currentDir={tree} key={tree.id}>
                        <DirectoryItem node={tree}/>
                    </ContextMenuToggle>
                );
            })}
        </ul>
    );
};

export default Directory;
