import React, { useState, useEffect } from "react";
//imports material ui
import {
  Autocomplete,
  TextField,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
//imports componentes
import ModalUpdateSucursal from "./ModalUpdateSucursal";
import ModalNuevaSucursal from "./ModalNuevaSucursal";
//imports redux
import { useDispatch, useSelector } from "react-redux";
import { getBranchOffices } from "../../state/branchOffices";
import { deleteBranchOffice } from "../../state/branchOffices";
import { getOneBranchOffice } from "../../state/oneBranchOffice";
import CalendarioBranchOffice from "../../commons/CalendarioBranchOffice";

const SearchBranchOffice = ({
  clienteActual,
  handleAddBranchOffice,
  handleUpdateBranchOffice,
  handleDeleteBranchOffice,
}) => {

  const dispatch = useDispatch();
  const sucursales = useSelector((state) => state.branchOffices);
  const sucursalesNames = sucursales.map((suc) => suc.adress);

  
  useEffect(() => {
    dispatch(getBranchOffices(clienteActual.id));
  }, [dispatch, clienteActual]);

  const [value, setValue] = React.useState(sucursales[0]);

  const [inputValue, setInputValue] = React.useState("");

  const sucursalActual = sucursales.find((a) => a.adress === value);


  useEffect(() => {
    if (sucursalActual) {
      dispatch(getOneBranchOffice(sucursalActual.id));
    }
  }, [sucursalActual, dispatch]);


  const handleClick = async () => {
    await dispatch(
      deleteBranchOffice({
        clientId: clienteActual.id,
        branchOfficeId: sucursalActual.id,
      })
    );
    handleDeleteBranchOffice();
    setInputValue("");
  };

  return (
    <Stack sx={{ alignItems: "start", width: "100%" }}>
      <Typography variant="h5" sx={{ marginBottom: "30px" }}>
        Sucursales
      </Typography>
      <ModalNuevaSucursal
        clienteActual={clienteActual}
        handleAddBranchOffice={handleAddBranchOffice}
      />
      {sucursales?.length > 0 ? (
         <Autocomplete
        freeSolo={true}
        disablePortal
        id="combo-box-demo"
        options={sucursalesNames}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        inputValue={inputValue}
        value={inputValue}
        sx={{ width: "100%" }}
        renderInput={(params) => (
          <TextField {...params} label="Buscar sucursales" />
        )}
      />
      ) : (
        <Typography variant="h6" sx={{ marginBottom: "30px" }}>
          No hay sucursales
        </Typography>
      )}
     

      {sucursalActual && (
        <Stack sx={{ marginTop: "20px", width: "100%" }}>
          <Typography variant="h6" sx={{ marginBottom: "10px" }}>
            {sucursalActual?.adress}
          </Typography>
          

          <Stack spacing={2} direction="row">
            <ModalUpdateSucursal
              prop={sucursalActual}
              setInputValue={setInputValue}
              handleUpdateBranchOffice={handleUpdateBranchOffice}
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
          <CalendarioBranchOffice />
        </Stack>
      )}
    </Stack>
  );
};

export default SearchBranchOffice;
