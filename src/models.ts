export type Item = {
  id: string;
  name: string;
  parent_id: string;
};

export type ItemWithChildren = {
  id: string;
  name: string;
  parent_id: string;
  children: ItemWithChildren[];
};

export type ItemWithChildrenIds = {
  id: string;
  name: string;
  parent_id: string;
  children_ids: string[];
};
