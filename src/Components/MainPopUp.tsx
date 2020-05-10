import React, {useContext} from "react";
import {closePopUp} from "../actions/actions";
import DirectoryContext from "../contexts/DirectoryContext";

const MainPopUp: React.FC = () => {
    const direcoryState = useContext(DirectoryContext);
    const dispatch = direcoryState!.dispatch;
    const state = direcoryState!.state;
    return(
        <>
            {state.popup.isOpen ? <div className={"popup"}>
                <span className={"close-btn"} onClick={() => closePopUp(dispatch)}/>
                {state.popup.content}
            </div> : null}

        </>
   );
};

export default MainPopUp;
