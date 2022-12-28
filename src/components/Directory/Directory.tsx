import React, { useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import { DircetoryI } from "../../types/Dircetory";
import { DirectoryItemHeader } from "./DirectoryItemHeader";

const DircetoryBox = styled.div`
  margin-left: 10px;
`;

const DirectoryItemChildren = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;

export const Directory = React.memo(
  ({
    directory,
    directories,
  }: {
    directory: DircetoryI;
    directories: DircetoryI[];
  }) => {
    const [isOpen, SetisOpen] = useState<boolean>(false);
    const ToggleOpen = useCallback(() => {
      SetisOpen(!isOpen);
    }, [isOpen]);

    const children = directories.filter((d) => d.parent_id === directory.id);

    const ItemHeadData = useMemo(
      () => ({ ToggleOpen, children, directory, isOpen }),
      [children, directory]
    );
    return (
      <DircetoryBox key={directory.id}>
        <DirectoryItemHeader {...ItemHeadData} />
        {!!children.length && (
          <DirectoryItemChildren isOpen={isOpen}>
            {children.map((child) => (
              <Directory
                key={child.id}
                directory={child}
                directories={directories}
              />
            ))}
          </DirectoryItemChildren>
        )}
      </DircetoryBox>
    );
  }
);
