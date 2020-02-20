import React from "react";
import PostContext from "./context";
import { Directory, IDirectory } from "./types";

const url: string = "http://localhost:3050/dir";

// const PostContext = React.createContext(() => {return; });

export const DirectoryComponent = (props: IDirectory) => {
    const [dir, setDir] = React.useState(props.directory);
    const update = React.useContext(PostContext);

    function reducer(state: IDirectory): IDirectory {
        const response = fetch(url, {
            method: "POST",
            // tslint:disable-next-line:object-literal-sort-keys
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(state),
        });

        return state;
    }
    const initialDir: Directory = {
        id: "0",
        title: "new",
        // tslint:disable-next-line:object-literal-sort-keys
        children: [],
        isExpanded: true,
        isRoot: false};
    function getUserInput(message: string): string | null {
        const input = window.prompt(message);

        if (input === null || input.trim() === "") {
            return null;
        } else {
            return input.trim();
        }
    }
    function showAlert(message: string): void {
        alert(message);
    }

    // component's methods
    function hasSameChild(name: string): boolean {
        return dir.children.filter((child) => child.title === name).length > 0;
    }
    function toggleExpand(): void {
        setDir((prev) => {
            return {...prev, isExpanded: !prev.isExpanded};
        });
        props.updateChildState(dir);
    }
    function addChild(): void {
        const name = getUserInput("New directory name:");
        if (name === null) {
            showAlert("Empty input. New directory isn't created");
            return;
        } else if (hasSameChild(name)) {
            showAlert("Name already exists. New directory isn't created");
            return;
        }

        setDir((prev) => {
            return {
                ...prev,
                children: prev.children.concat({...initialDir, title: name, id: Date.now().toString()})};
        });
        props.updateChildState(dir);
    }
    function renameThis(): void {
        const name = getUserInput("New directory name:");

        if (name === null) {
            showAlert("Empty input. Directory isn't renamed");
            return;
        } else if (props.isNameUnavailable(name)) {
            showAlert("Name already exists. Directory isn't renamed ");
            return;
        }

        setDir((prev) => {
            return {...prev, title: name};
        });
        props.updateChildState(dir);
    }

    // child's methods
    function deleteItem(id: string): void {
        if (!window.confirm("Are you sure you want to delete the directory?")) {
            return;
        }
        setDir((prev) => {
            return {...prev, children: prev.children.filter((child) => child.id !== id)};
        });
        props.updateChildState(dir);
    }
    // TODO fix this slow piece of crap
    function updateChildState(childState: Directory): void {
        setDir((prev) => {
            return ({
                ...prev,
                children: prev.children.map((child) => {
                    if (child.id !== childState.id) {
                        return child;
                    }
                    return childState;
                }),
            });
        });
        props.updateChildState(dir);
    }
    return (
        <>
            <div className={`dir collection-item ${dir.isRoot ? "root" : ""}`}>
                <button className={"btn-del"}
                        onClick={dir.isRoot ? () => props.postRoot(dir) : () => props.deleteThis(dir.id)}>
                    <i className={"material-icons"}>{dir.isRoot ? "save" : "close"}</i></button>
                <i className={"material-icons folder-icon"} onClick={() => addChild()}>folder_open</i>
                <span onClick={dir.isRoot ? () => {return; } : () => renameThis()}>{dir.title}</span>
                <label className={"expand"}>
                    <i className={"material-icons"}>{dir.isExpanded ? "keyboard_arrow_down" : "keyboard_arrow_left"}</i>
                    <input type="checkbox"
                           hidden={true}
                           checked={dir.isExpanded}
                           onChange={() => toggleExpand()}/></label>
            </div>

            {/*children-area*/}
            <div className={`${dir.children.length === 0 ? "" : "collection"}`}
                 hidden={!dir.isExpanded}>
                {dir.children.map((child) => {
                    return <DirectoryComponent directory={child}
                                               isNameUnavailable={hasSameChild}
                                               deleteThis={deleteItem}
                                               postRoot={() => {return; }}
                                               key={child.id}
                                               updateChildState={updateChildState}
                    />;
                })}
            </div>
        </>);
};
