import { FC, PropsWithChildren, useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface IPortal {
  className?: string;
}

const Portal: FC<PropsWithChildren<IPortal>> = ({ className, children }) => {
  const [container] = useState(() => document.createElement("div"));

  if (className) { container.classList.add(className); }

  useEffect(() => {
    const root = document.querySelector("#root");
    if (!root) { return; }
    root.appendChild(container);
    return () => {
      root.removeChild(container);
    };
  }, [container]);

  return ReactDOM.createPortal(children, container);
};

export { Portal };
