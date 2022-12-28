import { useContext, useEffect, useState } from "react";
import DirectoryService from "../api/api-manipulation";
import { DirectoryContext } from "../context/DirectoryProvaider";
import { DircetoryI } from "../types/Dircetory";

export const useDircetory = () => {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { dataDirectory, setDataDirectory } = useContext(DirectoryContext);

  const refreshData = () => {
    setLoading(true);
    DirectoryService.getDirectory()
      .then((result) => {
        setDataDirectory(result);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => setLoading(false));
  };

  const onChange: any = {
    create: async (node: DircetoryI) => {
      await DirectoryService.createDirectory(node);
      refreshData();
    },
    remove: async (node: DircetoryI[]) => {
      try {
        await DirectoryService.removeDirectory(node);
      } finally {
        refreshData();
      }
    },
    update: async (node: DircetoryI) => {
      await DirectoryService.updateDirectory(node);
      refreshData();
    },
  };

  useEffect(() => {
    refreshData();
  }, []);

  return { dataDirectory, error, loading, onChange };
};
