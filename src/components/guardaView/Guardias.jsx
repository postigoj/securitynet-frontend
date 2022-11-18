import React, { useEffect } from "react";

import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalNuevoGuardia from "./ModalNuevoGuardia";
import ModalUpdateGuardia from "./ModalUpdateGuardia";
import { useDispatch, useSelector } from "react-redux";
import { getSecurityGuards, statusGuards } from "../../state/securityGuards";
import { getOneSecurityGuard } from "../../state/oneSecurityGuard";
import CalendarioGuard from "../../commons/CalendarGuard";

const Guardias = () => {
  const dispatch = useDispatch();
  //responsive
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const guardias = useSelector((state) => state.securityGuards);

  useEffect(() => {
    dispatch(getSecurityGuards());
  }, [dispatch]);

  //value e inputvalue son para el autocomplete
  const [value, setValue] = React.useState(guardias[0]);

  const [inputValue, setInputValue] = React.useState("");

  const guardiaActual = guardias.find((a) => a.name === value);

  useEffect(() => {
    dispatch(getOneSecurityGuard(guardiaActual?.id));
  }, [dispatch, guardiaActual]);

  //funciones snackbar
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

  const handleAddGuard = () => {
    setState({ ...state, open: true });
    setMessage("Guardia agregado con éxito");
  };

  const handleDeleteGuard = () => {
    setState({ ...state, open: true });
    setMessage("Guardia dado de baja con éxito");
  };

  const handleUpdateGuard = () => {
    setState({ ...state, open: true });
    setMessage("Guardia actualizado con éxito");
  };

  return (
    <Stack sx={{ m: "0 auto", alignItems: "flex-start", width: "50%" }}>
      <Typography variant="h5" sx={{ my: 6 }}>
        Guardias
      </Typography>
      <ModalNuevoGuardia handleAddGuard={handleAddGuard} />
      <Autocomplete
        freeSolo={true}
        disablePortal
        id="combo-box-demo"
        options={guardias.map((option) => option.name)}
        sx={{ width: 300, mt: isMobile ? 2 : 4, width: "100%" }}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        value={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Buscar guardia" />
        )}
      />

      {guardias.length && guardiaActual ? (
        <Stack
          sx={{
            mt: isMobile ? 5 : 6,
            textAlign: "flex-start",
            width: isMobile ? 200 : "100%",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
            {guardiaActual?.name} {guardiaActual?.lastname}
          </Typography>
          <Typography sx={{ mt: 1}}>
          <Typography sx={{display: 'inline-block', fontWeight: 'bold'}} >CUIL:</Typography> {guardiaActual?.cuil}
          </Typography>
          <Typography sx={{ mt: 1 }}>
            <Typography sx={{display: 'inline-block', fontWeight: 'bold'}}>Email:</Typography> {guardiaActual?.email}
          </Typography>
          <Typography sx={{ mt: 1 }}>
          <Typography sx={{display: 'inline-block', fontWeight: 'bold'}}>Telefono:</Typography> {guardiaActual?.phone}
          </Typography>
          <Typography sx={{ mt: 1 }}>
          <Typography sx={{display: 'inline-block', fontWeight: 'bold'}}>Direccion:</Typography> {guardiaActual?.adress}
          </Typography>
          <Typography sx={{ mt: 1 }}>
          <Typography sx={{display: 'inline-block', fontWeight: 'bold'}}>Comienzo de contrato:</Typography> {guardiaActual?.startContract.split('T')[0]}
          </Typography>
          <Typography sx={{ mt: 1 }}>
          <Typography sx={{display: 'inline-block', fontWeight: 'bold'}}>Fin de contrato:</Typography> {guardiaActual?.endContract.split('T')[0]}
          </Typography>
          <Typography sx={{ mt: 1, mb: 4 }}>
          <Typography sx={{display: 'inline-block', fontWeight: 'bold'}}>Cantidad de horas trabajadas:</Typography> {guardiaActual?.totalWorkedHours ? guardiaActual?.totalWorkedHours : 'Todavia no comenzo a trabajar'}
          </Typography>
          
          <Stack spacing={2} direction="row" sx={{mb: 4}}>
            <ModalUpdateGuardia
              prop={guardiaActual}
              handleUpdateGuard={handleUpdateGuard}
              setInputValue={setInputValue}
            />
            <Button
              size="small"
              color="error"
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={async () => {
                await dispatch(statusGuards(guardiaActual));
                handleDeleteGuard();
                setInputValue("");
              }}
            >
              Dar de baja
            </Button>
          </Stack>
          <CalendarioGuard/>
        </Stack>
      ) : null}
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
    </Stack>
  );
};

export default Guardias;
