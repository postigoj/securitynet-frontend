import React, { useState } from 'react'
import SecurityIcon from '@mui/icons-material/Security';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useMediaQuery, useTheme } from '@mui/material';
import FormularioModalGuardia from './FormularioModalGuardia';

const ModalNuevoGuardia = ({handleAddGuard,setInputValue}) => {

    //responsive
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  //modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
    <Button variant="outlined" startIcon={< SecurityIcon/>} onClick={handleOpen} sx={{mt:2, width:"100%"}}>
        Agregar Guardia
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
          <FormularioModalGuardia handleClose={handleClose} handleAddGuard={handleAddGuard} setInputValue={setInputValue}/>
        </Box>
      </Modal>
  </>
  )
}

export default ModalNuevoGuardia