import { Item, ItemWithChildren, ItemWithChildrenIds } from "../models";

export enum ItemsActionKind {
  fetchData = "fetch",
  replaceItems = "replace",
  editItem = "edit",
  deleteItem = "delete",
  createItem = "create",
}

export type Payload = {
  id?: string;
  name?: string;
  parent_id?: string;
  items?: ItemWithChildren[];
};

export type ItemsAction = {
  type: ItemsActionKind;
  payload?: Payload;
};

type ItemsState = {
  items: ItemWithChildren[];
};

export const dispatchMiddleware = (dispatch: React.Dispatch<ItemsAction>) => {
  return async (action: ItemsAction) => {
    const { type, payload } = action;

    const fetchData = async () => {
      const res = await fetch("/dir");
      const data = await res.json();
      return getDataWithChildren(transformData(data));
    };

    const fetchAndReplace = async () => {
      const data = await fetchData();
      dispatch({
        type: ItemsActionKind.replaceItems,
        payload: { items: data },
      });
    };

    switch (type) {
      case ItemsActionKind.fetchData:
        {
          try {
            fetchAndReplace();
          } catch (err) {
            alert("Fetching data failed");
          }
        }
        break;
      case ItemsActionKind.editItem:
        {
          await fetch(`/dir/${payload?.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: payload?.name }),
          });
          fetchAndReplace();
        }
        break;
      case ItemsActionKind.deleteItem:
        {
          const res = await fetch("/dir");
          const dataFromServer: Item[] = await res.json();
          const idsRemove: string[] | undefined = getIdsRemove(
            dataFromServer,
            payload?.id
          );
          const promises: any = [];
          if (idsRemove) {
            idsRemove.forEach((id) => {
              const prom = fetch(`/dir/${id}`, {
                method: "DELETE",
              });
              promises.push(prom);
            });
            Promise.all(promises).then(() => {
              fetchAndReplace();
            });
          }
        }
        break;
      case ItemsActionKind.createItem:
        {
          await fetch(`/dir`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: payload?.name,
              parent_id: payload?.id,
            }),
          });
          fetchAndReplace();
        }
        break;
      default: {
        return dispatch(action);
      }
    }
  };
};

const itemsReducer = (state: ItemsState, action: ItemsAction) => {
  const { type, payload } = action;
  switch (type) {
    case ItemsActionKind.replaceItems:
      if (payload && payload.items) return { items: payload.items };
      return state;
    default:
      return state;
  }
};

const isNotUndefined = (
  el: ItemWithChildren | undefined
): el is ItemWithChildren => {
  return el !== undefined;
};

const getIdsRemove = (data: Item[], id: string | undefined) => {
  if (!id) return;
  const idsRemove: string[] = [];
  _getIdsRemoveHelper(data, id, idsRemove);
  idsRemove.push(id);
  return idsRemove;
};

const _getIdsRemoveHelper = (
  data: Item[],
  id: string | undefined,
  idsRemove: string[]
) => {
  data.forEach((item) => {
    if (id === item.parent_id && !idsRemove.includes(item.id)) {
      idsRemove.unshift(item.id);
      _getIdsRemoveHelper(data, item.id, idsRemove);
    }
  });
};

const _buildTree = (
  data: Record<string, ItemWithChildrenIds>,
  id: string
): ItemWithChildren | undefined => {
  const item: ItemWithChildrenIds | undefined = data[id];
  if (!item) return;
  const children: ItemWithChildren[] = item?.children_ids
    .map((childId: string) => _buildTree(data, childId))
    .filter(isNotUndefined);
  return {
    id: item.id,
    name: item.name,
    parent_id: item.parent_id,
    children: children,
  };
};

const transformData = (data: Item[]): Record<string, ItemWithChildrenIds> => {
  const nodeById = data.reduce(
    (map: Record<string, ItemWithChildrenIds>, item: Item) => {
      map[item.id] = {
        id: item.id,
        name: item.name,
        parent_id: item.parent_id,
        children_ids: [],
      };
      return map;
    },
    {}
  );
  data.forEach((item) => {
    if (item.parent_id === "null") return;
    nodeById[item.parent_id].children_ids.push(item.id);
  });
  return nodeById;
};

const getDataWithChildren = (
  data: Record<string, ItemWithChildrenIds>
): ItemWithChildren[] => {
  const rootIds: string[] = Object.values(data)
    .filter((el) => el.parent_id === "null" || el.parent_id === null)
    .map((el) => el.id);
  const dataWithChildren: ItemWithChildren[] = rootIds
    .map((id) => _buildTree(data, id))
    .filter(isNotUndefined);
  return dataWithChildren;
};

export default itemsReducer;
