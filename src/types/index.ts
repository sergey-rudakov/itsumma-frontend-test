import React, {Dispatch, ReactElement, SetStateAction} from "react";

export interface IContextData {
    folders: IData[];
    setFolders: Dispatch<SetStateAction<IData[]>>;
}

export interface IEmptyInputName {
    type: string;
    createFolderName: string;
    editFolderName: string;
    setIsEmptyInput: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IMenuCords {
    mouseX: number | null;
    mouseY: number | null;
}

export interface IData {
    id: string;
    name: string;
    parent_id: string;
}

export interface IEditData {
    name: string;
    parent_id: string;
}

export interface ITree {
    id: string;
    name: string;
    children: ITree[];
    parent_id: string;
}

export interface IContextMenu {
    handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    handleClose: () => void;
    menuCords: IMenuCords;
    name: string;
}

export interface IFolderItems {
    name: string;
    children: ReactElement | undefined;
    objChildLength: number;
}

export interface IModalBlock {
    type: string;
    modalOpen: boolean;
    setModalOpen: Dispatch<SetStateAction<boolean>>;
    folderName: string;
}