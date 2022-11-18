import React, { useState } from "react";

import { Stack } from "@mui/system";
import { Snackbar, Alert } from "@mui/material";
import SearchClients from "./SearchClients";

const Clientes = () => {
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  const [message, setMessage] = React.useState("");

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({ ...state, open: false });
  };

  const handleAddClient = () => {
    setState({ ...state, open: true });
    setMessage("Cliente agregado con éxito");
  };

  const handleDeleteClient = () => {
    setState({ ...state, open: true });
    setMessage("Cliente eliminado con éxito");
  };

  const handleUpdateClient = () => {
    setState({ ...state, open: true });
    setMessage("Cliente actualizado con éxito");
  };
  const handleAddBranchOffice = () => {
    setState({ ...state, open: true });
    setMessage("Sucursal agregada con éxito");
  };

  const handleDeleteBranchOffice = () => {
    setState({ ...state, open: true });
    setMessage("Sucursal eliminada con éxito");
  };

  const handleUpdateBranchOffice = () => {
    setState({ ...state, open: true });
    setMessage("Sucursal actualizada con éxito");
  };

  return (
    <>
      <Stack p={4} sx={{ width: "50%", margin: "0 auto" }}>
        <SearchClients
          handleAddClient={handleAddClient}
          handleUpdateClient={handleUpdateClient}
          handleAddBranchOffice= {handleAddBranchOffice}
          handleUpdateBranchOffice={handleUpdateBranchOffice}
          handleDeleteClient={handleDeleteClient}
          handleDeleteBranchOffice={handleDeleteBranchOffice}
        />
      </Stack>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={state.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Clientes;
