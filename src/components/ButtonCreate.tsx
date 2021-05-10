import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import { AppContext } from "../App";
import IDir from "../interfaces/IDir";
import Button from "./Button";

const ButtonCreate: React.FC = () => {
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [disabled, setDisabled] = useState(true);
  const { dirs, setDirs } = useContext(AppContext);

  const handleOpenCreate = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setModalOpened(true);
  };

  const handleCloseCreate = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setName("");
    setModalOpened(false);
  };

  const handleSetName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const activeDir = JSON.parse(localStorage.getItem("activeDir")!);
    setName(event.target.value);

    if (
      name.length === 0 ||
      activeDir.subdirs.find((item: IDir) => item.name === event.target.value)
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  const handleConfirm = () => {
    const { id: parentID } = JSON.parse(localStorage.getItem("activeDir")!);

    fetch("http://localhost:3050/dir", {
      method: "POST",
      headers: {
        "Content-type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        id: Date.now().toString(),
        name,
        parent_id: parentID,
      }),
    })
      .then((data: Response) => data.json())
      .then((json: IDir) => {
        setDirs([...dirs!, json]);
      });

    setName("");
    setModalOpened(false);
  };

  return (
    <>
      <Button tooltip={"New folder"} clickHandler={handleOpenCreate}>
        create_new_folder
      </Button>
      <Dialog
        open={modalOpened}
        onClose={handleCloseCreate}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create new folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Folder name"
            type="text"
            fullWidth
            onChange={handleSetName}
            onKeyPress={(event: React.KeyboardEvent) => {
              if (!disabled) {
                return event.key === "Enter" ? handleConfirm() : null;
              }
            }}
            autoComplete="off"
          />
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleCloseCreate}
            className="modal-button modal-button--cancel">
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={disabled}
            className="modal-button modal-button--ok">
            Confirm
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ButtonCreate;
