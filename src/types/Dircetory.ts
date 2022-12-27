export interface DircetoryI {
    id?: string;
    name: string;
    parent_id: string;
    children?: DircetoryI[];
}   
