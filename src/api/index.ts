import axios from "axios";
import {IData, IEditData} from "../types";

export const API_URL = "http://localhost:3050/dir";

export const getData = async () => {
    try {
        const { data } = await axios.get<IData[]>(API_URL);

        return data;
    } catch (err) {
        console.error(err);
    }
};

export const postData = async (data: IData) => {
    try {
        const node = await axios.post(API_URL, data);
        alert("Данные сохранены");
        return node;
    } catch (err) {
        console.error(err);
    }
};

export const editData = async (id: string, data: IEditData) => {
    try {
        const node = await axios.patch(`${API_URL}/${id}`, data);
        alert("Данные изменены");
        return node;
    } catch (err) {
        console.error(err);
    }
};

export const deleteData = async (id: string) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (err) {
        console.error(err);
    }
}