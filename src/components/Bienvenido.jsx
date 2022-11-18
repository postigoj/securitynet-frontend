import { Stack, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Bienvenido = () => {
  const user = useSelector((state) => state.user);

  return (
    <Stack
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ width: "100%" }}
    >
      <Typography variant="h2">Bienvenido/a</Typography>
      <Typography
        variant="h2"
        sx={{ color: "#182d4f", textTransform: "capitalize" }}
      >
        {user.name}
      </Typography>
    </Stack>
  );
};

export default Bienvenido;
