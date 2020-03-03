import React, { useContext, useReducer, useEffect } from "react"

import AppContext from './context/AppContext'
import DataContext from './context/DataContext'
import reducer from './context/reducer'
import { fetchData } from "./context/actions";
import { convertData } from "./utils/convertData";

import DirectoryItem from "./components/DirectoryItem";

import Modal from "./components/Modal";

const App: React.FC = () => {
  const initialState = useContext(DataContext)
  const [ state, dispatch ] = useReducer(reducer, initialState)

  useEffect(() => {
    fetchData(dispatch)
  }, [])

  const directoryItems = state.data && convertData(state.data).map((dir: any) => <DirectoryItem key={ dir.id } data={ dir }/>)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <ul>
        { directoryItems }
      </ul>
      <Modal />
    </AppContext.Provider>
  );
}

export default App;
