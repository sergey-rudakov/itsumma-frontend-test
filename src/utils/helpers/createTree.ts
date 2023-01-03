export function createTree(arr: any[], idProp: string, parentProp: string) {
    const treeObj = Object.fromEntries(arr.map((n) => [ n[idProp], { ...n, children: [] } ]));

    return Object
        .values(treeObj)
        .filter((item: any) => !(treeObj[item[parentProp]] && treeObj[item[parentProp]].children.push(item)));
}