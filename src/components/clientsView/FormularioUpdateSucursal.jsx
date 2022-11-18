import React, { useEffect } from "react";
import { Typography, TextField, Button, Stack } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useForm } from "react-hook-form";
//imports redux
import { useSelector, useDispatch } from "react-redux";
import { getProvinces } from "../../state/provinces";
import { editBranchOffice } from "../../state/branchOffices";
import ModalDireccionGuardia from "../guardaView/ModalDireccionGuardia";
import { getCoords } from "../../state/coords";

const FormularioUpdateSucursal = ({ sucursal, setInputValue, handleClose, handleUpdateBranchOffice }) => {
  const dispatch = useDispatch();
  const { lat, lon, address, province } = useSelector((state) => state.coords);

  useEffect(() => {
    dispatch(getProvinces());
  }, [dispatch]);
  //react-hook-form
  const {
    setValue,
    register,
    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm({ mode: "onChange" });


  console.log("sucursal", sucursal);

  const onSubmit = async (data) => {
    await dispatch(
      editBranchOffice({
        ...data,
        clientId: sucursal.clientId,
        sucursalId: sucursal.id,
      })
    );
    setInputValue("");
    dispatch(getCoords({ lat: null, lon: null, address: null, province: null }));
    handleUpdateBranchOffice()
    handleClose();
  };

  useEffect(() => {
    if (address) {
      setValue("adress", address, { shouldValidate: true, shouldDirty: true });
    }
  }, [address, setValue]);

  return (
    <Stack spacing={4} textAlign={"center"}>
      <Typography variant="h5">Editar sucursal</Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
        <ModalDireccionGuardia />
          <TextField
            defaultValue={sucursal.adress}
            width="100%"
            label="Dirección"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              readOnly: true,
            }}
            placeholder="Dirección"
            {...register("adress", {
              required: true,
            })}
          />

          <Button
            disabled={!isDirty || !isValid}
            sx={{ backgroundColor: "#182d4f" }}
            type="submit"
            variant="contained"
          >
            Guardar
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default FormularioUpdateSucursal;
