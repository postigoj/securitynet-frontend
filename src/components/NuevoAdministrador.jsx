import React from "react";
import {
  Button,
  TextField,
  Typography,
  Stack,
  Snackbar,
  Alert,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerAdmin } from "../state/admins";

const NuevoAdministrador = () => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);

  //react-hook-form
  const {
    register,
    resetField,
    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm({ defaultValues: { name: "" }, mode: "onChange" });

  // const onSubmit = (data) => {
  //   dispatch(registerAdmin(data));
  //   handleClick()
  // };

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

  const onSubmit = (data) => {
    dispatch(registerAdmin(data));
    handleClick();
    return (
      resetField("name"),
      resetField("email"),
      resetField("password"),
      resetField("role")
    );
  };


  const [role, setRole] = React.useState("");

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <Stack
      py="70px"
      justifyContent="center"
      alignItems="center"
      width="100%"
      spacing={4}
    >
      <Typography variant="h5">Crear nuevo administrador</Typography>
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
                Administrador creado con éxito
              </Alert>
            </Snackbar>
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
};

export default NuevoAdministrador;
