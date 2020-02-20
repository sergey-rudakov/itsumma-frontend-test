export interface IDirectory {
    directory: Directory;
    isNameUnavailable: (name: string) => boolean;
    deleteThis: (id: string) => void;
    postRoot: (root: Directory) => void;
    updateChildState: (root: Directory) => void;
}

// tslint:disable-next-line:interface-name
export interface Directory {
    id: string;
    title: string;
    children: Directory[];
    isExpanded: boolean;
    isRoot: boolean;
}
