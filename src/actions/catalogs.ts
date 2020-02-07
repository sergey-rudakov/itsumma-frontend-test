import { ICatalog } from "../types";

interface IActionFetchCatalogs {
  type: typeof FETCH_CATALOGS;
  payload: ICatalog[];
}
interface IActionAddCatalogs {
  type: typeof ADD_CATALOG;
  payload: ICatalog;
}
interface IActionSetCatalog {
  type: typeof SET_CATALOG;
  payload: {
    id: string;
    name: string;
  };
}
interface IActionDeleteCatalogs {
  type: typeof DELETE_CATALOG;
  payload: string;
}
export type ActionsCatalogs =
  | IActionFetchCatalogs
  | IActionAddCatalogs
  | IActionSetCatalog
  | IActionDeleteCatalogs;

export const FETCH_CATALOGS = "FETCH_CATALOGS";
export const ADD_CATALOG = "ADD_CATALOG";
export const SET_CATALOG = "SET_CATALOG";
export const DELETE_CATALOG = "DELETE_CATALOG";

export const actionFetchCatalogs = (catalogs: ICatalog[]): IActionFetchCatalogs => ({
  payload: catalogs,
  type: FETCH_CATALOGS,
});
export const actionAddCatalog = (catalog: ICatalog): IActionAddCatalogs => ({
  payload: catalog,
  type: ADD_CATALOG,
});
export const actionSetCatalog = (props: {id: string, name: string}): IActionSetCatalog => ({
  payload: props,
  type: SET_CATALOG,
});
export const actionDeleteCatalogs = (id: string): IActionDeleteCatalogs => ({
  payload: id,
  type: DELETE_CATALOG,
});
