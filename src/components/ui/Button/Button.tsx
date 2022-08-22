import classNames from "classnames";
import React from "react";
import button from "./Button.module.scss";

interface IButton {
    text: string;
    disabled?: boolean;
    className?: string;
    onClick?: () => void;
}

const Button = ({ className, text, disabled = false, onClick }: IButton) => {
    return (
        <button
            className={classNames(button.container, className)}
            disabled={disabled}
            onClick={onClick}>
            {text}
        </button>
    );
};

export { Button };
