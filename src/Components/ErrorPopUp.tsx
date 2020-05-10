import React, {FC, useContext} from "react";
import {closePopUp} from "../actions/actions";
import DirectoryContext from "../contexts/DirectoryContext";

interface IErrorPopUp {
    text: string;
}

const ErrorPopUp: React.FC<IErrorPopUp> = ({text}) => {
    const direcoryState = useContext(DirectoryContext);
    const dispatch = direcoryState!.dispatch;
    return(
        <div className={"error-popup"}>
           <h2>Ошибка</h2>
            <p>{text}</p>
            <button onClick={() => closePopUp(dispatch)}>ОК</button>
        </div>
    );
};

export  default ErrorPopUp;
