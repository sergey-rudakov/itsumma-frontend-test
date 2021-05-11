import React, { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import IDir from "../interfaces/IDir";
import { AppContext } from "../App";
import Button from "./Button";

const ButtonEdit = () => {
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [newName, setNewName] = useState("");
  const [disabled, setDisabled] = useState(true);
  const { dirs, setDirs } = useContext(AppContext);

  useEffect(() => {
    const activeDir = JSON.parse(localStorage.getItem("activeDir")!);
    const parentDir = dirs!.find(
      (item: IDir) => item.id === activeDir.parent_id,
    );
    if (
      newName.length === 0 ||
      parentDir?.subdirs!.find((item: IDir) => item.name === newName)
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [newName, dirs]);

  const handleOpenEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setModalOpened(true);
  };

  const handleCloseEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setNewName("");
    setModalOpened(false);
  };

  const handleEditName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const handleConfirm = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const { id, parent_id: parentID } = JSON.parse(
      localStorage.getItem("activeDir")!,
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
          ...prev.filter((item) => item.id !== json.id),
          json,
        ]);
      })
      .then(() => {
        const defaultDir = {
          id: "",
          name: "",
          parent_id: "",
        };
        localStorage.setItem("activeDir", JSON.stringify(defaultDir));
      });

    setModalOpened(false);
  };

  return (
    <>
      <Button
        tooltip={"Edit"}
        clickHandler={(event: React.MouseEvent<HTMLButtonElement>) => {
          const { id } = JSON.parse(localStorage.getItem("activeDir")!);
          if (id !== "") {
            handleOpenEdit(event);
          }
        }}>
        create
      </Button>
      <Dialog
        open={modalOpened}
        onClose={handleCloseEdit}
        aria-labelledby="form-dialog-title">
        <DialogTitle
          id="form-dialog-title"
          onClick={(event: React.MouseEvent) => event.stopPropagation()}>
          Change folder name
        </DialogTitle>
        <DialogContent
          onClick={(event: React.MouseEvent) => event.stopPropagation()}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Folder name"
            type="text"
            fullWidth
            autoComplete="off"
            onChange={handleEditName}
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
