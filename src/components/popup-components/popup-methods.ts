import React, {FormEvent} from "react";
import {fetchDir} from "../../actions/data-actions";
import {hidePopup} from "../../actions/popup-actions";
import {RootAction} from "../../context";
import Api from "../../service/api";
import {IDir} from "../../store/dataReducer/types";

const api = new Api();

export const addDir = async (dispatch: React.Dispatch<RootAction>,
                             newDir: IDir): Promise<void> => {
    await api.createDir(newDir);
    fetchDir(dispatch);
    dispatch(hidePopup());
};

export const flatTree = (tree: any) => {
    return tree.reduce((acc: any, elem: any) => {
        return acc
            .concat([{name: elem.name, id: elem.id}])
            .concat(elem.children ? flatTree(elem.children) : []);
    }, []);
};

const findChildKey = (tree: any, key: string) => {
    return tree.reduce((acc: any, elem: any) => {
        return acc
            .concat([elem[key]])
            .concat(elem.children ? findChildKey(elem.children, key) : []);
    }, []);
};

const searchNode = (tree: any, node: any) => {
    while (tree.length) {
        const current = tree.pop();
        if (current.id === node) {
            return findChildKey([current], "id");
        }
        if (current?.children) {
            tree.push(...current.children);
        }
    }
};

export const deleteDir = async (
    dispatch: React.Dispatch<RootAction>,
    event: FormEvent<HTMLFormElement>,
    node: string,
    arr: IDir[]) => {
    event.preventDefault();
    const nodeAndChildren = searchNode(arr, node);
    while (nodeAndChildren.length > 0) {
        const id = nodeAndChildren.pop();
        await api.deleteDir(id);
    }
    await fetchDir(dispatch!);
    dispatch!(hidePopup());
};

export const editDir = async (
    dispatch: React.Dispatch<RootAction>,
    newDir: IDir) => {
    await  api.editDir(newDir);
    await fetchDir(dispatch!);
    dispatch!(hidePopup());
};
