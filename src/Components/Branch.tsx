import React, { useState } from "react";
import { ItemWithChildren } from "../models";
import Node from "./Node";

type Props = {
  item: ItemWithChildren;
  level: number;
};

const Branch: React.FC<Props> = ({ item, level }: Props) => {
  const [selected, setSelected] = useState<boolean>(false);
  const hasChildren = item.children && item.children.length !== 0;
  const renderBranches = () => {
    if (hasChildren) {
      const newLevel = level + 1;
      return item.children.map((child) => {
        return <Branch key={child.id} item={child} level={newLevel} />;
      });
    }
    return null;
  };

  const toggleSelected = () => {
    hasChildren && setSelected((prev) => !prev);
  };

  return (
    <div>
      <Node
        item={item}
        level={level}
        onToggle={toggleSelected}
        selected={selected}
      />
      {selected && renderBranches()}
    </div>
  );
};

export default Branch;
