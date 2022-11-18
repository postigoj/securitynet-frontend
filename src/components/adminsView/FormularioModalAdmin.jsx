import React from "react";
import {
  Typography,
  TextField,
  Button,
  Stack,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerAdmin } from "../../state/admins";

const FormularioModalAdmin = ({
  handleClose,
  handleAddAdmin,
  setInputValue,
}) => {
  const dispatch = useDispatch();

  //react-hook-form
  const {
    resetField,
    register,
    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    await dispatch(registerAdmin(data));
    handleAddAdmin();
    setInputValue("");
    handleClose();
  };

  const [role, setRole] = React.useState("");

  const handleChange = (event) => {
    setRole(event.target.value);
  };


  return (
    <Stack spacing={4} textAlign={"center"}>
      <Typography variant="h5">Crear nuevo administrador</Typography>

      <form /* autoComplete="off" */ onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField
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

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="rolee">Rol</InputLabel>
            <Select
              id="rolee"
              label="Rol*"
              value={role}
              {...register("role", {
                required: { value: true, message: "Campo requerido" },
                onChange: handleChange,
              })}
              {...(errors.role && {
                error: true,
                helperText: errors.role.message,
              })}
            >
              <MenuItem value={"Jefe"}>Jefe</MenuItem>
              <MenuItem value={"CEO"}>CEO</MenuItem>
              <MenuItem value={"RRHH"}>RRHH</MenuItem>
              <MenuItem value={"Otro"}>Otro</MenuItem>
            </Select>
          </FormControl>

          <TextField
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
            width="100%"
            type="password"
            label="Password*"
            {...register("password", {
              required: { value: true, message: "Campo requerido" },
              minLength: {
                value: 8,
                message: "La contraseña debe tener al menos 8 caracteres",
              },
            })}
            {...(errors.password && {
              error: true,
              helperText: errors.password.message,
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

export default FormularioModalAdmin;
