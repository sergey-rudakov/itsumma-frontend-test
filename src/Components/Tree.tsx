import React from "react";
import { ItemWithChildren } from "../models";
import Branch from "./Branch";

type Props = {
  items: ItemWithChildren[];
};

const Tree: React.FC<Props> = ({ items }: Props) => {
  return (
    <div className="tree-view">
      {items.map((item) => (
        <Branch key={item.id} item={item} level={0} />
      ))}
    </div>
  );
};

export default Tree;
