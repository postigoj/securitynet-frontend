import React from "react";

import { Stack, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Notfound = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <Stack
      sx={{
        backgroundColor: "#748067",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        color: "#F4F4F4",
      }}
    >
      <Typography variant="h6" sx={{ color: "#182d4f" }}>
        Ups! Algo salio mal...
      </Typography>
      <Typography variant="h1">404</Typography>
      <Typography variant="h3" sx={{ color: "#182d4f" }}>
        Not Found
      </Typography>
      <Button
        onClick={handleClick}
        variant="contained"
        sx={{ marginTop: "40px" }}
      >
        Volver al Home
      </Button>
    </Stack>
  );
};

export default Notfound;
