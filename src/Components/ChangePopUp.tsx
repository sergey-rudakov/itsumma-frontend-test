import React, {FC, useContext, useEffect, useRef, useState} from "react";
import {changeDir, closePopUp, showPopUp} from "../actions/actions";
import DirectoryContext from "../contexts/DirectoryContext";
import ErrorPopUp from "./ErrorPopUp";

interface IChangePopUp {
    id: string;
    name: string;
    parent_id: string;
}

const ChangePopUp: React.FC<IChangePopUp> = ({id, name, parent_id}) => {
    const direcoryState = useContext(DirectoryContext);
    const dispatch = direcoryState!.dispatch;
    const state = direcoryState!.state;
    const [modDir, setmodDir] = useState({
        name,
        id,
        parent_id,
    });
    useEffect( () => {setmodDir({...modDir, parent_id, name, id}); }, [id]);
    const inputEl = useRef<HTMLInputElement>(null);
    const change = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (state.dirs.filter(
            (el) => el.parent_id === parent_id && el.name === modDir.name && el.id !== id).length !== 0) {
            const parentName = state.dirs.filter((el) => el.id === parent_id)[0].name;
            const error = `Каталог с именем ${modDir.name} уже существует в каталоге ${parentName}`;
            showPopUp(dispatch, <ErrorPopUp text = {error}/>);
        } else {
            changeDir(dispatch, modDir);
            closePopUp(dispatch);
        }
    };
    return(
            <form onSubmit={change} className={"change-form"}>
                <h2>Изменить директорию </h2>
                <p>{name}</p>
                <div className={"interactive-box"}>
                    <label htmlFor="name">Имя
                    <input type="text" name= "name" value={modDir.name}
                           ref={inputEl} onChange={(val) =>
                        setmodDir({...modDir, name: val.target.value})}/></label>
                    <div className={"buttons-group"}>
                        <button disabled={modDir.name === "" } type="submit">ОК</button>
                        <button onClick={() =>  closePopUp(dispatch)}>Закрыть</button>
                        </div>
                    </div>
            </form>
    );
};

export  default ChangePopUp;
