import React, { useState } from "react";
//imports material ui
import Box from "@mui/material/Box";
import { Alert, Button, Snackbar, TextField, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { LoadingButton } from "@mui/lab";

//imports react-hook-form
import { useForm } from "react-hook-form";
//imports redux
import { useDispatch } from "react-redux";
import { sendMail } from "../state/resetPassword";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  //loading button
  const [loading, setLoading] = React.useState(false);

  //dialog material
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //snackbar

  const [state, setState] = React.useState({
    openSnack: false,
    vertical: 'top',
    horizontal: 'center',
  })
  
  const { vertical, horizontal, openSnack } = state;

  const handleClick =()=> {
    setState({ ...state, openSnack: true });
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({ ...state, openSnack: false });
  };

  //react-hook form
  const onSubmit = async (values) => {
    setLoading(true);
    const response = await dispatch(sendMail(values));
    console.log("response", response);
    if (response.payload.info === "OK") {
      setLoading(false);
      handleClickOpen();
    }
    if(response.payload === "No se encontro un usuario"){
      handleClick({
          vertical: 'top',
          horizontal: 'center',
        })
      setLoading(false);
    }
    return resetField("email");
  };

  const {
    register,
    resetField,
    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm({ defaultValues: { email: "" }, mode: "onChange" });

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
        <Typography mb="20px" variant="h4">
          Restablece tu contraseña
        </Typography>

        <Typography mb="20px">
          Escribe tu email y te enviaremos las instrucciones para restablecer tu
          contraseña
        </Typography>
        <Box
          sx={{ width: "100%", maxWidth: "600px", backgroundColor: "#F4F4F4" }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                gap: "2rem",
                width: " 100%",
                display: "flex",
                flexDirection: "column",
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

              <LoadingButton
                disabled={!isDirty || !isValid}
                sx={{ backgroundColor: "#182d4f" }}
                type="submit"
                variant="contained"
                loading={loading}
              >
                Enviar
              </LoadingButton>
            </Box>
          </form>
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Resultado de su pedido"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            El mail fue enviado con exito a la casilla de correo proporcionada,
            porfavor dirigase a su mail para continuar con el proceso de cambio
            de contraseña
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={state.openSnack} autoHideDuration={4000} onClose={handleCloseSnack} anchorOrigin={{ vertical, horizontal }}>
        <Alert onClose={handleCloseSnack} severity="error" sx={{ width: '100%' }}>
          Email no registrado
        </Alert>
      </Snackbar>
    </>
  );
};

export default ForgotPassword;
