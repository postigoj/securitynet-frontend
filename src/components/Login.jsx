import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Alert, Button, Snackbar, TextField, Typography } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../state/user";
import { Link, useNavigate } from "react-router-dom";
import NotFound from "./NotFound";

const Login = () => {


  //SNACKBAR

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({ ...state, open: false });
  };

  //


  const [values, setValues] = React.useState({
    password: "",
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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const sendData = async (data) => {
    const resp = await dispatch(loginUser(data));
    if (resp.payload !== 401) {
      navigate("/");
    }else{
      setState({ ...state, open: true });
    }
  };



  const {
    register,
    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm({ defaultValues: { email: "", password: "" }, mode: "onChange" });

  return user.id ? (
    <NotFound />
  ) : (
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
          Login
        </Typography>
        <Box
          sx={{ width: "100%", maxWidth: "600px", backgroundColor: "#F4F4F4" }}
        >
          <form onSubmit={handleSubmit(sendData)}>
            <Box
              sx={{
                gap: "2rem",
                width: " 100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <TextField
                  name="email"
                  error={errors.email ? true : false}
                  helperText={errors.email ? "email inválido" : ""}
                  width="100%"
                  required
                  id="outlined-required"
                  label="email"
                  {...register("email", {
                    required: "This is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "invalid email address",
                    },
                  })}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
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
                  id="outlined-required"
                  label="password"
                  defaultValue="Hello World"
                  {...register("password", {
                    required: "This is required",
                    minLength: {
                      value: 8,
                      message: "Minimum length should be 8",
                    },
                  })}
                />
              </Box>
              <Box>
                <Link to="/verify" style={{ textDecoration: "none", color: "unset"}}>
                  <Typography>¿Olvidaste tu contraseña?</Typography>{" "}
                </Link>
              </Box>

              <Button
                disabled={!isDirty || !isValid}
                sx={{ backgroundColor: "#182d4f" }}
                type="submit"
                variant="contained"
              >
                Enviar
              </Button>
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
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: "100%" }}>
          Email no registrado en la base de datos
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;
