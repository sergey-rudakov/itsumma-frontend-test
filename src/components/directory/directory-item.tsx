import {faAngleDown, faAngleRight, faFolder} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useState} from "react";
import {IDir} from "../../store/dataReducer/types";
import Directory from "./directory";
import style from "./style.module.scss";

interface IDescription {
    name: string;
    parent_id: string;
    children?: IDir[];
}

interface IDirectoryItemProps {
    node: IDescription;
}

const DirectoryItem: React.FC<IDirectoryItemProps> = ({node}) => {
    const [childVisible, setChildVisibility] = useState<boolean>(true);
    const hasChild = !!node.children;
    return (
        <li>
            <div className={style.item}>
                {
                    hasChild ? (
                        <div className={`${style.itemToggle}`}
                             onClick={() => setChildVisibility(!childVisible)}>
                            {childVisible ? <FontAwesomeIcon icon={faAngleDown}/>
                                : <FontAwesomeIcon icon={faAngleRight}/>}
                        </div>
                    )
                        : <div className={style.itemToggle}/>

                }
                <div className={style.itemText}
                     onDoubleClick={() => setChildVisibility(!childVisible)}>
                    <FontAwesomeIcon icon={faFolder}
                                     className={style.itemIcon}/>
                    {node.name}
                </div>
            </div>

            {
                hasChild && childVisible && <div>
                    <ul>
                        <Directory data={node.children!}/>
                    </ul>
                </div>
            }

        </li>
    );
};

export default DirectoryItem;
