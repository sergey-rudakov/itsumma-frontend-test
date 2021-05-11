import React, {FormEvent, useContext, useState} from "react";
import {hidePopup} from "../../actions/popup-actions";
import {ContextApp} from "../../context";
import {IDir} from "../../store/dataReducer/types";
import Popup from "../popup";
import {addDir} from "./popup-methods";
import style from "./style-popup.module.scss";

const AddDirectoryPopup = () => {
    const {state, dispatch} = useContext(ContextApp);
    const [newDir, setNewDir] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const addDirectory = async (event: FormEvent<HTMLFormElement>, name: string) => {
        event.preventDefault();
        const dir: IDir = {
            id: +new Date() + "",
            name,
            parent_id: state?.contextMenuReducer.currentElement.id,
        };
        if (name.length < 1) {
            setError("Не может быть пустым");
            return;
        }
        addDir(dispatch!, dir);
    };
    return (
        <Popup title={"Создать директорию"}
               handleClose={() => dispatch!(hidePopup())}>
            <form className={style.form}
                  onSubmit={(event) => addDirectory(event, newDir)}>
                <input type="text"
                       autoFocus
                       placeholder={"Имя"}
                       className={style.inputText}
                       onChange={(event) => setNewDir(event.target.value)}
                       onFocus={() => setError(null)}/>
                {!!error && <span className={style.error}>{error}</span>}
                <div className={style.buttonGroup}>
                    <button className={style.primary}>Создать</button>
                    <button onClick={() => dispatch!(hidePopup())}>Отмена</button>
                </div>
            </form>
        </Popup>
    );
};

export default AddDirectoryPopup;
