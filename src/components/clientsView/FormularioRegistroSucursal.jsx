import React, { useEffect } from "react";
import { Button, TextField, Typography, Stack } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useForm } from "react-hook-form";

//imports redux
import { useDispatch, useSelector } from "react-redux";
import { registerBranchOffice } from "../../state/branchOffices";
import { getProvinces } from "../../state/provinces";
import ModalDireccionGuardia from "../guardaView/ModalDireccionGuardia";
import { getCoords } from "../../state/coords";

const FormularioRegistroSucursal = ({
  handleClose,
  clienteActual,
  handleAddBranchOffice,
}) => {
  const dispatch = useDispatch();
  const provinces = useSelector((state) => state.provinces);

  const { lat, lon, address, province } = useSelector((state) => state.coords);

  console.log("address", address);

  //react-hook-form
  const {
    resetField,
    register,
    formState: { errors, isDirty, isValid },
    handleSubmit,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: { adress: "" },
  });

  
  useEffect(() => {
    if (address) {
      setValue("adress", address, { shouldValidate: true, shouldDirty: true });
    }
  }, [address, setValue]);

  const onSubmit = async (data) => {
    data.latitude = lat;
    data.longitude = lon;
    data.province = province;
    await dispatch(registerBranchOffice({ data, clientId: clienteActual.id }));
    dispatch(getCoords({ lat: null, lon: null, address: null, province: null }));
    handleAddBranchOffice();
    handleClose();
  };

  return (
    <Stack spacing={4}>
      <Typography variant="h5">Crear nueva sucursal</Typography>

      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <ModalDireccionGuardia />
          <TextField
            name="adress"
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
            Crear
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default FormularioRegistroSucursal;
