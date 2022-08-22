import classNames from "classnames";
import React from "react";
import textInput from "./TextInput.module.scss";

interface ITextInput {
    className?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string | boolean;
}

const TextInput: React.FC<ITextInput> = ({ className, value, error = false, onChange }) => {
    return (
        <div className={textInput.container}>
            {error && <div className={textInput.error}>{error}</div>}
            <input
                value={value}
                onChange={onChange}
                type="text"
                className={classNames(textInput.field, className)} />
        </div>
    );
};

export { TextInput };
