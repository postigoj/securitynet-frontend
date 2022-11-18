import React, { useState } from "react";
import { Box, Button, MenuItem, Modal,Typography } from "@mui/material";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { editEvent } from "../state/branchOfficeEvents";
import { formatDate } from "@fullcalendar/react";
import { useForm } from "react-hook-form";
import { getFilteredBranchOffice } from "../state/filteredBranchOffice";

const ModalUpdateEventoGuard = ({ event, handleCloseDialog }) => {
  const actualSecurityGuard = useSelector((state) => state.oneSecurityGuard);
  const branchOffices = useSelector((state) => state.filteredBranchOffice);

  const dispatch = useDispatch();

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
    dispatch(getFilteredBranchOffice({ id: actualSecurityGuard.id }));
  }, [hourStart]);

  const [branch, setBranch] = useState(null);

  const brancOfficeActual = branchOffices.find((a) => a.id === branch?.id);

  const dateNow = formatDate(event?.start, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const onSubmit = async () => {
    await dispatch(
      editEvent({
        eventId: event?.id,
        date: dateNow,
        start: dayjs(hourStart),
        end: dayjs(hourEnd),
        title:
          `${actualSecurityGuard?.name} ${actualSecurityGuard?.lastname}`.toUpperCase(),
        securityGuardId: actualSecurityGuard?.id,
        branchOfficeId: brancOfficeActual?.id,
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
                Editar Evento
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
                  />
                )}
              />
              <DateTimePicker
                label="End"
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
                  onChange={(e) => setBranch(e.target.value)}
                  label="Sucursal"
                  sx={{ width: "100%", textTransform: "capitalize" }}
                  {...register("branch", {
                    required: true,
                    setValue: setValue("branch", branch),
                    onChange: (e) => setBranch(e.target.value),
                  })}
                  {...(errors.branch && {
                    error: true,
                    helperText: errors.branch.message,
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
              Guardar
            </Button>
          </Box>
        </form>
      </Modal>
    </>
  );
};

export default ModalUpdateEventoGuard;
