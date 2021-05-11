import React from "react";
import Api from "../service/api";
import {DataReducerAction, DataReducerActionType, IDir} from "../store/dataReducer/types";

const dataRequested = (): DataReducerAction => {
    return {
        type: DataReducerActionType.FETCH_DIR,
    };
};

const dataLoaded = (payload: IDir[]): DataReducerAction => {
    return {
        payload,
        type: DataReducerActionType.FETCH_DIR_SUCCESS,
    };
};

const dataError = (error: string): DataReducerAction => {
    return {
        payload: error,
        type: DataReducerActionType.FETCH_DIR_FAILURE,
    };
};

const api = new Api();
export const fetchDir = async (dispatch: React.Dispatch<DataReducerAction>): Promise<void> => {
    dispatch(dataRequested());
    api.getAllDir()
        .then((data) => dispatch(dataLoaded(data)))
        .catch((err) => dispatch(dataError(err)));
};
