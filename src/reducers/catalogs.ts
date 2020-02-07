import { createContext, Dispatch, Reducer } from "react";
import { ActionsCatalogs, ADD_CATALOG, DELETE_CATALOG, FETCH_CATALOGS, SET_CATALOG } from "../actions/catalogs";
import { ICatalog } from "../types";

export const initialStateCatalogs: ICatalog[] = [];

export const reducerCatalogs: Reducer<ICatalog[], ActionsCatalogs> = (state, action) => {
  switch (action.type) {
    case FETCH_CATALOGS:
      return action.payload;
    case ADD_CATALOG:
      return [...state, action.payload];
    case SET_CATALOG:
      return state.map((catalog) => {
        if (catalog.id === action.payload.id) {
          return {name: action.payload.name, ...catalog};
        } else {
          return catalog;
        }
      });
    case DELETE_CATALOG:
      return state.filter((catalog) => catalog.id !== action.payload);
    default:
      return state;
  }
};

export const ContextCatalogs = createContext<[
  typeof initialStateCatalogs,
  Dispatch<ActionsCatalogs>
]>([ initialStateCatalogs, (A) => {return; } ]);
