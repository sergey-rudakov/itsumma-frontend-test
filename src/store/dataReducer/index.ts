import {DataReducerAction, DataReducerActionType, IDataReducerState} from "./types";

const dataReducer = (state: IDataReducerState, action: DataReducerAction) => {
    switch (action.type) {
        case DataReducerActionType.FETCH_DIR:
            return {...state, loading: true};
        case DataReducerActionType.FETCH_DIR_SUCCESS:
            return {data: action.payload, loading: false, error: null};
        case DataReducerActionType.FETCH_DIR_FAILURE:
            return {data: null, loading: false, error: action.payload};
        default:
            return state;
    }
};

export default dataReducer;
