import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useMediaQuery, useTheme } from "@mui/material";
import FormularioUpdateCliente from "./FormularioUpdateCliente";

const ModalUpdateCliente = ({ prop, setInputValue, handleUpdateClient }) => {
  //responsive
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  //modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        size="small"
        variant="outlined"
        startIcon={<EditIcon />}
        onClick={handleOpen}
      >
        Editar
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            width: isMobile ? 200 : 400,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            border: "1px solid grey",
            borderRadius: "10px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <FormularioUpdateCliente
            cliente={prop}
            handleClose={handleClose}
            setInputValue={setInputValue }
            handleUpdateClient={handleUpdateClient}
          />
        </Box>
      </Modal>
    </>
  );
};

export default ModalUpdateCliente;
