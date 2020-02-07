import { createContext, Dispatch, Reducer } from "react";
import { ActionsMessage, CLOSE_MESSAGE, NEW_MESSAGE } from "../actions/message";

type fn = () => void;

interface IMessageReducerState {
  fun: any;
  show: boolean;
  value: string;
}

export const initialStateMessage: IMessageReducerState = {
  fun: null,
  show: false,
  value: "",
};

export const reducerMessage: Reducer<IMessageReducerState, ActionsMessage> = (state, action) => {
  switch (action.type) {
    case NEW_MESSAGE:
      return {show: true, ...action.payload};
    case CLOSE_MESSAGE:
      return initialStateMessage;
    default:
      return state;
  }
};

export const ContextMessage = createContext<[
  typeof initialStateMessage,
  Dispatch<ActionsMessage>
]>([ initialStateMessage, () => {return; } ]);
