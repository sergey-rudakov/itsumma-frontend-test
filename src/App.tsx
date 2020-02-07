import React, { FunctionComponent, useEffect, useReducer } from "react";
import { actionFetchCatalogs } from "./actions/catalogs";
import "./App.css";
import Catalog from "./components/Catalog";
import Message from "./components/Message";
import { ContextCatalogs, initialStateCatalogs, reducerCatalogs } from "./reducers/catalogs";
import { ContextMessage, initialStateMessage, reducerMessage } from "./reducers/message";
import { ICatalog } from "./types";

const App: FunctionComponent = () => {
  const [catalogsState, catalogsDispatch] = useReducer(reducerCatalogs, initialStateCatalogs);
  const [messageState, messageDispatch] = useReducer(reducerMessage, initialStateMessage);

  useEffect(() => {
    fetch("http://localhost:3050/dir")
      .then((res) => res.json())
      .then((data: ICatalog[]) => catalogsDispatch(actionFetchCatalogs(data)));
  }, []);

  return (
    <ContextCatalogs.Provider value={[ catalogsState, catalogsDispatch ]}>
      <ContextMessage.Provider value={[ messageState, messageDispatch ]}>
        <div style={{ marginLeft: -40 }}>
          {catalogsState.map((catalog: ICatalog) => catalog.parent_id === "null" && (
            <Catalog key={catalog.id} {...catalog} />
          ))}
        </div>

        {messageState.show && <Message />}
      </ContextMessage.Provider>
    </ContextCatalogs.Provider>
  );
};

export default App;
