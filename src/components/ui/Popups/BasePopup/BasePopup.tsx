import { Portal } from "components/layout";
import React, { PropsWithChildren } from "react";
import popup from "./BasePopup.module.scss";

interface IBasePopup {
    children: React.ReactElement;
    isShow: boolean;
    containerRef: React.Ref<HTMLDivElement>;
}

const BasePopup: React.FC<PropsWithChildren<IBasePopup>> = ({ children, isShow, containerRef }) => {
    if (!isShow) {
        return null;
    }

    return (
        <Portal className={popup.background}>
            <div ref={containerRef} className={popup.container}>
                {children}
            </div>
        </Portal>
    );
};

export { BasePopup };
