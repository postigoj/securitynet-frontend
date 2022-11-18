import React from "react";
import { Typography, TextField, Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { editAdmin } from "../../state/admins";

const FormularioUpdate = ({ admin,handleClose,handleUpdateAdmin, setInputValue }) => {
  //react-hook-form
  const {
    register,
    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm({ mode: "onChange" });

const dispatch = useDispatch();

  const onSubmit = async(data) => {
    await dispatch(editAdmin({data, id: admin.id}))
    handleUpdateAdmin()
    setInputValue("")
    handleClose()
  };

  

  return (
    <Stack spacing={4} textAlign={"center"}>
      <Typography variant="h5">Editar administrador</Typography>

      <form /* autoComplete="off" */ onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField
            width="100%"
            label="Nombre*"
            defaultValue={admin.name}
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
            width="100%"
            label="Puesto de trabajo*"
            defaultValue={admin.role}
            {...register("role", {
              required: { value: true, message: "Campo requerido" },
            })}
            {...(errors.role && {
              error: true,
              helperText: errors.role.message,
            })}
          />

          <TextField
            width="100%"
            label="Email*"
            defaultValue={admin.email}
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

export default FormularioUpdate;
