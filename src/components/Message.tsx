import React, { FunctionComponent, useContext } from "react";
import { actionCloseMessage } from "../actions/message";
import { ContextMessage } from "../reducers/message";

const Message: FunctionComponent = () => {
  const [stateMessage, dispatchMessage] = useContext(ContextMessage);

  const handleclick = (type: boolean) => {
    if (type) {
      stateMessage.fun();
    }

    dispatchMessage(actionCloseMessage());
  };

  return (
    <div className="message">
      <p className="message__value">
        {stateMessage.value}
      </p>
      <div className="message__buttons">
        <button
          className="message__button message__button-ok"
          onClick={() => handleclick(true)}
        >OK</button>
        <button
          className="message__button message__button-close"
          onClick={() => handleclick(false)}
        >CANCEL</button>
      </div>
    </div>
  );
};

export default Message;
