import axios, {AxiosResponse} from "axios";
import React from "react";
import {IDirectory} from "../types";

interface IPaylaodDirs {
    deeps: {[key: string]: number};
    parents: {[key: string]: string[]};
    dirs: IDirectory[];
}

export type ActionType =
    | {type: "LOAD_DIRS", payload: IPaylaodDirs}
    | {type: "SET_BANNED", payload: Set<string>}
    | {type: "SET_LOADING", payload: boolean}
    | {type: "CLOSE_POPUP"}
    | {type: "ADD_DIR", payload: IDirectory}
    | {type: "SHOW_POPUP", payload: React.ReactNode}
    | {type: "PATCH_DIR", payload: IDirectory}
    | {type: "DEL_DIR", payload: IDirectory};

// Загрузка директорий
export const loadData = async (dispatch: React.Dispatch<ActionType>) => {
    // Обход в глубину для списка директорий
    // Возвращает массив, в котором директории нахоядтся в порядке выввода на экран
    function DFS(dirs: IDirectory[]) {
        const box = dirs;
        // поиск корневой папки
        const node = dirs.filter((el) => el.parent_id === "null")[0];
        const res: IDirectory[] = [];
        const dirsInWork: IDirectory[] = [];
        const explored = new Set();
        dirsInWork.push(node);
        explored.add(node);
        while (dirsInWork.length) {
            const t: IDirectory = dirsInWork.pop()!;
            res.push(t);
            box
                .filter((n) => !explored.has(n))
                .forEach((n) => {
                    if (n.parent_id === t.id) {
                        explored.add(n);
                        dirsInWork.push(n);
                    }
                });
        }
        return res;
    }

    // устанавливает всем дир-ям видимость тру
    function setVisibility(dirs: IDirectory[]) {
        const newDir: IDirectory[] = dirs;
        for (let i = 0; i < newDir.length; i++) {
            newDir[i].visibility = true;
        }
        return newDir;
    }

    // Вычисление глубин директорий, возвращает массив глубин
    function setDeeps(dirs: IDirectory[]) {
        const deeps = {[dirs[0].id]: 0};
        for (let i: number = 1; i < dirs.length; i++) {
            if (Object.keys(deeps).indexOf(dirs[i].parent_id) !== -1) {
                deeps[dirs[i].id] = deeps[dirs[i].parent_id] + 1;
            }
            deeps[dirs[i].id] = deeps[dirs[i].parent_id] + 1;
        }
        return deeps;
    }

    // Выичиление детей родителей
    function setChilds(dirs: IDirectory[]) {
        const res: { [k: string]: string[] } = {};
        dirs.forEach((el) => {
            res[el.id] = [];
            dirs.forEach((child) => {
                if (el.id === child.parent_id) {
                    res[el.id].push(child.id);
                }
            });
        });
        return res;
    }

    // Загрузка ...
    const response = await axios.get(`${process.env.REACT_APP_API_HOST}/dir`);
    console.log(response.data.length);
        if (response.data.length !== 0) {
            const sortedDirs = DFS(response.data);
            setVisibility(sortedDirs);
            const res = {
                dirs: sortedDirs,
                parents: setChilds(sortedDirs),
                deeps: setDeeps(sortedDirs),
            };
            dispatch({type: "LOAD_DIRS", payload: res});
         } else {alert("Список директорий пуст"); }
};
// Вычисление предков, которых необходимо скрыть вместе с родителем
// Конечные ноды без предков не удаляются из сета, потому что их "дети" невидимы
// это нужно для дальнейшей корректной отрисовки
export const visibilityDir = (dispatch: React.Dispatch<ActionType>, id: string, state: any) => {
    if (state.dirs.length === 0) {
        return null;
    }
    const banedName = state.banned;
    const box: IDirectory[] = state.dirs;
    // Если индекс уже в невидимых, то делаю предков видимыми
    if (banedName.has(id)) {
        for (let i = 0; i < state.dirs.length; i++) {
            if (id === box[i].parent_id) {
                box[i].visibility = true;
            }
        }
        // удаляю id предки которого стали видимы
        banedName.delete(id);
    } else {
        // добавляю id предки которого будет невидимы
        banedName.add(id);
        for (let i = 0; i < state.dirs.length; i++) {
            if (banedName.has(state.dirs[i].parent_id)) {
                // если предок стал невидимый, то его добавляю в список родителей, предки которого будет невидимы
                banedName.add(state.dirs[i].id);
                box[i].visibility = false;
            }
        }
    }
    dispatch({type: "SET_BANNED", payload: banedName});
};

export const delDir = (dispatch: React.Dispatch<ActionType>, dir: IDirectory) => {
    axios.delete(`${process.env.REACT_APP_API_HOST}/dir/${dir.id}`).then((res) => {
        console.log(res);
        dispatch({
            type: "DEL_DIR",
            payload: dir,
        });
    });
};
export const closePopUp = (dispatch: React.Dispatch<ActionType>) => {
    dispatch({type: "CLOSE_POPUP"});
};

export const showPopUp = (dispatch: React.Dispatch<ActionType>, content: React.ReactNode) => {
    dispatch({type: "SHOW_POPUP", payload: content});
};

export const addDir = (dispatch: React.Dispatch<ActionType>, dir: IDirectory) => {
    axios.post(`${process.env.REACT_APP_API_HOST}/dir`, dir)
        .then((res: AxiosResponse<IDirectory>) => {console.log(res);
            dispatch({type: "ADD_DIR", payload: res.data});
        });

};

export const changeDir = (dispatch: React.Dispatch<ActionType>, dir: IDirectory) => {
    axios.patch(`${process.env.REACT_APP_API_HOST}/dir/${dir.id}`,
        {name: dir.name, parent_id: dir.parent_id})
        .then((res) => {console.log(res);
            dispatch({type: "PATCH_DIR", payload: res.data});
        });
};
