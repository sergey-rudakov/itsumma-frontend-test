interface IActionNewMessage {
  payload: {
    fun: VoidFunction;
    value: string;
  };
  type: typeof NEW_MESSAGE;
}
interface IActionCloseMessage {
  type: typeof CLOSE_MESSAGE;
}
export type ActionsMessage = IActionNewMessage | IActionCloseMessage;

export const NEW_MESSAGE = "NEW_MESSAGE";
export const CLOSE_MESSAGE = "CLOSE MESSAGE";

export const actionNewMessage = (props: {fun: VoidFunction, value: string}): IActionNewMessage => ({
  payload: props,
  type: NEW_MESSAGE,
});
export const actionCloseMessage = (): IActionCloseMessage => ({ type: CLOSE_MESSAGE });
