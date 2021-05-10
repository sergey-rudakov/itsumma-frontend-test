import React, { createContext, useEffect, useState } from "react";
import DirList from "./components/DirList";
import IDir from "./interfaces/IDir";

function getRoot(data: IDir[]) {
  return data.filter((item: IDir) => item.parent_id === "null");
}

function getChild(data: IDir[], parentId: string) {
  const children = data.filter((item: IDir) => item.parent_id === parentId);
  children.forEach((child: IDir) => {
    child.subdirs = getChild(data, child.id);
  });
  return children;
}

function getTree(data: IDir[]) {
  return getRoot(data).map((item: IDir) => {
    item.subdirs = getChild(data, item.id);
    return item;
  });
}

interface ContextProps {
  dirs: IDir[];
  setDirs: any;
}

export const AppContext = createContext<Partial<ContextProps>>({
  dirs: [],
  setDirs: () => {},
});

const App: React.FC = () => {
  const [dirs, setDirs] = useState<IDir[]>([]);
  const [tree, setTree] = useState<IDir[]>([]);

  useEffect(() => {
    fetch("http://localhost:3050/dir")
      .then((data: Response) => data.json())
      .then((json: IDir[]) => {
        setDirs([...dirs, ...json]);
      });
  }, []);

  useEffect(() => {
    setTree(getTree(dirs));
  }, [dirs]);

  return (
    <AppContext.Provider value={{ dirs, setDirs }}>
      <div className="app">
        <div className="wrapper">
          <DirList items={tree} />
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default App;
