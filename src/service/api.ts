import {IDir} from "../store/dataReducer/types";

export default class Api {
    private baseUrl: string = "http://localhost:3050/dir";
    public getAllDir = async () => {
        const data = await this.getResource();
        return this.transformData(data);
    }
    public createDir = async (dir: IDir) => {
        const body = {
            body: JSON.stringify(dir),
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            method: "POST",
        };
        return await this.getResource("", body);
    }
    public editDir = async (dir: IDir) => {
        const {id, ...param} = dir;
        const body = {
            body: JSON.stringify(param),
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            method: "PATCH",
        };
        return await this.getResource(`/${id}`, body);
    }
    public deleteDir = async (id: string) => {
        const body = {
            method: "DELETE",
        };
        return await this.getResource(`/${id}`, body);
    }
    private getResource = async (url?: string, body?: any) => {
        const res = await fetch(`${this.baseUrl}${url ? url : ""}`, body ? body : null);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }
        return await res.json();
    }
    private transformData = (data: any): IDir[] => {
        return data.reduce((acc: IDir[], item: IDir) => {
            const children = data.filter((i: any) => i.parent_id === item.id);
            if (children.length > 0) {
                item.children = children;
                acc.push(item);
            }
            if (children.length === 0) {
                acc.push(item);
            }
            return acc;
        }, []).filter((i: any) => i.parent_id === "null");
    }
}
