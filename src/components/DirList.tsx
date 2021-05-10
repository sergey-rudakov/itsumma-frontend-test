import React from "react";
import IDir from "../interfaces/IDir";
import Directory from "./Directory";

interface IDirListProps {
  items: IDir[];
}

const DirList: React.FC<IDirListProps> = ({ items }) => {
  return (
    <ul>
      {items &&
        items.map((dir: IDir) => (
          <Directory
            name={dir.name}
            key={dir.id}
            id={dir.id}
            isRoot={dir.name === "root"}>
            {dir.subdirs && dir.subdirs.length ? (
              <DirList items={dir.subdirs} />
            ) : null}
          </Directory>
        ))}
    </ul>
  );
};

export default DirList;
