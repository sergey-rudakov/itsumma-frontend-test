import { DircetoryI } from "../types/Dircetory";

export interface DirectoryContextI {
  dataDirectory: DircetoryI[];
  setDataDirectory: (data: any) => void;
  setdirectoryItemData: (data: any) => void;
  directoryItemData: {
    parent_id?: string;
    id?: string;
    method: string;
  };
}

export interface ModalContextType {
  modalIsOpen: boolean;
  modalContent: {
    title: string;
    input: string;
    button: boolean;
  };
  openModal: () => void;
  closeModal: () => void;
  SetmodalContent: React.Dispatch<
    React.SetStateAction<{ title: string; input: string; button: boolean }>
  >;
  children?: React.ReactNode;
}
