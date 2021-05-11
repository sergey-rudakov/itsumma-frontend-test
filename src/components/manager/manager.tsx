import {faEdit, faFolderPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useContext, useEffect} from "react";
import {fetchDir} from "../../actions/data-actions";
import {showPopupCreate, showPopupDelete, showPopupEdit} from "../../actions/popup-actions";
import {ContextApp} from "../../context";
import ContextMenu, {ContextMenuItem} from "../context-menu";
import Directory from "../directory";
import ErrorIndicator from "../error-indicator";
import {ManagerPopup} from "../popup-components";
import Spinner from "../spinner";
import style from "./style.module.scss";

const Manager: React.FC = () => {
    const {state, dispatch} = useContext(ContextApp);
    const {data, error, loading} = state!.dataReducer;
    useEffect(() => {
        fetchDir(dispatch!);
    }, [dispatch]);
    return (
        <>
            <div className={style.manager}>
                {loading ? <Spinner/> : null}
                {error ? <ErrorIndicator/> : null}
                <Directory data={data!}/>
            </div>
            <ContextMenu>
                <ContextMenuItem name="Создать"
                                 action={() => dispatch!(showPopupCreate())}
                                 icon={<FontAwesomeIcon icon={faFolderPlus}/>}/>
                <ContextMenuItem name="Редактировать"
                                 action={() => dispatch!(showPopupEdit())}
                                 icon={<FontAwesomeIcon icon={faEdit}/>}/>
                <ContextMenuItem name="Удалить"
                                 action={() => dispatch!(showPopupDelete())}
                                 icon={<FontAwesomeIcon icon={faTrash}/>}/>
            </ContextMenu>
            <ManagerPopup/>
        </>
    );
};

export default Manager;
