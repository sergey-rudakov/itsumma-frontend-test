import { Icon, Tooltip } from "@material-ui/core";
import React from "react";

interface IButtonProps {
  tooltip: string;
  children: string;
  clickHandler?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<IButtonProps> = ({
  tooltip,
  children,
  clickHandler,
}) => {
  return (
    <button className="button" onClick={clickHandler}>
      <Tooltip title={tooltip}>
        <Icon className="button__icon material-icons-outlined">{children}</Icon>
      </Tooltip>
    </button>
  );
};

export default Button;
