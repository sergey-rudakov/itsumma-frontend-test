import React, { createContext, useState } from "react";
import { DirectoryContextI } from "./context.types";


const DirectoryContext = createContext<DirectoryContextI>({
  dataDirectory: [],
  setDataDirectory: () => {},
  setdirectoryItemData: () => {},
  directoryItemData: {
    parent_id: "",
    id: "",
    method: "",
  },
});

const DirectoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [dataDirectory, setDataDirectory] = useState([]);
  const [directoryItemData, setdirectoryItemData] = useState({
    method: ''
  });

  return (
    <DirectoryContext.Provider
      value={{
        dataDirectory,
        setDataDirectory,
        directoryItemData,
        setdirectoryItemData,
      }}
    >
      {children}
    </DirectoryContext.Provider>
  );
};

export { DirectoryContext, DirectoryProvider };
