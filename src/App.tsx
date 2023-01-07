import React, { useEffect, useReducer } from "react";
import Tree from "./Components/Tree";
import "./App.css";
import itemsReducer, {
  ItemsAction,
  dispatchMiddleware,
  ItemsActionKind,
} from "./store/store";
import Header from "./Components/Header";

export const TreeDispatch = React.createContext<React.Dispatch<ItemsAction>>(
  () => null
);

const App: React.FC = () => {
  const [state, dispatchBase] = useReducer(itemsReducer, { items: [] });
  const dispatch = dispatchMiddleware(dispatchBase);

  useEffect(() => {
    dispatch({ type: ItemsActionKind.fetchData });
  }, []);

  return (
    <div className="App">
      <div className="menu">
        <TreeDispatch.Provider value={dispatch}>
          <Header />
          <Tree items={state.items} />
        </TreeDispatch.Provider>
      </div>
    </div>
  );
};

export default App;
