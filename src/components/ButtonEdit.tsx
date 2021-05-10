import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import { find } from "tslint/lib/utils";
import { AppContext } from "../App";
import IDir from "../interfaces/IDir";
import Button from "./Button";

const ButtonEdit = () => {
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [newName, setNewName] = useState("");
  const [disabled, setDisabled] = useState(true);
  const { dirs, setDirs } = useContext(AppContext);

  const handleOpenEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setModalOpened(true);
  };

  const handleCloseEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setModalOpened(false);
  };

  const handleEditName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const activeDir = JSON.parse(localStorage.getItem("activeDir")!);
    const parentDir = dirs!.find(
      (item: IDir) => item.id === activeDir.parent_id
    );
    setNewName(event.target.value);

    if (
      newName.length === 0 ||
      parentDir?.subdirs!.find((item: IDir) => item.name === event.target.value)
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  const handleConfirm = () => {
    const { id, parent_id: parentID } = JSON.parse(
      localStorage.getItem("activeDir")!
    );

    fetch(`http://localhost:3050/dir/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        name: newName,
        parent_id: parentID,
      }),
    })
      .then((data: Response) => data.json())
      .then((json: IDir) => {
        setDirs((prev: IDir[]) => [
          ...prev.filter(item => item.id !== json.id),
          json,
        ]);
      });

    setModalOpened(false);
  };

  return (
    <>
      <Button tooltip={"Edit"} clickHandler={handleOpenEdit}>
        create
      </Button>
      <Dialog
        open={modalOpened}
        onClose={handleCloseEdit}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Change folder name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Folder name"
            type="text"
            fullWidth
            autoComplete="off"
            onChange={handleEditName}
            onKeyPress={(event: React.KeyboardEvent) => {
              if (!disabled) {
                return event.key === "Enter" ? handleConfirm() : null;
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleCloseEdit}
            className="modal-button modal-button--cancel">
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="modal-button modal-button--ok"
            disabled={disabled}>
            Confirm
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ButtonEdit;
