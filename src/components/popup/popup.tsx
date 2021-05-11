import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {ReactNode} from "react";
import style from "./style.module.scss";

interface IPopupProps {
    children?: ReactNode;
    title: string;
    handleClose: () => void;
}

const Popup: React.FC<IPopupProps> = ({children, title, handleClose}) => {
    return (
        <div className={style.popupWrap}
             onClick={handleClose}>
            <div className={style.popup}
                 onClick={(event) => event.stopPropagation()}>
                <div className={style.popupHeader}>
                    <span className={style.popupTitle}>
                    {title}
                    </span>
                    <div className={style.popupClose}
                         onClick={handleClose}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </div>
                </div>
                <div className={style.popupBody}>
                    {children ? children : null}
                </div>
            </div>
        </div>
    );
};

export default Popup;
