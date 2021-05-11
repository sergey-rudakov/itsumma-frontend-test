export interface IDir {
    id: string;
    name: string;
    parent_id: string;
    children?: IDir[];
}

export interface IDataReducerState {
    data: IDir[] | null;
    loading: boolean;
    error: string | null;
}

export enum DataReducerActionType {
    FETCH_DIR = "FETCH_DIR",
    FETCH_DIR_SUCCESS = "FETCH_DIR_SUCCESS",
    FETCH_DIR_FAILURE = "FETCH_DIR_FAILURE",
}

interface IFetchDir {
    type: DataReducerActionType.FETCH_DIR;
}

interface IFetchDirSuccess {
    type: DataReducerActionType.FETCH_DIR_SUCCESS;
    payload: IDir[];
}

interface IFetchDirFailure {
    type: DataReducerActionType.FETCH_DIR_FAILURE;
    payload: string;
}

export type DataReducerAction = IFetchDir
    | IFetchDirSuccess
    | IFetchDirFailure;
