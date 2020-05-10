import React, {useContext, useEffect, useReducer} from "react";
import {loadData} from "../actions/actions";
import DataContext from "../contexts/DataContext";
import DirectoryContext from "../contexts/DirectoryContext";
import reducer from "../reducers/reducer";
import {IDirectory} from "../types";
import Directory from "./Directory";
import MainPopUp from "./MainPopUp";

const Manager: React.FC = () => {
    const initialState = useContext(DataContext);
    const [ state, dispatch ] = useReducer(reducer, initialState);

    useEffect(() => {
        loadData(dispatch);
    }, []);
    return (
        <DirectoryContext.Provider value={{state, dispatch}}>
        <>
            {!state.isLoading ?
            <ul className={"dirs-list"}>
                {state.dirs.map((item: IDirectory, i: number) =>
                    <Directory  key={i} {...item} deep={state.deeps[item.id]}/>)}
            </ul>
            :
             <p>Идет загрузка...</p>
        }
        <MainPopUp/>
        </>
        </DirectoryContext.Provider>
    );
};

export default Manager;
