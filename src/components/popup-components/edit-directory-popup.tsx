import React, {FormEvent, useContext, useState} from "react";
import {hidePopup} from "../../actions/popup-actions";
import {ContextApp} from "../../context";
import {IDir} from "../../store/dataReducer/types";
import Popup from "../popup";
import {editDir, flatTree} from "./popup-methods";
import style from "./style-popup.module.scss";

const EditDirectoryPopup: React.FC = () => {
    const {state, dispatch} = useContext(ContextApp);
    const {currentElement} = state!.contextMenuReducer;
    const {data} = state!.dataReducer;
    const tree = flatTree(data);
    const [newName, setNewName] = useState<string>(currentElement.name);
    const [isEditParent, setIsEditParent] = useState<boolean>(false);
    const [parent, setParent] = useState<string | null>(currentElement.parent_id);
    const [error, setError] = useState<string | null>(null);
    const editDirectory = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (newName?.length < 1) {
            setError("Слишком короткое имя");
            return;
        }
        const newDir: IDir = {
            id: currentElement.id,
            name: newName,
            parent_id: isEditParent ? parent : currentElement.parent_id,
        };
        editDir(dispatch!, newDir);
    };
    return (
        <Popup title={`Редактировать директорию "${currentElement.name}"`}
               handleClose={() => dispatch!(hidePopup())}>
            <form className={style.form}
                  onSubmit={(event) => editDirectory(event)}>
                <input type="text"
                       placeholder="Новое имя..."
                       value={newName}
                       onFocus={(event) => event.target.select()}
                       onChange={(event) => setNewName(event.target.value)}
                       autoFocus/>
                {currentElement.parent_id === "null" ?
                    null
                    :
                    <div className={style.selectGroup}>
                        <label htmlFor="edit-catalog">
                            <input type={"checkbox"}
                                   id="edit-catalog"
                                   defaultChecked={isEditParent}
                                   onChange={() => setIsEditParent(!isEditParent)}/>
                            Переместить в каталог
                        </label>
                        <select size={5}
                                onChange={(event) => setParent(event.target.value)}
                                defaultValue={currentElement.parent_id}>
                            {
                                tree.map((item: any) => {
                                    return <option key={item.id}
                                                   value={item.id}>
                                        {item.name}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                }
                <span className={style.error}>{error}</span>
                <div className={style.buttonGroup}>
                    <button className={style.primary}>Сохранить</button>
                    <button onClick={() => dispatch!(hidePopup())}>Отмена</button>
                </div>
            </form>
        </Popup>
    );
};

export default EditDirectoryPopup;
