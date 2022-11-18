import React from "react";
import Box from "@mui/material/Box";
import { Button, TextField, Typography } from "@mui/material";
import { Snackbar, Alert } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { LoadingButton } from "@mui/lab";


import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { resetPassword } from "../state/resetPassword";
import { useParams, useNavigate } from "react-router-dom";

const Reset = () => {
  //loading button
  const [loading, setLoading] = React.useState(false);
  //hide password
  const [values, setValues] = React.useState({
    password: "",
    confirmPassword: "",
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  //snackbar
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
  const handleDifPassword = () => {
    setState({ ...state, open: true });
    setMessage("Las contraseñas no coinciden, porfavor intente de nuevo");
  };
  const handleSuccesPassChanged = () => {
    setState({ ...state, open: true });
    setMessage("La contraseña fue cambiada con exito");
  };
  //react-hookform
  const dispatch = useDispatch();
  const token = useParams("token").token;

  const onSubmit = async (values) => {
    const { password, confirmPassword } = values;
    if (password !== confirmPassword) {
      handleDifPassword();
    } else {
      setLoading(true)
      const response = await dispatch(
        resetPassword({ newPassword: password, token: token })
      );
      handleSuccesPassChanged();
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  };

  const {
    register,
    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: { password: "", confirmPassword: "" },
    mode: "onChange",
  });

  return (
    <>
      <Box
        sx={{
          width: " 100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F4F4F4",
          padding: "20px",
        }}
      >
        <Typography mb="40px" variant="h4">
          Elige una nueva contraseña
        </Typography>
        <Box
          sx={{ width: "100%", maxWidth: "600px", backgroundColor: "#F4F4F4" }}
        >
          <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                gap: "2rem",
                width: " 100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                name="password"
                error={errors.password ? true : false}
                helperText={
                  errors.password
                    ? "La contraseña debe tener mínimo 8 caracteres"
                    : ""
                }
                type={values.showPassword ? "text" : "password"}
                required
                id="password"
                label="New password"
                {...register("password", {
                  required: "This is required",
                  minLength: {
                    value: 8,
                    message: "Minimum length should be 8",
                  },
                })}
              />
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                name="confirmPassword"
                error={errors.confirmPassword ? true : false}
                helperText={
                  errors.confirmPassword
                    ? "La contraseña debe tener mínimo 8 caracteres"
                    : ""
                }
                type={values.showPassword ? "text" : "password"}
                required
                id="confirm-password"
                label="Confirm Password"
                {...register("confirmPassword", {
                  required: "This is required",
                  minLength: {
                    value: 8,
                    message: "Minimum length should be 8",
                  },
                })}
              />

              <LoadingButton
                loading={loading}
                disabled={!isDirty || !isValid}
                sx={{ backgroundColor: "#182d4f" }}
                type="submit"
                variant="contained"
              >
                Enviar
              </LoadingButton>
            </Box>
          </form>
        </Box>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={state.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={
            message === "La contraseña fue cambiada con exito"
              ? "success"
              : "error"
          }
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Reset;
