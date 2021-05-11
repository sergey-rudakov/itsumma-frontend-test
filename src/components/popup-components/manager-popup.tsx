import React, {useContext} from "react";
import {ContextApp} from "../../context";
import {popupType} from "../../store/popupReducer/types";
import AddDirectoryPopup from "./add-directory-popup";
import DeleteDirectoryPopup from "./delete-directory-popup";
import EditDirectoryPopup from "./edit-directory-popup";

const ManagerPopup: React.FC = () => {
    const {state} = useContext(ContextApp);
    const {isVisible, type} = state!.popupReducer;
    return (
        <>
            {
                isVisible && type === popupType.create &&
                <AddDirectoryPopup/>
            }
            {
                isVisible && type === popupType.edit &&
                <EditDirectoryPopup/>
            }
            {
                isVisible && type === popupType.delete &&
                <DeleteDirectoryPopup/>
            }
        </>
    );
};

export default ManagerPopup;
