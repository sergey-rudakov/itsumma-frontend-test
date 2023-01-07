import React, { useContext, useState } from "react";
import { TreeDispatch } from "../App";
import { ItemWithChildren } from "../models";
import { AiFillFolder, AiFillFolderAdd, AiFillEdit } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { GoTriangleRight, GoTriangleDown } from "react-icons/go";
import { ItemsActionKind } from "../store/store";
import Modal from "react-modal";

type Props = {
  item: ItemWithChildren;
  level: number;
  onToggle: () => void;
  selected: boolean;
};

const modalStyles = {
  content: {
    marginTop: "20px",
    width: "200px",
    height: "200px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const Node: React.FC<Props> = ({ item, level, onToggle, selected }: Props) => {
  const dispatch = useContext(TreeDispatch);
  const [editName, setEditName] = useState<string>(item.name);
  const [createName, setCreateName] = useState<string>();
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showCreate, setShowCreate] = useState<boolean>(false);

  const handleSave = () => {
    editName !== item.name &&
      dispatch({
        type: ItemsActionKind.editItem,
        payload: { id: item.id, name: editName },
      });
    setShowEdit(false);
  };

  const handleCreate = () => {
    dispatch({
      type: ItemsActionKind.createItem,
      payload: { id: item.id, name: createName },
    });
    setShowCreate(false);
  };

  return (
    <>
      <div
        style={{ paddingLeft: `${level * 16}px` }}
        className="node"
        onContextMenu={(e) => e.preventDefault()}
      >
        <div style={{ cursor: "pointer" }} onClick={onToggle}>
          {selected ? <GoTriangleDown /> : <GoTriangleRight />}
          <AiFillFolder />
          <span style={{ margin: "5px" }}>{item.name}</span>
        </div>
        <AiFillEdit
          className="edit-folder"
          title="Edit Folder"
          onClick={() => setShowEdit(true)}
        />
        <AiFillFolderAdd
          className="add-folder"
          title="Create Folder"
          onClick={() => setShowCreate(true)}
        />
        <FaTrash
          title="Delete the folder"
          className="trash-bin"
          onClick={() =>
            dispatch({
              type: ItemsActionKind.deleteItem,
              payload: { id: item.id },
            })
          }
          size={10}
        />
      </div>
      <Modal
        onRequestClose={() => setShowCreate(false)}
        isOpen={showCreate}
        style={modalStyles}
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            Name:
            <input
              id="input"
              type="text"
              onChange={(e) => setCreateName(e.target.value)}
            />
            <button onClick={handleCreate}>Create</button>
          </label>
        </form>
      </Modal>
      <Modal
        onRequestClose={() => setShowEdit(false)}
        isOpen={showEdit}
        style={modalStyles}
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            Name:
            <input
              id="input"
              type="text"
              defaultValue={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
          </label>
        </form>
      </Modal>
    </>
  );
};

export default Node;
