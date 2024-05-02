import { Dialog, DialogContent, Stack } from "@mui/material";
import React, { useState } from "react";

const EditResponseDialog = () => {
  const [open, setOpen] = useState(true);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} keepMounted onClose={closeDialog}>
      <DialogContent>
        Hi
      </DialogContent>
    </Dialog>
  );
};

export default EditResponseDialog;
