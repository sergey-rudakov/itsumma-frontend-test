import React from "react";
import ButtonCreate from "./ButtonCreate";
import ButtonDelete from "./ButtonDelete";
import ButtonEdit from "./ButtonEdit";

interface IButtonGroupProps {
  active?: string;
}

const ButtonGroup: React.FC<IButtonGroupProps> = () => {
  return (
    <ul className="button-group">
      <li>
        <ButtonCreate />
      </li>
      <li>
        <ButtonEdit />
      </li>
      <li>
        <ButtonDelete />
      </li>
    </ul>
  );
};

export default ButtonGroup;
