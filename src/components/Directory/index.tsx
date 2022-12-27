import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { DircetoryI } from "../../types/Dircetory";
import { Directory } from "./Directory";

export interface DirectoryManagerI {
  directories: DircetoryI[];
}

const Wrapper = styled.div`
  min-width: 300px;
  max-width: 300px;
  background: #e6e6e6;
  border-radius: 15px;
`;

const Header = styled.div`
  border-bottom: 1px solid gray;
  h2 {
    margin-left: 20px;
  }
`;

const DirectoryManager: React.FC<DirectoryManagerI> = ({ directories }) => {
  return (
    <Wrapper>
      <Header>
        <h2>ITSumma: IDE style</h2>
      </Header>
      {directories
        .filter((d) => d.parent_id === "null")
        .map((rootDirectory) => (
          <Directory directory={rootDirectory} directories={directories} />
        ))}
    </Wrapper>
  );
};

export default DirectoryManager;
