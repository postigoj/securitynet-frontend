import React from "react";
import { Box, Button, MenuItem, Modal, Typography } from "@mui/material";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addEvent } from "../state/branchOfficeEvents";
import { formatDate } from "@fullcalendar/react";

import { useForm } from "react-hook-form";
import { getFilteredBranchOffice } from "../state/filteredBranchOffice";

const ModalEventoGuard = ({ onEventAdded }) => {
  const actualSecurityGuard = useSelector((state) => state.oneSecurityGuard);
  const branchOffices = useSelector((state) => state.filteredBranchOffice);

  const dispatch = useDispatch();

  const {
    register,
    formState: { errors, isDirty, isValid },
    handleSubmit,
    setValue,
    resetField,
  } = useForm({ mode: "onChange" });

  //modal
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //seteo hora

  const [hourStart, setHourStart] = React.useState(null);

  useEffect(() => {
    dispatch(getFilteredBranchOffice({ id: actualSecurityGuard.id }));
  }, [hourStart]);

  const [hourEnd, setHourEnd] = React.useState(null);

  const [branch, setBranch] = React.useState("");

  const branchOfficeActual = branchOffices.find((a) => a.id === branch?.id);

  const start = dayjs(hourStart).toDate();
  const end = dayjs(hourEnd).toDate();

  const dateNow = formatDate(start, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const onSubmit = async () => {
    await dispatch(
      addEvent({
        date: dateNow,
        title:
          `${actualSecurityGuard?.name} ${actualSecurityGuard?.lastname}`.toUpperCase(),
        start: start,
        end: end,
        guardId: actualSecurityGuard?.id,
        branchOfficeId: branchOfficeActual?.id,
      })
    );
    return(setHourEnd(null), setHourStart(null), setBranch(""), handleClose())
    
  };

  return (
    <>
      <Button
        sx={{ backgroundColor: "#182d4f" }}
        type="submit"
        variant="contained"
        onClick={handleOpen}
      >
        Agregar evento
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              width: 200,
              height: 400,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              border: "1px solid grey",
              borderRadius: "10px",
              boxShadow: 24,
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Typography variant="h6" id="modal-modal-title" component="h2">
                Agregar Evento
              </Typography>

              <DateTimePicker
                label="Start"
                name="start"
                value={hourStart}
                onChange={(newValue) => {
                  setHourStart(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    {...register("start", {
                      required: true,
                      setValue: setValue("start", hourStart),
                      validate: (value) => setHourStart(value),
                    })}
                    {...(errors.start && {
                      error: true,
                      helperText: errors.start.message,
                    })}
                  />
                )}
              />

              <DateTimePicker
                label="End"
                name="end"
                value={hourEnd}
                onChange={(newValue) => {
                  setHourEnd(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    {...register("end", {
                      required: true,
                      setValue: setValue("end", hourEnd),
                      min: {
                        value: hourStart,
                        message:
                          "La hora de finalización debe ser mayor a la de inicio",
                      },
                    })}
                    {...(errors.end && {
                      error: true,
                      helperText: errors.end.message,
                    })}
                  />
                )}
              />
              {hourStart && hourEnd && (
                <TextField
                  select
                  label="Sucursal"
                  value={branch}
                  sx={{ width: "100%", textTransform: "capitalize" }}
                  {...register("branch", {
                    required: true,
                    setValue: setValue("branch", branch),
                    onChange: (e) => setBranch(e.target.value),
                  })}
                >
                  {branchOffices?.map((branch) => (
                    <MenuItem
                      key={branch.id}
                      sx={{ textTransform: "capitalize" }}
                      value={branch}
                    >
                      {branch.adress}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            </LocalizationProvider>
            <Button
              disabled={!isDirty && !isValid}
              sx={{ backgroundColor: "#182d4f" }}
              type="submit"
              variant="contained"
            >
              Agregar
            </Button>
          </Box>
        </form>
      </Modal>
    </>
  );
};

export default ModalEventoGuard;
