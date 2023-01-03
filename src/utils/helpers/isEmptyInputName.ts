import {IEmptyInputName} from "../../types";
import {CREATE_FOLDER, DELETE_FOLDER, EDIT_FOLDER} from "../constants/contextMenuItems";

export const isEmptyInputName = (
    {type, createFolderName, editFolderName, setIsEmptyInput}: IEmptyInputName,
) => {
    if (type === CREATE_FOLDER && createFolderName.length !== 0) {
        setIsEmptyInput(false);
    } else if (type === EDIT_FOLDER && editFolderName.length !== 0) {
        setIsEmptyInput(false);
    } else if (type !== DELETE_FOLDER) {
        setIsEmptyInput(true);
    } else {
        setIsEmptyInput(false);
    }
};
