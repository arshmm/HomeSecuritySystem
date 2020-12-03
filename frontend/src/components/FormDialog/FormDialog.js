import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles({
  inputFiled: {
    width: "90%",
    margin: "1rem",
  },
});

const FormDialog = ({ dialog, setDialog, handleSubmit }) => {
  const classes = useStyles();
  const [image, setImage] = useState("");
  const [name, setName] = useState("");

  const handleClose = () => {
    setName("");
    setImage("");
    setDialog(false);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", name);
    data.append("userImage", image);
    handleSubmit(data);
    handleClose();
  };

  return (
    <Dialog
      open={dialog}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add user</DialogTitle>
      <DialogContent>
        <TextField
          className={classes.inputFiled}
          label="name"
          type="text"
          variant="outlined"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          className={classes.inputFiled}
          type="file"
          variant="outlined"
          name="image"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={formSubmit} color="inherit">
          Add
        </Button>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
