import {Modal} from "@material-ui/core";
import React, {FC, useCallback, useContext, useEffect, useState} from "react";
import {IModalBlock} from "../../types";

import {deleteData, editData, getData, postData} from "../../api";
import {CREATE_FOLDER, DELETE_FOLDER, EDIT_FOLDER} from "../../utils/constants/contextMenuItems";
import {AppContext, TreeContext} from "../../utils/context";
import {generateId} from "../../utils/helpers/generateId";
import {getModalStyle} from "../../utils/helpers/getModalStyle";
import {isEmptyInputName} from "../../utils/helpers/isEmptyInputName";
import {
    isUniqueGeneratedName,
    isUniqueModifiedName,
} from "../../utils/helpers/isUniqueName";
import styles from "./ModalBlock.module.scss";

export const ModalBlock: FC<IModalBlock> = ({
    type,
    modalOpen,
    setModalOpen,
    folderName,
}) => {
    const [modalStyle] = useState(getModalStyle);
    const [createFolderName, setCreateFolderName] = useState("");
    const [editFolderName, setEditFolderName] = useState(folderName);
    const [isEmptyInput, setIsEmptyInput] = useState(false);
    const {id, parent_id, children} = useContext(TreeContext);
    const {folders, setFolders} = useContext(AppContext);

    const btnName = type.split(" ")[0];

    useEffect(() => {
        isEmptyInputName({type, createFolderName, editFolderName, setIsEmptyInput});
    }, [type, createFolderName, editFolderName, setIsEmptyInput]);

    const handleClose = () => {
        setModalOpen(false);
    };

    const handleCreateName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;

        setCreateFolderName(value);
    }, []);

    const handleChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;

        setEditFolderName(value);
    }, []);

    const isCreateFolderType = type === CREATE_FOLDER;

    const handleClick = useCallback(async () => {
        switch (type) {
            case CREATE_FOLDER:
                if (createFolderName === "") {
                    alert("Введите название папки");
                    return;
                } else if (isUniqueGeneratedName(children, createFolderName)) {
                    await postData({
                            id: isCreateFolderType ? generateId() : id,
                            name: createFolderName,
                            parent_id: isCreateFolderType ? id : parent_id,
                    });
                    setModalOpen(false);
                    } else {
                        alert("Папка с таким именем есть в директории");
                    }
                getData()
                    .then((r) => {
                        if (r !== undefined) {
                            setFolders(r);
                        }
                    })
                    .catch((err) => console.error(err));
                break;
            case EDIT_FOLDER:
                if (editFolderName === "") {
                    alert("Введите название папки");
                    return;
                } else if (!isUniqueModifiedName(folders, editFolderName)) {
                    await editData(id, {
                        name: editFolderName,
                        parent_id,
                    });
                    setModalOpen(false);
                } else {
                    alert("Папка с таким именем есть в директории");
                }
                getData()
                    .then((r) => {
                        if (r !== undefined) {
                            setFolders(r);
                        }
                    })
                    .catch((err) => console.error(err));
                break;

            case DELETE_FOLDER:
                await deleteData(id);
                if (children) {
                    await Promise.allSettled(
                        children.map(async (child) => (
                            await deleteData(child.id)
                        )),
                    );
                }
                setModalOpen(false);
                getData()
                    .then((r) => {
                        if (r !== undefined) {
                            setFolders(r);
                        }
                    })
                    .catch((err) => console.error(err));
                break;
        }
    }, [
        children,
        createFolderName,
        setFolders,
        folders,
        editFolderName,
        id,
        isCreateFolderType,
        parent_id,
        type,
        setModalOpen,
    ]);

    return(
            <div>
                <Modal
                    open={modalOpen}
                    onClose={handleClose}
                >
                    <div className={styles.modal} style={modalStyle}>
                        <div className={styles.header}>
                            <div>{type}</div>
                            <div onClick={handleClose} className={styles.close}>
                                <img
                                    src="/images/close-icon.svg"
                                    alt="close"
                                />
                            </div>
                        </div>
                        <div className={styles.content}>
                            {
                                type === CREATE_FOLDER ?
                                    <input onChange={handleCreateName} value={createFolderName} />
                                    : null
                            }
                            {
                                type === EDIT_FOLDER ?
                                    <input onChange={handleChangeName} value={editFolderName} />
                                    : null
                            }
                            {
                                type === DELETE_FOLDER ?
                                    <div>Вы действительно хотите удалить папку?</div>
                                    : null
                            }
                        </div>
                        <div>
                            <button
                                disabled={isEmptyInput}
                                onClick={handleClick}
                            >{btnName}</button>
                        </div>
                    </div>
                </Modal>
            </div>
    );
};
