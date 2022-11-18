import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Bienvenido from "./Bienvenido";

const Home = () => {
  const user = useSelector((state) => state.user);

  return user.id ? (
    <Bienvenido />
  ) : (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        padding: "20px",
        backgroundColor: "#748067",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#F4F4F4",
      }}
    >
      <Typography
        variant="h1"
        sx={{ fontSize: { xs: "3em", sm: "5em" } }}
        align="center"
      >
        Bienvenidos a SecurityNet
      </Typography>
      <Typography variant="subtitle1" sx={{ mt: 10 }} align="center">
        Para ingresar debe{" "}
        <Link to="/login" style={{ textDecoration: "none", color: "#182d4f" }}>
          iniciar sesión.
        </Link>
      </Typography>
      <Typography variant="subtitle1" sx={{ mt: 4 }} align="center">
        Si está interesado en nuestros servicios{" "}
        <Link
          to="/contacto"
          style={{ textDecoration: "none", color: "#182d4f" }}
        >
          contáctenos.
        </Link>
      </Typography>
    </Box>
  );
};

export default Home;
