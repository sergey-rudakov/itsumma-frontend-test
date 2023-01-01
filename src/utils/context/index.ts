import React from "react";
import {IContextData, ITree} from "../../types";

export const AppContext = React.createContext<IContextData>({} as IContextData);
export const TreeContext = React.createContext<ITree>({} as ITree);
