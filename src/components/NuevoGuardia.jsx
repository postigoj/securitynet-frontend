import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Stack,
  Alert,
  Snackbar,
  MenuItem,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { registerGuards } from "../state/securityGuards";
import { useDispatch, useSelector } from "react-redux";
import ModalNuevoGuardia from "./guardaView/ModalNuevoGuardia";
import ModalDireccionGuardia from "./guardaView/ModalDireccionGuardia";
import { getCoords } from "../state/coords";


const NuevoGuardia = () => {
  const dispatch = useDispatch();
  const { lat, lon, address, province } = useSelector((state) => state.coords);

  //react-hook-form
  const {
    register,
    resetField,
    setValue,
    formState: { errors, isDirty, isValid, },
    handleSubmit,
  } = useForm({ mode: "onChange"});


  useEffect(() => {
    if(address){
      setValue("adress", address, {shouldValidate: true, shouldDirty: true});
    }
  }, [address, setValue]);



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
    data.latitude = lat;
    data.longitude = lon;
    data.province = province
    await dispatch(registerGuards(data));
    handleClick();
    dispatch(getCoords({ lat: null, lon: null, address: null, province: null }));
    return (
      resetField("name"),
      resetField("lastname"),
      resetField("email"),
      resetField("password"),
      resetField("phone"),
      resetField("adress"),
      resetField("cuil"),
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
      <Typography variant="h5">Crear nuevo guardia</Typography>
      <Stack maxWidth="600px">
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <Stack width="100%" spacing={3}>
            <TextField
              name="name"
              error={errors.name ? true : false}
              helperText={errors.name ? "Este campo es requerido" : ""}
              width="100%"
              id="outlined-required"
              label="Nombre*"
              {...register("name", {
                required: true,
                minLength: {
                  value: 2,
                  message: "Minimum length should be 2",
                },
              })}
            />

            <TextField
              name="lastname"
              error={errors.lastname ? true : false}
              helperText={errors.lastname ? "Este campo es requerido" : ""}
              width="100%"
              id="outlined-required"
              label="Apellido*"
              {...register("lastname", {
                required: true,
                minLength: {
                  value: 2,
                  message: "Minimum length should be 2",
                },
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
              name="password"
              error={errors.password ? true : false}
              helperText={
                errors.password
                  ? "La contraseña debe tener mínimo 8 caracteres"
                  : ""
              }
              type="password"
              required
              id="outlined-required"
              label="New password"
              defaultValue=""
              {...register("password", {
                required: "This is required",
                minLength: {
                  value: 8,
                  message: "Minimum length should be 8",
                },
              })}
            />

            <TextField
              name="phone"
              error={errors.phone ? true : false}
              helperText={
                errors.phone
                  ? "Introduzca un numero de al menos 10 digitos sin guiones"
                  : ""
              }
              width="100%"
              type={"number"}
              id="outlined-required"
              label="Numero de teléfono/celular*"
              {...register("phone", {
                required: true,
                minLength: {
                  value: 10,
                },
              })}
            />

            <TextField
              name="cuil"
              error={errors.cuil ? true : false}
              helperText={
                errors.cuil
                  ? "Introduzca un numero de al menos 10 digitos sin guiones"
                  : ""
              }
              width="100%"
              type={"number"}
              id="outlined-required"
              label="CUIL*"
              {...register("cuil", {
                required: true,
                minLength: {
                  value: 10,
                },
              })}
            />

            <ModalDireccionGuardia />
            <TextField
              width="100%"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                readOnly: true,
              }}
              placeholder="Dirección"
              id="outlined-required"
              {...register("adress", {
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
                Guardia creado con éxito
              </Alert>
            </Snackbar>
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
};

export default NuevoGuardia;
