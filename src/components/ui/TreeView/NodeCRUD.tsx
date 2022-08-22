import React, { useState } from "react";
import { MdAdd, MdDeleteOutline, MdOutlineEdit } from "react-icons/all";
import { DialogPopup, InputPopup } from "../Popups";
import { useNode } from "./state/TreeView.context";
import { Action } from "./state/TreeView.reducer";
import treeView from "./TreeView.module.scss";

interface INodeCRUD {
    id: string;
}

interface IPopup {
    title: string;
    isShow: boolean;
    type: Action;
}

const NodeCRUD = ({ id }: INodeCRUD) => {
    const { currentNode, tree, onCreate, onRemove, onUpdate } = useNode(id);
    const [popup, setPopup] = useState<IPopup>({
        isShow: false,
        title: "Создание директории",
        type: Action.CREATE_NODE,
    });

    const validation = (value: string) => {
        return !tree.find((node) => node.name === value);
    };

    const renderPopup = () => {
        switch (popup.type) {
            case Action.CREATE_NODE:
                return <InputPopup
                            validation={validation}
                            title={popup.title}
                            onClose={() => setPopup({ ...popup, isShow: false})}
                            onSubmit={(name) => onCreate(name)} />;
            case Action.UPDATE_NODE:
                return <InputPopup
                            validation={validation}
                            initValue={currentNode.name}
                            title={popup.title}
                            onClose={() => setPopup({ ...popup, isShow: false})}
                            onSubmit={(name) => onUpdate(name)} />;
            case Action.REMOVE_NODE:
                return <DialogPopup
                            title={popup.title}
                            onClose={() => setPopup({ ...popup, isShow: false})}
                            onAccess={() => onRemove()} />;
        }
    };

    return (
        <div className={treeView.crudIcons}>
            {popup.isShow && renderPopup()}
            <MdAdd
                onClick={() => setPopup({ title: "Создание директории", type: Action.CREATE_NODE, isShow: true })}
                className={treeView.addIcon} />
            <MdOutlineEdit
                onClick={() => setPopup({ title: "Редактирование директории", type: Action.UPDATE_NODE, isShow: true })}
                className={treeView.editIcon} />
            {currentNode.parent_id !== "null" &&
                <MdDeleteOutline
                    onClick={() => setPopup({ title: "Удалить директорию?", type: Action.REMOVE_NODE, isShow: true })}
                    className={treeView.deleteIcon} />}
        </div>
    );
};

export { NodeCRUD };
