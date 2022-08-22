export interface ITree {
    id: string;
    name: string;
    parent_id: string;
    children?: ITree[];
}
