import React, { useState, useEffect } from "react";
//import estilos material ui
import {
  Autocomplete,
  TextField,
  Typography,
  Stack,
  Button,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

//import componenetes
import ModalUpdateCliente from "./ModalUpdateCliente";
import SearchBranchOffice from "./SearchBranchOffice";
import ModalNewClient from "./ModalNuevoCliente";

//import redux
import { useDispatch, useSelector } from "react-redux";
import { getClients } from "../../state/clients";
import { deleteClient } from "../../state/clients";


const SearchClients = ({handleAddClient, handleUpdateClient, handleAddBranchOffice, handleUpdateBranchOffice, handleDeleteClient, handleDeleteBranchOffice}) => {
  const dispatch = useDispatch();
  const clientes = useSelector((state) => state.clients);
  const clientesNames = clientes.map((cleinte) => cleinte.name);

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  const [value, setValue] = React.useState();

  const [inputValue, setInputValue] = React.useState("");

  const clienteActual = clientes.find((a) => a.name === value);

  const handleClick = async () =>{
    await dispatch(deleteClient(clienteActual.id))
    handleDeleteClient()
    setInputValue("")
  }

  return (
    <Stack sx={{ alignItems: "start" }}>
      <Typography variant="h5" sx={{ marginBottom: "30px" }}>
        Clientes
      </Typography>
      <ModalNewClient handleAddClient={handleAddClient} />
      <Autocomplete
        freeSolo={true}
        disablePortal
        id="combo-box-demo"
        options={clientesNames}
        sx={{ width: "100%" }}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        inputValue={inputValue}
        value={inputValue}
        renderInput={(params) => (
          <TextField {...params} label="Buscar clientes" />
        )}
      />

      {clienteActual && (
        <>
          <Stack sx={{ marginTop: "20px" }}>
            <Typography variant="h6">{clienteActual?.name}</Typography>
            <Typography sx={{ mt: 1 }}>
            <Typography sx={{display: 'inline-block', fontWeight: 'bold'}} >CUIT:</Typography> {clienteActual?.cuit}
            </Typography>
            <Typography sx={{ mt: 1}}>
            <Typography sx={{display: 'inline-block', fontWeight: 'bold'}} >Email:</Typography> {clienteActual?.email}
            </Typography>
            <Typography sx={{ mt: 1 }}>
            <Typography sx={{display: 'inline-block', fontWeight: 'bold'}} >Direccion:</Typography> {clienteActual?.legalAdress}
            </Typography>
            <Typography sx={{ mt: 1 }}>
            <Typography sx={{display: 'inline-block', fontWeight: 'bold'}} >Comienzo de contrato:</Typography> {clienteActual?.startContract.split('T')[0]}
            </Typography>
            <Typography sx={{ mt: 1, mb: 4 }}>
            <Typography sx={{display: 'inline-block', fontWeight: 'bold'}} >Fin de contrato:</Typography> {clienteActual?.endContract.split('T')[0]}
            </Typography>


            <Stack spacing={2} direction="row">
              <ModalUpdateCliente
                prop={clienteActual}
                setInputValue={setInputValue}
                handleUpdateClient={handleUpdateClient}
              />
              <Button
                size="small"
                color="error"
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={handleClick}
              >
                Dar de baja
              </Button>
            </Stack>
          </Stack>

          <Divider sx={{ marginY: "50px", width: "100%" }} />
          <SearchBranchOffice clienteActual={clienteActual} handleAddBranchOffice={handleAddBranchOffice} handleUpdateBranchOffice={handleUpdateBranchOffice} handleDeleteBranchOffice={handleDeleteBranchOffice} />
        </>
      )}
    </Stack>
  );
};

export default SearchClients;
