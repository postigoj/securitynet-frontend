import React, { useEffect } from "react";
import { Typography, TextField, Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { updateGuards } from "../../state/securityGuards";
import { useDispatch, useSelector } from "react-redux";
import ModalDireccionGuardia from "./ModalDireccionGuardia";
import { getCoords } from "../../state/coords";

const FormularioUpdateGuardia = ({
  guardia,
  handleClose,
  handleUpdateGuard,
  setInputValue,
}) => {
  const dispatch = useDispatch();
  
  const { lat, lon, address, province } = useSelector((state) => state.coords);
  //react-hook-form
  const {
    setValue,
    register,
    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    data.latitude = lat;
    data.longitude = lon;
    data.province = province
    await dispatch(updateGuards({ data, id: guardia.id }));
    dispatch(getCoords({ lat: null, lon: null, address: null, province: null }));
    handleUpdateGuard();
    setInputValue("");
    handleClose();
  };

  useEffect(() => {
    if (address) {
      setValue("adress", address, { shouldValidate: true, shouldDirty: true });
    }
  }, [address, setValue]);

  const [dateActual, setDateActual] = React.useState();

  return (
    <Stack spacing={4} textAlign={"center"}>
      <Typography variant="h5">Editar guardia</Typography>

      <form /* autoComplete="off" */ onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField
            defaultValue={guardia.name}
            width="100%"
            label="Nombre*"
            {...register("name", {
              required: { value: true, message: "Campo requerido" },
              minLength: {
                value: 3,
                message: "El name debe tener al menos 3 caracteres",
              },
              pattern: { value: /^[a-zA-Z ]+$/, message: "Solo letras" },
            })}
            {...(errors.name && {
              error: true,
              helperText: errors.name.message,
            })}
          />

          <TextField
            defaultValue={guardia.lastname}
            width="100%"
            id="outlined-required"
            label="Apellido*"
            {...register("lastname", {
              required: { value: true, message: "Campo requerido" },
              minLength: {
                value: 2,
                message: "Debe tener al menos 2 caracteres",
              },
            })}
            {...(errors.lastName && {
              error: true,
              helperText: errors.lastName.message,
            })}
          />

          <TextField
            defaultValue={guardia.email}
            width="100%"
            label="Email*"
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
          />

          <TextField
            defaultValue={guardia.phone}
            width="100%"
            type={"number"}
            id="outlined-required"
            label="Numero de teléfono/celular*"
            {...register("phone", {
              required: { value: true, message: "Campo requerido" },
              minLength: {
                value: 10,
                message: "El numero debe tener al menos 10 caracteres",
              },
            })}
            {...(errors.phone && {
              error: true,
              helperText: errors.phone.message,
            })}
          />

          <TextField
            defaultValue={guardia.cuil}
            width="100%"
            type={"number"}
            id="outlined-required"
            label="CUIL*"
            {...register("cuil", {
              required: { value: true, message: "Campo requerido" },
              minLength: {
                value: 10,
                message: "El CUIL debe tener al menos 10 caracteres",
              },
            })}
            {...(errors.cuil && {
              error: true,
              helperText: errors.cuil.message,
            })}
          />

          <ModalDireccionGuardia />
          <TextField
            defaultValue={guardia.adress}
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

          <TextField
            defaultValue={guardia.startContract.split("T")[0]}
            width="100%"
            id="outlined-required"
            type={"date"}
            label="Comienzo del contrato*"
            InputLabelProps={{
              shrink: true,
            }}
            {...register("startContract", {
              required: true,
              validate: (value) => {
                setDateActual(value);
              },
            })}
            {...(errors.startContract && {
              error: true,
              helperText: errors.startContract.message,
            })}
          />

          <TextField
            defaultValue={guardia.endContract.split("T")[0]}
            width="100%"
            id="outlined-required"
            type={"date"}
            label="Fin del contrato*"
            InputLabelProps={{
              shrink: true,
            }}
            {...register("endContract", {
              required: true,
              min: {
                value: dateActual,
                message:
                  "La fecha fin de contrato debe ser mayor a la de inicio",
              },
            })}
            {...(errors.endContract && {
              error: true,
              helperText: errors.endContract.message,
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

export default FormularioUpdateGuardia;
