import { useEffect, useState } from "react";
import { TreeService } from "services";
import { ITree } from "shared/models/ITree";

export const useTree = () => {
    const [data, setData] = useState<ITree[]>([]);
    const [error, setError] = useState<boolean | string>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        TreeService.getTree()
            .then((result) => {
                setError(false);
                setData(result);
            })
            .catch((e) => {
                setError(e);
            })
            .finally(() => setLoading(false));
    }, []);

    const onChange = {
        create: (node: ITree) => TreeService.createNode(node),
        remove: (node: ITree[]) => TreeService.removeNode(node),
        update: (node: ITree) => TreeService.updateNode(node),
    };

    return { data, error, loading, onChange };
};
