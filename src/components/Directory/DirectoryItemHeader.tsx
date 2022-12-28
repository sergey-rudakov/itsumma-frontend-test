import React, { useContext } from "react";
import styled from "styled-components";
import { DircetoryI } from "../../types/Dircetory";
import { DirectoryBtns, DirectoryBtnsWrapper } from "./DirectoryBtns";

const DirectoryItemHeaderS = styled.div`
  cursor: pointer;
  padding: 10px 20px;
  margin-left: -10px;
  font-weight: bold;
  font-size: 17px;
  border-radius: 11px;
  transition: 300ms linear;
  display: flex;
  align-items: center;
  flex-flow: wrap;
  overflow-wrap: anywhere;
  :hover {
    background: #80808045;
    ${DirectoryBtnsWrapper} {
      opacity: 1;
      visibility: visible;
    }
  }
`;

export const DirectoryItemCircle = styled.div<{ isOpen?: boolean }>`
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  position: relative;
  border: 1px solid black;
  border-radius: 29px;
  span {
    position: absolute;
    display: block;
    width: 8px;
    height: 2px;
    background: black;
    :last-child {
      display: ${({ isOpen }) => (isOpen ? "none" : "block")};
      transform: rotate(90deg);
    }
  }
`;

export interface DirectoryItemHeaderI {
  ToggleOpen: () => void;
  isOpen: boolean;
  children: DircetoryI[];
  directory: DircetoryI;
}

export const DirectoryItemHeader = ({
  ToggleOpen,
  isOpen,
  children,
  directory,
}: DirectoryItemHeaderI) => {
  return (
    <DirectoryItemHeaderS onClick={ToggleOpen}>
      {!!children.length && (
        <DirectoryItemCircle isOpen={isOpen}>
          <span></span>
          <span></span>
        </DirectoryItemCircle>
      )}
      {directory.name}
      <DirectoryBtns children={children} directory={directory} />
    </DirectoryItemHeaderS>
  );
};
