import { Icon } from "@material-ui/core";
import classNames from "classnames";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../App";
import IDir from "../interfaces/IDir";
import ButtonGroup from "./ButtonGroup";

interface IDirectoryProps {
  isRoot?: boolean;
  name: string;
  id: string;
  children?: IDir[] | any;
}

const Directory: React.FC<IDirectoryProps> = ({
  isRoot,
  name,
  children,
  id,
}) => {
  const [opened, setOpened] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const { dirs } = useContext(AppContext);
  const [activeDir, setActiveDir] = useState<IDir>({
    id: "",
    name: "",
    parent_id: "",
  });
  const dirRef = useRef<HTMLLIElement>(null);

  const clickDirHandler = () => {
    setOpened(!opened);
    setActive(true);

    const active = dirs?.find((dir: IDir) => dir.id === dirRef.current!.id);
    setActiveDir(
      (prev): IDir => ({
        ...prev,
        ...active,
      })
    );
  };

  const outsideClickHandler = (event: MouseEvent): void => {
    const path = event.composedPath();

    if (path[1] !== dirRef.current!) {
      setActive(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", outsideClickHandler);
  }, []);

  useEffect(() => {
    localStorage.setItem("activeDir", JSON.stringify(activeDir));
  }, [activeDir]);

  return (
    <li
      ref={dirRef}
      id={id}
      className={classNames("directory", {
        "active": active,
        "directory--root": isRoot,
        "opened": opened,
      })}>
      <div className="directory__head" onClick={clickDirHandler}>
        <Icon className="directory__arrow">chevron_right</Icon>
        <span className="directory__name">{name}</span>
        {isRoot && <ButtonGroup />}
      </div>

      {children}
    </li>
  );
};

export default Directory;
