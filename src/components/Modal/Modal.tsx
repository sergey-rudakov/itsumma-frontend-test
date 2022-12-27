import axios from "axios";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { DirectoryContext } from "../../context/DirectoryProvaider";
import { useDircetory } from "../../hooks/useDircetory";
import { ModalContext } from "../../context/ModalProvaider";
import { DirectoryItemCircle } from "../Directory/DirectoryItemHeader";

const ModalWrapper = styled.div`
  width: 100%;
  height: 100vh;
  left: 0;
  display: grid;
  place-content: center;
  position: fixed;
`;
const ModalOverlay = styled.div`
  background: #00000054;
  width: 100%;
  position: absolute;
  z-index: -1;
  height: 100%;
`;

const ModalBody = styled.div`
  min-width: 300px;
  padding: 10px 20px 20px;
  position: relative;
  background: white;
  border-radius: 25px;
  > p {
    margin: -10px 0px 10px;
    color: red;
  }
`;

const ModalClose = styled(DirectoryItemCircle)`
  position: absolute;
  cursor: pointer;
  right: -10px;
  background: white;
  top: -10px;
`;

const Flex = styled.div`
  display: flex;
  input {
    width: 100%;
  }
  button {
    padding: 5px 10px;
  }
`;

const Modal: React.FC = () => {
  const { closeModal, modalContent, SetmodalContent } =
    useContext(ModalContext);

  const { directoryItemData, dataDirectory } = useContext(DirectoryContext);
  const { parent_id, id, method } = directoryItemData;
  const { onChange } = useDircetory();

  const [checkDuplicate, setCheckDupliacte] = useState(false);

  const inputSetValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetmodalContent({
      ...modalContent,
      input: e.target.value,
    });
    if (method == "create") {
      const searchDupliace = dataDirectory.find(
        (d) => d.name === e.target.value
      );
      searchDupliace ? setCheckDupliacte(true) : setCheckDupliacte(false);
    }
  };

  const modalBtnClick = () => {
    closeModal();
    const date = new Date().getTime();
    const checkMethod = method === "create";

    if (method === "remove") return onChange[method](id);

    onChange[method]({
      id: checkMethod ? date : id,
      name: modalContent.input,
      parent_id: checkMethod ? id : parent_id,
    });
  };

  return (
    <ModalWrapper>
      <ModalOverlay></ModalOverlay>
      <ModalBody>
        <ModalClose onClick={closeModal}>✖</ModalClose>
        <h2>{modalContent.title}</h2>
        {checkDuplicate && <p>Такая директория уже существует</p>}
        <Flex>
          <input
            type="text"
            readOnly={method === "remove"}
            onChange={inputSetValue}
            value={modalContent.input}
          />
          <button disabled={checkDuplicate} onClick={modalBtnClick}>
            {method === "remove" ? "Удалить" : "Сохранить"}
          </button>
        </Flex>
      </ModalBody>
    </ModalWrapper>
  );
};

export default Modal;
