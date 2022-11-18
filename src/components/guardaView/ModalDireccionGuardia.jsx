import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Stack, TextField, useMediaQuery, useTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerGuards } from "../../state/securityGuards";
import Maps from "../Maps";
import SearchBox from "../SearchBox";
import { useEffect } from "react";
import { getCoords } from "../../state/coords";
import { isSelected } from "../../state/selected";

const ModalDireccionGuardia = ({ handleAddGuard, setInputValue }) => {
  const isSelectedBoolean = useSelector((state) => state.isSelected);
  const [selectPosition, setSelectPosition] = useState(null);
  const dispatch = useDispatch();
  //console.log("------>", selectPosition);

  useEffect(() => {
    if (selectPosition) {
      dispatch(
        getCoords({
          lat: selectPosition.lat,
          lon: selectPosition.lon,
          address: selectPosition.display_name,
          province: selectPosition.address.state,
        })
      );
    }
  }, [dispatch, selectPosition]);

  //react-hook-form
  const {
    register,
    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    console.log("data", data);
    await dispatch(registerGuards(data));
    handleAddGuard();
    handleClose();
  };

  //responsive
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  //modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    dispatch(isSelected(false));
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        // startIcon={}
        onClick={handleOpen}
        sx={{ mt: 2, width: "100%" }}
      >
        Agregar Dirección
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            width: 800,
            height: 600,
            display: "flex",

            // width: isMobile ? 200 : 100,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-40%, -50%)",
            bgcolor: "background.paper",
            border: "1px solid grey",
            borderRadius: "10px",
            boxShadow: 24,
            // p: 4,
          }}
        >
          <Stack sx={{ width: "40%", height: "100%" }}>
            <SearchBox
              selectPosition={selectPosition}
              setSelectPosition={setSelectPosition}
            />
            {isSelectedBoolean ? (
              <Button onClick={handleClose}>Confirmar seleccion</Button>
            ) : (
              <Button disabled>Confirmar seleccion</Button>
            )}
          </Stack>

          <Stack sx={{ width: "60%", height: "100%" }}>
            <Maps selectPosition={selectPosition} />
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default ModalDireccionGuardia;
