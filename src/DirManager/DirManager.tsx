import React from "react";
import {DirectoryComponent} from "./DirectoryComponent";
import {Directory} from "./types";

const url: string = "http://localhost:3060/dir";

interface IFetchObject {
    id: string;
    name: string;
    parent_id: string | null;
}

interface IRootReady {
    directory: Directory;
    isReady: boolean;
}

export default function DirManager() {
    const initialState: IRootReady = {
        directory: {
            id: Date.now().toString(),
            title: "Root",
            // tslint:disable-next-line:object-literal-sort-keys
            children: [],
            isRoot: true,
            isExpanded: true,
        },
        isReady: false,
    };
    const [rootReady, setRootReady] = React.useState(initialState);

    function transformTreeToRender(items: IFetchObject[], parent: Directory): void {
        // console.log(parent.title);
        // if (items.length === 1) {
        //     return items;
        // } // exit point
        // items = items.slice(1);
        // console.log(items);
        // const itemToPush: Directory = {
        //     id: items[0].id,
        //     title: items[0].name,
        //     // tslint:disable-next-line:object-literal-sort-keys
        //     isRoot: false,
        //     isExpanded: true,
        //     children: [],
        // };
        // // console.log(`${items[1].parent_id} ${itemToPush.id}`)
        // if (items.length > 1 && items[1].parent_id === itemToPush.id) {
        //     items = transformTreeToRender(items, itemToPush);
        // }
        // parent.children.push(itemToPush);
        // items = transformTreeToRender(items, parent);
        // return items;
        // console.log("Im here!")
        items.filter((item) => item.parent_id === parent.id).map((item) => {
            parent.children.push({
                id: item.id,
                title: item.name,
                // tslint:disable-next-line:object-literal-sort-keys
                isRoot: false,
                isExpanded: true,
                children: [],
            });
        });
        items = items.filter((item) => item.parent_id !== parent.id);
        parent.children.map((child) => {
            transformTreeToRender(items, child);
        });
    }
    function getDirs() {
        const root: Directory = {id: "", title: "", children: [], isRoot: true, isExpanded: true};
        fetch(url)
            .then((res) => res.json())
            .then((res) => {
                root.id = res[0].id;
                root.title = res[0].name;
                transformTreeToRender(res.slice(1), root);
                // console.log(root);
                return root;
            })
            .then((res) => {
                setRootReady({directory: res, isReady: true});
            })
        ;

        return root;
    }

    function transformTreeToSend(children: Directory[], parentId: string, out: IFetchObject[]): void {
        children.forEach((child) => {
            alert(`${child.title} ${child.children.length}`);
            if (child.children.length !== 0) {
                transformTreeToSend(child.children, child.id, out);
            }
            out.push({id: child.id, name: child.title, parent_id: parentId});
        });
    }
    function postDirs(rootState: Directory): void {
        const items: IFetchObject[] = [];
        const root: IFetchObject = {
            id: rootState.id,
            name: rootState.title,
            parent_id: "null"};

        items.push(root);
        if (rootState.children.length !== 0) {
            transformTreeToSend(rootState.children, rootState.id, items);
        }

        items.map((item) => {
            fetch(url, {
                method: "PUT",
                // tslint:disable-next-line:object-literal-sort-keys
                headers: {
                    "Content-type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(item),
            });
        });
    }

    getDirs();
    return (
        <div className={"dir-manager"} >
            <div className={"collection root"}>
                {
                    rootReady.isReady ?
                        (<DirectoryComponent
                        // 'directory = initialRoot' to test interface. 'directory = getDirs()' to test fetching
                        directory={rootReady.directory}
                        deleteThis={() => {return; }}
                        isNameUnavailable={() => true}
                        postRoot={postDirs}
                        updateChildState={() => {return; }}/>) : (<p>получение данных с сервера</p>)
                }
            </div>
        </div>
    );
}