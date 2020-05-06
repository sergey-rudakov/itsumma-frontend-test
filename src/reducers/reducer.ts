import findLastIndex from "lodash/findLastIndex";
import {ActionType} from "../actions/actions";
import {IDirectory, IState} from "../types";

function delDir(id: string, dirs: IDirectory[]) {
  dirs = dirs.filter((el) => el.id !== id);
  const delId = new Set();
  delId.add(id);
  const newDirs = [];
  for (let i = 0; i < dirs.length; i++) {
    const curEl = dirs[i];
    if (!delId.has(curEl.parent_id)) {
      newDirs.push(curEl);
    } else {
      delId.add(curEl.id);
    }
  }
  return newDirs;
}

function patchDir(prop: IDirectory, dirs: IDirectory[]) {
  const index = dirs.findIndex((el, i) => el.id === prop.id && el.parent_id === prop.parent_id);
  dirs[index] = {...prop, visibility : true};
  return dirs;
}

function addDir(addedDir: IDirectory, dirs: IDirectory[]) {
  const index = findLastIndex(dirs, (el) => el.id === addedDir.parent_id);
  const newDir: IDirectory[] = [];
  // Делаю видимыми предков родителя, в который добили эл-т
  dirs.forEach((el) => {
    if (el.parent_id === addedDir.parent_id) {
      el.visibility = true;
      newDir.push(el);
    } else {
      newDir.push(el);
    }});
  addedDir = {...addedDir, visibility: true};
  const rightArr = newDir.slice(index + 1);
  const leftArr = newDir.slice(0, index + 1);
  leftArr.push(addedDir);
  return(leftArr.concat(rightArr));

}

export default (state: IState, action: ActionType) => {
  switch (action.type) {
    case "LOAD_DIRS": {
      return {...state,
      dirs: action.payload.dirs, isLoading: false,
      deeps: action.payload.deeps,
        parents: action.payload.parents};

    }
    case "SET_BANNED": {

        return {...state,
          banned: action.payload};

      }
    case "SET_LOADING":
      return {...state,
        isLoading: action.payload};
    case "CLOSE_POPUP": {
      return {...state,
      popup: {isOpen: false, content: ""}};
    }
    case "SHOW_POPUP": {
      return {...state,
        popup: {isOpen: true, content: action.payload}};
    }
    case "ADD_DIR": {
      const newParents = state.parents;
      newParents[action.payload.parent_id].push(action.payload.id);
      newParents[action.payload.id] = [];
      const newDeeps = state.deeps;
      newDeeps[action.payload.id] = state.deeps[action.payload.parent_id] + 1;
      // У
      const newBanned = state.banned;
      newBanned.delete(action.payload.parent_id);
      return {...state, dirs: addDir(action.payload, state.dirs),
        parents: newParents,
        deeps: newDeeps, banned: newBanned};
    }
    case "DEL_DIR": {
      const newParents = state.parents;
      newParents[action.payload.parent_id] = newParents[action.payload.parent_id]
          .filter((el) => el !== action.payload.id);
      delete newParents.id;
      return {...state, dirs: delDir(action.payload.id, state.dirs), parents: newParents};
    }
    case "PATCH_DIR": {
      return {...state, dirs: patchDir(action.payload, state.dirs)};
    }
    default:
      return state;
  }
};
