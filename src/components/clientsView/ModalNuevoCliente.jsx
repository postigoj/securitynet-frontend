import React from "react";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";

import FormularioRegistro from "./FormularioRegistro";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";



const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid grey",
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};


const ModalNewClient = ({handleAddClient}) => {

  //modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<AddBusinessIcon />}
        onClick={handleOpen}
        sx={{marginBottom: '20px', width: '100%'}}
      >
        Crear nuevo cliente
      </Button>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <FormularioRegistro handleClose={handleClose} handleAddClient={handleAddClient} />
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default ModalNewClient;
