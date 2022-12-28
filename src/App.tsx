import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import DirectoryManager from "./components/Directory";
import Modal from "./components/Modal/Modal";
import { ModalContext } from "./context/ModalProvaider";
import { DirectoryContext } from "./context/DirectoryProvaider";

import { useDircetory } from "./hooks/useDircetory";

const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  place-content: center;
`;

const App: React.FC = () => {
  const {dataDirectory,loading, error } = useDircetory();
  const { modalIsOpen} = useContext(ModalContext);
  return (
    <Wrapper>
      {error && <>Ошибка</>}
      {loading ? "...Загрузка" : <DirectoryManager directories={dataDirectory} />}
      {modalIsOpen && <Modal />}
    </Wrapper>
  );
};

export default App;
