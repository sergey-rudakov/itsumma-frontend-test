import { Button, TextInput, Title } from "components/ui";
import React, {useCallback, useEffect, useState} from "react";
import { BasePopup } from "../BasePopup";
import { useOutside } from "../useOutside";
import inputPopup from "./InputPopup.module.scss";

interface IInputPopup {
    title: string;
    initValue?: string;
    validation?: (value: string) => boolean;
    onSubmit: (value: string) => void;
    onClose: () => void;
}

const InputPopup = ({ initValue, title, validation, onSubmit, onClose }: IInputPopup) => {
    const [value, setValue] = useState<string>(initValue ? initValue : "");
    const [error, setError] = useState<string | boolean>(false);
    const { ref, isShow, setIsShow } = useOutside(true);

    useEffect(() => !isShow ? onClose() : setIsShow(true), [isShow, onClose, setIsShow]);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentValue = e.target.value;
        if (!(!(validation) || validation(currentValue))) {
            setError("Такой элемент уже существует");
        } else {
            setError(false);
        }
        setValue(currentValue);
    };

    const onPopupSubmit = useCallback(() => {
            setIsShow(!isShow);
            onSubmit(value);
        }, [isShow, onSubmit, setIsShow, value],
    );

    return (
        <BasePopup containerRef={ref} isShow={isShow}>
            <div className={inputPopup.container}>
                <Title variant={"h4"} className={inputPopup.title}>{title}</Title>
                <div className={inputPopup.control}>
                    <TextInput className={inputPopup.input} error={error}
                               value={value} onChange={onInputChange} />
                    <Button disabled={error as boolean} text={"Сохранить"} onClick={onPopupSubmit}/>
                </div>
            </div>
        </BasePopup>
    );
};

export { InputPopup };
