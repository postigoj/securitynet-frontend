import React from "react";
import { Typography, TextField, Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

//imports redux
import { useDispatch } from "react-redux";
import { editClient } from "../../state/clients";

const FormularioUpdateCliente = ({ cliente, handleClose, setInputValue, handleUpdateClient }) => {
  const dispatch = useDispatch();
  //react-hook-form
  const {
    register,
    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    await dispatch(editClient({...data, clientId: cliente.id}));
    setInputValue("")
    handleUpdateClient()
    handleClose()
  };
  const[dateActual, setDateActual] = React.useState();

  return (
    <Stack spacing={4} textAlign={"center"}>
      <Typography variant="h5">Editar cliente</Typography>

      <form /* autoComplete="off" */ onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField
            defaultValue={cliente.name}
            width="100%"
            label="Nombre*"
            {...register("name", {
              required: { value: true, message: "Campo requerido" },
              minLength: {
                value: 3,
                message: "El name debe tener al menos 3 caracteres",
              },
              pattern: { value: /^[a-zA-Z ]+$/, message: "Solo letras" },
            })}
            {...(errors.name && {
              error: true,
              helperText: errors.name.message,
            })}
          />

          <TextField
            defaultValue={cliente.email}
            width="100%"
            label="Email*"
            {...register("email", {
              required: { value: true, message: "Campo requerido" },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email invalido",
              },
            })}
            {...(errors.email && {
              error: true,
              helperText: errors.email.message,
            })}
          />

          <TextField
            defaultValue={cliente.cuit}
            width="100%"
            type={"number"}
            id="outlined-required"
            label="CUIT*"
            {...register("cuit", {
              required: { value: true, message: "Campo requerido" },
              minLength: {
                value: 10,
                message: "El CUIT debe tener al menos 10 caracteres",
              },
            })}
            {...(errors.cuit && {
              error: true,
              helperText: errors.cuit.message,
            })}
          />

          <TextField
            defaultValue={cliente.legalAdress}
            width="100%"
            id="outlined-required"
            label="Direccion*"
            {...register("legalAdress", {
              required: { value: true, message: "Campo requerido" },
            })}
            {...(errors.legalAdress && {
              error: true,
              helperText: errors.legalAdress.message,
            })}
          />

          <TextField
            defaultValue={cliente.startContract.split('T')[0]}
            width="100%"
            id="outlined-required"
            type={"date"}
            label="Comienzo del contrato*"
            InputLabelProps={{
              shrink: true,
            }}
            {...register("startContract", {
              required: { value: true, message: "Campo requerido" },
              validate: (value) => {
                setDateActual(value);
              },
            })}
            {...(errors.startContract && {
              error: true,
              helperText: errors.startContract.message,
            })}
          />

          <TextField
            defaultValue={cliente.endContract.split('T')[0]}
            width="100%"
            id="outlined-required"
            type={"date"}
            label="Fin del contrato*"
            InputLabelProps={{
              shrink: true,
            }}
            {...register("endContract", {
              required: { value: true, message: "Campo requerido" },
              min: {
                value: dateActual,
                message: "La fecha fin de contrato debe ser mayor a la de inicio",
              },
            })}
            {...(errors.endContract && {
              error: true,
              helperText: errors.endContract.message,
            })}
          />

          <Button
            disabled={!isDirty || !isValid}
            sx={{ backgroundColor: "#182d4f" }}
            type="submit"
            variant="contained"
          >
            Guardar
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default FormularioUpdateCliente;
