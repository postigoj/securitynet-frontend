import React, {useState} from "react";
import { Button, TextField, Typography, Stack } from "@mui/material";

import { useForm } from "react-hook-form";
//import redux
import { useDispatch } from "react-redux";
import { registerClient } from "../../state/clients";

const FormularioRegistro = ({handleClose, handleAddClient}) => {
  const dispatch = useDispatch();
  //react-hook-form
  const {
    register,
    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm( { mode: "onChange" } );

  const onSubmit = async (data) => {
    await dispatch(registerClient(data));
    handleClose()
    handleAddClient(true);
  };

  const[dateActual, setDateActual] = React.useState();

  return (
    <Stack spacing={4}>
      <Typography variant="h5">Crear nuevo cliente</Typography>

      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField
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
            error={errors.startContract ? true : false}
            helperText={errors.startContract ? "Este campo es requerido" : ""}
            width="100%"
            id="outlined-required"
            type={"date"}
            label="Comienzo del contrato*"
            InputLabelProps={{
              shrink: true,
            }}
            {...register("startContract", {
              required: true,
              validate: (value) => {
                setDateActual(value);
              },
            })}
          />

          <TextField
            error={errors.endContract ? true : false}
            helperText={errors.endContract ? "La fecha fin de contrato debe ser mayor a la de inicio" : ""}
            width="100%"
            id="outlined-required"
            type={"date"}
            label="Fin del contrato*"
            InputLabelProps={{
              shrink: true,
            }}
            {...register("endContract", {
              required: true,
              min: {
                value: dateActual,
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
        </Stack>
      </form>
    </Stack>
  );
};

export default FormularioRegistro;
