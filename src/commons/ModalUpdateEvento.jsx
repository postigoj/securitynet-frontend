import React, { useState } from "react";
import { Box, Button, MenuItem, Modal, Typography } from "@mui/material";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { formatDate } from "@fullcalendar/react";
import { getFilteredGuards } from "../state/filteredGuards";
import { useForm } from "react-hook-form";
import { editEvent } from "../state/branchOfficeEvents";

const ModalUpdateEvento = ({ event, handleCloseDialog }) => {
  const dispatch = useDispatch();

  const securityGuards = useSelector((state) => state.filteredGuards);
  const actualBranchOffice = useSelector((state) => state.oneBranchOffice);

  const {
    register,
    formState: { errors, isDirty, isValid },
    handleSubmit,
    setValue,
  } = useForm({ mode: "onChange" });

  //modal
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //seteo hora

  const [hourStart, setHourStart] = useState(event?.start);

  const [hourEnd, setHourEnd] = useState(event?.end);

  useEffect(() => {
    const date = dayjs(hourStart?.$d).format("MM/DD/YYYY HH:mm A").slice(0, 10);
    dispatch(getFilteredGuards({ id: actualBranchOffice.id, dateEvent: date }));
  }, [hourStart]);

  const [guard, setGuard] = useState(event?.title);

  const guardiaActual = securityGuards.find((a) => a.cuil === guard?.cuil);

  const dateNow = formatDate(event?.start, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const onSubmit = async () => {
    await dispatch(
      editEvent({
        eventId: event.id,
        date: dateNow,
        start: dayjs(hourStart),
        end: dayjs(hourEnd),
        title:
          `${guardiaActual?.name} ${guardiaActual?.lastname}`.toUpperCase(),
        securityGuardId: guardiaActual?.id,
        branchOfficeId: actualBranchOffice?.id,
      })
    );
    handleCloseDialog();
    handleClose();
  };

  return (
    <>
      <Button type="submit" onClick={handleOpen}>
        Editar
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
                EditarEvento
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
                          "La hora de finalizacion debe ser mayor a la de inicio",
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
                  defaultValue={event?.title}
                  onChange={(e) => setGuard(e.target.value)}
                  label="Guardia"
                  sx={{ width: "100%", textTransform: "capitalize" }}
                  {...register("guard", {
                    required: true,
                    setValue: setValue("guard", guard),
                    onChange: (e) => setGuard(e.target.value),
                  })}
                  {...(errors.guard && {
                    error: true,
                    helperText: errors.guard.message,
                  })}
                >
                  {securityGuards?.map((guard) => (
                    <MenuItem
                      key={guard.id}
                      sx={{ textTransform: "capitalize" }}
                      value={guard}
                    >
                      {guard.name} {guard.lastname}
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
              Guardar
            </Button>
          </Box>
        </form>
      </Modal>
    </>
  );
};

export default ModalUpdateEvento;
