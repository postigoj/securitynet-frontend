import React, { useState } from 'react'
import FormularioModalAdmin from './FormularioModalAdmin';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useMediaQuery, useTheme } from '@mui/material';


const ModalNuevoAdmin = ({handleAddAdmin, setInputValue}) => {
  
  //responsive
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  //modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
    <Button variant="outlined" startIcon={< AdminPanelSettingsIcon/>} onClick={handleOpen} sx={{mt:2, width:"100%"}}>
        Agregar Administrador
    </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{width: isMobile ? 200 : 400, 
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  bgcolor: "background.paper",
                  border: "1px solid grey",
                  borderRadius: '10px',
                  boxShadow: 24,
                  p: 4,
      }}>
          <FormularioModalAdmin handleClose={handleClose} handleAddAdmin={handleAddAdmin} setInputValue={setInputValue} />
        </Box>
      </Modal>
  </>
);

}

export default ModalNuevoAdmin