import React, {Reducer, useMemo, useReducer} from "react";
import {ContextApp, IContextState, IRootState, RootAction} from "../../context";
import {initialState, rootReducer} from "../../store";
import Manager from "../manager";

const App = () => {
    const [state, dispatch] = useReducer<Reducer<IRootState, RootAction>>(rootReducer, initialState);
    useMemo(() => [state, dispatch], [state]);
    const ContextState: IContextState = {
        dispatch,
        state,
    };
    return (
        <ContextApp.Provider value={ContextState}>
            <Manager/>
        </ContextApp.Provider>
    );
};

export default App;
