import React from "react";

import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useMediaQuery, useTheme } from "@mui/material";

import emailjs from "@emailjs/browser";

import { useForm } from "react-hook-form";

const Contacto = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  //hook para manejar el formulario
  const {
    resetField,
    register,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      nombre: "",
      apellido: "",
      email: "",
      mensaje: "",
    },
  });

  const handleClick = () => {
    return (
      resetField("nombre"),
      resetField("apellido"),
      resetField("email"),
      resetField("mensaje"),
      resetField("telefono")
    );
  };

  //funciones snackbar
  const [state, setState] = React.useState({
    open: false,
    vertical: "bottom",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({ ...state, open: false });
  };

  //funcion enviar email
  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      const result = await emailjs.sendForm(
        "service_c4r3mkk",
        "template_tv9kv6c",
        e.target,
        "tMQq6ywToI79R-Vd1"
      );
      console.log("result", result);
      if (result.text === "OK") {
        setState({ ...state, open: true });
        handleClick();
      }
    } catch (error) {
      console.log(error.text);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#F4F4F4",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <Box>
        <Typography
          variant="h6"
          color="#182d4f"
          align="center"
          sx={{ mt: 4, mb: 1 }}
        >
          CONTACTENOS
        </Typography>
        <Typography variant="subtitle2" color="#748067" align="center">
          ESTAMOS PARA AYUDARLO
        </Typography>
        <Typography
          variant="body1"
          color="#748067"
          align="center"
          sx={{ mt: 4 }}
        >
          Las inquietudes y necesidades de nuestros clientes nos ayudan a
          mejorar nuestros servicios, por lo cual apostamos a una comunicación
          más cercana y transparente.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="form"
          onSubmit={sendEmail}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            mx: { xs: 2 },
          }}
        >
          <Typography variant="body1" color="#F4F4F4" sx={{ my: 2 }}>
            Complete este formulario
          </Typography>
          <TextField
            {...register("nombre", {
              required: { value: true, message: "Campo requerido" },
              minLength: { value: 3, message: "Al menos 3 caracteres" },
              maxLength: { value: 20, message: "Maximo 20 caracteres" },
              pattern: { value: /^[a-zA-Z ]+$/, message: "Solo letras" },
            })}
            {...(errors.nombre && {
              error: true,
              helperText: errors.nombre.message,
            })}
            fullWidth
            label="Nombre"
            name="nombre"
            sx={{
              my: 1,
              "& label.Mui-focused": {
                color: "#182d4f",
              },
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "#182d4f",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#748067",
                },
              },
            }}
          />
          <TextField
            {...register("apellido")}
            fullWidth
            label="Apellido"
            name="apellido"
            sx={{
              my: 1,
              "& label.Mui-focused": {
                color: "#182d4f",
              },
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "#182d4f",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#748067",
                },
              },
            }}
          />
          <TextField
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
            fullWidth
            label="Email"
            name="email"
            sx={{
              my: 1,
              "& label.Mui-focused": {
                color: "#182d4f",
              },
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "#182d4f",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#748067",
                },
              },
            }}
          />
          <TextField
            {...register("telefono")}
            fullWidth
            label="Teléfono"
            name="telefono"
            sx={{
              my: 1,
              "& label.Mui-focused": {
                color: "#182d4f",
              },
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "#182d4f",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#748067",
                },
              },
            }}
          />
          <TextField
            {...register("mensaje", {
              required: { value: true, message: "Campo requerido" },
              minLength: { value: 10, message: "Al menos 10 caracteres" },
            })}
            {...(errors.mensaje && {
              error: true,
              helperText: errors.mensaje.message,
            })}
            fullWidth
            multiline
            rows={4}
            label="Mensaje"
            name="mensaje"
            sx={{
              my: 1,
              "& label.Mui-focused": {
                color: "#182d4f",
              },
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "#182d4f",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#748067",
                },
              },
            }}
          />
          <Button
            disabled={!isDirty || !isValid}
            variant="contained"
            type="submit"
            sx={{
              width: 150,
              backgroundColor: "#182d4f",
              color: "#F4F4F4",
              alignSelf: "flex-end",
            }}
          >
            Enviar
          </Button>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", ml: 4 }}>
          <Box sx={{ display: "flex" }}>
            <LocalPhoneIcon
              sx={{ width: 30, height: 30, mt: 10, ml: 4, color: "#182d4f" }}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                variant="body1"
                color="#748067"
                sx={{ ml: 2, mt: 10 }}
              >
                COMUNIQUESE AL
              </Typography>
              <Typography
                variant="subtitle2"
                color="#748067"
                sx={{ mt: 1, ml: 2 }}
              >
                0800-111-111
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex" }}>
            <EmailIcon
              sx={{ width: 30, height: 30, mt: 5, ml: 4, color: "#182d4f" }}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="body1" color="#748067" sx={{ ml: 2, mt: 5 }}>
                ENVIANOS UN CORREO A
              </Typography>
              <Typography
                variant="subtitle2"
                color="#748067"
                sx={{ mt: 1, ml: 2 }}
              >
                contacto@securitynet.com
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex" }}>
            <LocationOnIcon
              sx={{ width: 30, height: 30, mt: 5, ml: 4, color: "#182d4f" }}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="body1" color="#748067" sx={{ ml: 2, mt: 5 }}>
                ENCUENTRANOS EN
              </Typography>
              <Typography
                variant="subtitle2"
                color="#748067"
                sx={{ mt: 1, ml: 2 }}
              >
                Calle1 640, CABA, Bs. As.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={state.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Mensaje enviado con éxito!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contacto;
