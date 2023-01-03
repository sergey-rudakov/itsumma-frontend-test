import {IData, ITree} from "../../types";

export const isUniqueGeneratedName = (children: ITree[], name: string) => {
    const childNames: string[] = [];

    if (children.length !== 0) {
        children.map((item) => childNames.push(item.name));
    }

    return !childNames.includes(name);
};

export const isUniqueModifiedName = (array: IData[], name: string) => array.some((item) => item.name === name);