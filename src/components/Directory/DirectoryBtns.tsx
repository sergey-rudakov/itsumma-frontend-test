import React, { useContext } from "react";
import styled from "styled-components";
import { DirectoryContext } from "../../context/DirectoryProvaider";
import { ModalContext } from "../../context/ModalProvaider";

export const DirectoryBtnsWrapper = styled.div`
  margin-left: auto;
  display: flex;
  gap: 5px;
  transition: 300ms linear;
  opacity: 0;
  visibility: hidden;
`;

const DirectoryBtn = styled.button<{ color?: string }>`
  background: unset;
  width: 22px;
  cursor: pointer;
  height: 22px;
  border-radius: 50%;
  color: ${({ color }) => color || "black"};
  border: 1px solid ${({ color }) => color || "black"};
  transition: 300ms linear;
  :hover {
    color: white;
    background: ${({ color }) => color };
  }
`;

export const DirectoryBtns = ({ directory, children }: any) => {
  const { openModal, SetmodalContent } = useContext(ModalContext);
  const { setdirectoryItemData } = useContext(DirectoryContext);
  const removeDirectorys = [directory, ...children];
  const BtnClick = (
    _method: string,
    title = "",
    input = "",
    button = false
  ) => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      openModal();

      SetmodalContent({
        title: title,
        input: input,
        button: button,
      });

      setdirectoryItemData({
        parent_id: directory.parent_id,
        id: _method === "remove" ? removeDirectorys : directory.id,
        method: _method,
      });
    };
  };

  return (
    <DirectoryBtnsWrapper>
      <DirectoryBtn
        color={"green"}
        onClick={BtnClick("create", "Добавить директорию")}
      >
        C
      </DirectoryBtn>
      <DirectoryBtn
        color={"blue"}
        onClick={BtnClick("update", "Редактивировать", directory.name)}
      >
        U
      </DirectoryBtn>
      <DirectoryBtn
        color={"red"}
        onClick={BtnClick("remove", "Удалить директорию", directory.name)}
      >
        D
      </DirectoryBtn>
    </DirectoryBtnsWrapper>
  );
};
