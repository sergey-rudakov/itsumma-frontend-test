import axios from "axios";
import { ITree } from "shared/models/ITree";

const config = axios.create({
    baseURL: `http://localhost:3050/dir/`,
});

export const TreeService = {
    async getTree() {
        try {
            const { data } = await config.get<ITree[]>("");
            return data;
        } catch (e) {
            throw new Error("Ошибка");
        }
    },

    async createNode(node: ITree) {
        try {
            const { data } = await config.post<ITree>("", { ...node });
            return data;
        } catch (e) {
            throw new Error("Ошибка");
        }
    },

    async updateNode(node: ITree) {
        try {
            const { data } = await config.patch<ITree>(node.id, { ...node });
            return data;
        } catch (e) {
            throw new Error("Ошибка");
        }
    },

    // Было бы лучше, если бы рекурсивное удаление директории происходило на стороне сервера
    async removeNode(nodes: ITree[]) {
        try {
            return await Promise.all(nodes.map(async (node) => {
                return await config.delete(node.id);
            }));
        } catch (e) {
            throw new Error("Ошибка");
        }
    },
};
