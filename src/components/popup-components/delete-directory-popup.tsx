import React, {useContext} from "react";
import {hidePopup} from "../../actions/popup-actions";
import {ContextApp} from "../../context";
import Popup from "../popup";
import {deleteDir} from "./popup-methods";
import style from "./style-popup.module.scss";

const DeleteDirectoryPopup = () => {
    const {dispatch, state} = useContext(ContextApp);
    const {data} = state?.dataReducer!;
    const {currentElement} = state?.contextMenuReducer!;
    return (
        <Popup title={`Удалить директорию...`}
               handleClose={() => dispatch!(hidePopup())}>
            {currentElement.parent_id === "null" ?
                <div className={style.form}>
                    <span className={style.error}>
                        Невозможно удалить родительскую дирректорию!!!
                    </span>
                    <button style={{marginTop: "12px"}}
                            onClick={() => dispatch!(hidePopup())}>
                        Закрыть
                    </button>
                </div>
                :
                <form className={style.form}
                      onSubmit={(event) => deleteDir(dispatch!, event, currentElement.id, data!)}>
                <span>
                    Вы действительно хотите удалить директорию <strong>"{currentElement.name}"</strong>
                </span>
                    <div className={style.buttonGroup}>
                        <button className={style.primary}> Удалить</button>
                        <button onClick={() => dispatch!(hidePopup())}>Отмена</button>
                    </div>
                </form>
            }
        </Popup>
    );
};

export default DeleteDirectoryPopup;
