import React, {FC, useContext, useEffect, useState} from "react";
import {closePopUp, delDir} from "../actions/actions";
import DirectoryContext from "../contexts/DirectoryContext";
import {IDirectory} from "../types";
import ChangePopUp from "./ChangePopUp";
interface IDel {
    id: string;
    name: string;
    parent_id: string;
}

const DelPopup: React.FC<IDel> = ({id, name, parent_id}) => {
    const direcoryState = useContext(DirectoryContext);
    const dispatch = direcoryState!.dispatch;
    const state = direcoryState!.state;
    return(
        <div className={"del-popup"}>
            <h2>Удалить?</h2>
            <p>Папка {name} будет удалена</p>
            <div className={"buttons-group"}>
                <button onClick={() => {delDir(dispatch, {id, parent_id, name}); closePopUp(dispatch);}}>Да</button>
                <button onClick={() => closePopUp(dispatch)}>Нет</button>
            </div>
        </div>
    );
};

export  default DelPopup;
