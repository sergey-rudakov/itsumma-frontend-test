import axios, { Axios } from "axios";
import { DircetoryI } from "../types/Dircetory";

class DirectoryService {
  apiAxios: Axios;
  constructor() {
    this.apiAxios = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    });
  }

  async getDirectory(): Promise<DircetoryI[]> {
    try {
      const { data } = await this.apiAxios.get<DircetoryI[]>("/dir");
      return data;
    } catch (error) {
      throw new Error("Error");
    }
  }

  async createDirectory(node: DircetoryI): Promise<DircetoryI> {
    try {
      const { data } = await this.apiAxios.post<DircetoryI>("/dir", {
        ...node,
      });
      return data;
    } catch (error) {
      throw new Error("Error");
    }
  }

  async updateDirectory(node: DircetoryI): Promise<DircetoryI> {
    try {
      const { data } = await this.apiAxios.patch<DircetoryI>(
        `/dir/${node.id}`,
        {
          ...node,
        }
      );
      return data;
    } catch (error) {
      throw new Error("Error");
    }
  }

  async removeDirectory(nodes: DircetoryI[]) {
    try {
      await axios.all(
        nodes.map(async (node: DircetoryI) => {
          try {
            await this.apiAxios.delete(`/dir/${node.id}`);
          } catch (e) {
            throw new Error("Error");
          }
        })
      );
    } catch (error) {
      throw new Error("Error");
    }
  }
}

export default new DirectoryService();
