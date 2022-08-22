import "assets/styles/main.scss";
import { Aside } from "components/layout";
import { Spinner, Title, TreeView } from "components/ui";
import { useTree } from "hooks";
import React from "react";

const App: React.FC = () => {
  const { data, loading, error, onChange } =  useTree();

  return (
      <Aside>
        <Title>Ide Style</Title>
        {error && <Title variant={"h2"}>Произошла ошибка</Title>}
        {loading && !error ?
            <Spinner /> :
            <TreeView
                data={data}
                onChange={{
                    create: (node) => onChange.create(node),
                    remove: (nodes) => onChange.remove(nodes),
                    update: (node) => onChange.update(node),
                }}/>}
      </Aside>
  );
};

export default App;
