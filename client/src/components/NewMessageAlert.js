import { Alert, Button, Snackbar } from "@mui/material";
import React from "react";

function NewMessageAlert({ open, onClose, onClick }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      sx={{ bottom: "80px !important" }}
    >
      <Alert
        icon={false}
        sx={{ bgcolor: "background.darkest" }}
        action={
          <Button
            onClick={() => {
              onClick();
              onClose();
            }}
            color="inherit"
            size="small"
          >
            View
          </Button>
        }
      >
        You have a new message!
      </Alert>
    </Snackbar>
  );
}

export default NewMessageAlert;
