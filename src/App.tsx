import React, {useEffect, useState} from "react";

import {getData} from "./api";
import {Folders} from "./components/Folders";
import {IData} from "./types";
import {AppContext} from "./utils/context";

import "./styles/index.scss";

const App: React.FC = () => {
    const [folders, setFolders] = useState<IData[]>([]);

    useEffect(() => {
        const fetchFolders = async () => {
           const data = await getData();
           setFolders(data as IData[]);
        };

        fetchFolders();
    }, []);

    const defaultContextValue = {folders, setFolders};

    return (
        <AppContext.Provider value={defaultContextValue}>
            <div className="app">
                <h2>Менеджер директорий</h2>
                <small className="small">Нажмите правой кнопкой мыши по папке.</small>
                <Folders />
            </div>
        </AppContext.Provider>
  );
};

export default App;
