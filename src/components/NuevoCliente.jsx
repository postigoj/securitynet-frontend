import React from "react";
import {
  Button,
  TextField,
  Typography,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerClient } from "../state/clients";
import { useState } from "react";

const NuevoCliente = () => {
  const dispatch = useDispatch();

  //react-hook-form
  const {
    register,
    resetField,
    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm({ mode: "onChange" });

  //funciones snackbar
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;

  const handleClick = () => {
    setState({ ...state, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const onSubmit = async (data) => {
    await dispatch(registerClient(data));
    handleClick();
    return (
      resetField("name"),
      resetField("email"),
      resetField("cuit"),
      resetField("legalAdress"),
      resetField("startContract"),
      resetField("endContract")
    );
  };

  const [dateActual, setDateActual] = useState();

  return (
    <Stack
      py="70px"
      justifyContent="center"
      alignItems="center"
      width="100%"
      spacing={4}
    >
      <Typography variant="h5">Crear nuevo cliente</Typography>
      <Stack maxWidth="600px">
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <Stack width="100%" spacing={3}>
            <TextField
              name="name"
              error={errors.name ? true : false}
              helperText={errors.name ? "Este campo es requerido" : ""}
              width="100%"
              id="outlined-required"
              label="Razon social*"
              {...register("name", {
                required: true,
              })}
            />

            <TextField
              name="email"
              error={errors.email ? true : false}
              helperText={
                errors.email ? "Por favor introduzca un email valido" : ""
              }
              width="100%"
              id="outlined-required"
              label="Email*"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                },
              })}
            />
            <TextField
              name="cuit"
              error={errors.cuit ? true : false}
              helperText={
                errors.cuit
                  ? "Introduzca un numero de al menos 10 digitos sin guiones"
                  : ""
              }
              width="100%"
              type={"number"}
              id="outlined-required"
              label="Cuit*"
              {...register("cuit", {
                required: true,
                minLength: {
                  value: 10,
                },
              })}
            />

            <TextField
              name="legalAdress"
              error={errors.legalAdress ? true : false}
              helperText={errors.legalAdress ? "Este campo es requerido" : ""}
              width="100%"
              id="outlined-required"
              label="Direccion*"
              {...register("legalAdress", {
                required: true,
              })}
            />

            <TextField
              name="startContract"
              error={errors.startContract ? true : false}
              helperText={
                errors.startContract ? errors.startContract.message : ""
              }
              width="100%"
              id="outlined-required"
              type={"date"}
              label="Comienzo del contrato*"
              InputLabelProps={{
                shrink: true,
              }}
              {...register("startContract", {
                required: {
                  value: true,
                  message: "este campo es requerido",
                },
                validate: (value) => {
                  setDateActual(value);
                },
              })}
            />

            <TextField
              name="endContract"
              error={errors.endContract ? true : false}
              helperText={errors.endContract ? errors.endContract.message : ""}
              width="100%"
              id="outlined-required"
              type={"date"}
              label="Fin del contrato*"
              InputLabelProps={{
                shrink: true,
              }}
              {...register("endContract", {
                required: {
                  value: true,
                  message: "este campo es requerido",
                },
                min: {
                  value: dateActual,
                  message:
                    "la fecha de fin de contrato debe ser mayor a la de inicio",
                },
              })}
            />

            <Button
              disabled={!isDirty || !isValid}
              sx={{ backgroundColor: "#182d4f" }}
              type="submit"
              variant="contained"
            >
              Crear
            </Button>
            <Snackbar
              open={state.open}
              autoHideDuration={6000}
              onClose={handleClose}
              anchorOrigin={{ vertical, horizontal }}
            >
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Cliente creado con éxito
              </Alert>
            </Snackbar>
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
};

export default NuevoCliente;
