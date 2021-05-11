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

const ButtonCreate: React.FC = () => {
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [disabled, setDisabled] = useState(true);
  const { dirs, setDirs } = useContext(AppContext);

  useEffect(() => {
    const activeDir = JSON.parse(localStorage.getItem("activeDir")!);

    if (
      name.length === 0 ||
      activeDir.subdirs.find((item: IDir) => item.name === name)
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [name]);

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
    setName(event.target.value);
  };

  const handleConfirm = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const { id: parentID } = JSON.parse(localStorage.getItem("activeDir")!);

    if (disabled === false) {
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
        })
        .then(() => {
          setName("");
          setModalOpened(false);
          setDisabled(true);
        });
    }
  };

  return (
    <>
      <Button
        tooltip={"New folder"}
        clickHandler={(event: React.MouseEvent<HTMLButtonElement>) => {
          const { id } = JSON.parse(localStorage.getItem("activeDir")!);
          if (id !== "") {
            handleOpenCreate(event);
          }
        }}>
        create_new_folder
      </Button>
      <Dialog
        open={modalOpened}
        onClose={handleCloseCreate}
        aria-labelledby="form-dialog-title">
        <DialogTitle
          id="form-dialog-title"
          onClick={(event: React.MouseEvent) => event.stopPropagation()}>
          Create new folder
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
            onChange={handleSetName}
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
