import React, { createContext, useCallback, useState } from "react";
import { ModalContextType } from "./context.types";

const ModalContext = createContext<ModalContextType>({
  modalIsOpen: false,
  modalContent: {
    title: "",
    input: "",
    button: false,
  },
  SetmodalContent: () => {},
  openModal: () => {},
  closeModal: () => {},
});

const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [modalContent, SetmodalContent] = useState({
    title: "",
    input: "",
    button: false,
  });

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <ModalContext.Provider
      value={{
        modalIsOpen,
        openModal,
        closeModal,
        modalContent,
        SetmodalContent,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
