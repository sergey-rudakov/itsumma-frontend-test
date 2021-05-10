import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import { AppContext } from "../App";
import IDir from "../interfaces/IDir";
import Button from "./Button";

const ButtonDelete = () => {
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const { setDirs } = useContext(AppContext);

  const handleOpenDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setModalOpened(true);
  };

  const handleCloseDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setModalOpened(false);
  };

  const handleDelete = () => {
    const { id: activeID } = JSON.parse(localStorage.getItem("activeDir")!);

    fetch(`http://localhost:3050/dir/${activeID}`, {
      method: "DELETE",
    }).then(() => {
      setDirs((prev: IDir[]) => [
        ...prev!.filter(
          (dir: IDir) => dir.id !== activeID && dir.parent_id !== activeID
        ),
      ]);
    });

    setModalOpened(false);
  };

  return (
    <>
      <Button tooltip={"Delete"} clickHandler={handleOpenDelete}>
        delete
      </Button>
      <Dialog
        open={modalOpened}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Delete folder</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this folder?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleCloseDelete}
            className="modal-button modal-button--cancel">
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="modal-button modal-button--ok"
            autoFocus>
            Delete
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ButtonDelete;
