import { Button, Title } from "components/ui";
import React, {useEffect} from "react";
import { BasePopup } from "../BasePopup";
import { useOutside } from "../useOutside";
import dialogPopup from "./DialogPopup.module.scss";

interface IInputPopup {
    title: string;
    onAccess: () => void;
    onClose: () => void;
}

const DialogPopup = ({ title, onAccess, onClose }: IInputPopup) => {
    const { ref, isShow, setIsShow } = useOutside(true);
    useEffect(() => !isShow ? onClose() : setIsShow(true), [isShow, onClose, setIsShow]);

    return (
        <BasePopup containerRef={ref} isShow={isShow}>
            <div className={dialogPopup.container}>
                <Title variant={"h4"} className={dialogPopup.title}>{title}</Title>
                <div className={dialogPopup.control}>
                    <Button className={dialogPopup.agree} text={"Да"} onClick={onAccess}/>
                    <Button className={dialogPopup.deny} text={"Нет"} onClick={() => setIsShow(!isShow)}/>
                </div>
            </div>
        </BasePopup>
    );
};

export { DialogPopup };
