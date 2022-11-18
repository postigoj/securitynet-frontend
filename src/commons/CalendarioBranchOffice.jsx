import React, { useState } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button, Stack, Typography } from "@mui/material";
import ModalEvento from "./ModalEvento";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteEvent,
  getBranchOfficeEvents,
} from "../state/branchOfficeEvents";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import ModalUpdateEvento from "./ModalUpdateEvento";
import { getFilteredGuards } from "../state/filteredGuards";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CalendarioBranchOffice = () => {
  const dispatch = useDispatch();

  const calendarRef = React.createRef(null);

  const oneBranchOffice = useSelector((state) => state.oneBranchOffice);
  const branchOfficeId = oneBranchOffice.id;
  const events = useSelector((state) => state.branchOfficeEvents);

  useEffect(() => {
    dispatch(getBranchOfficeEvents(branchOfficeId));
  }, [branchOfficeId, dispatch]);

  const [state, setState] = useState({
    weekendsVisible: true,
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [branchOffId, setBranchOffId] = useState();
  const [eventId, setEventId] = useState();
  const [securityGuardId, setSecurityGuardId] = useState();
  const [title, setTitle] = useState();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  const handleEventClick = (clickInfo) => {
    console.log(clickInfo.event);

    setBranchOffId(clickInfo.event.extendedProps.branchofficeId);
    setSecurityGuardId(clickInfo.event.extendedProps.securityguardId);
    setEventId(clickInfo.event.id);
    setTitle(clickInfo.event.title);
    setStart(clickInfo.event.startStr);
    setEnd(clickInfo.event.endStr);

    handleClickOpen();
  };

  const handleDelete = async () => {
    await dispatch(
      deleteEvent({ eventId, branchOfficeId: branchOffId, securityGuardId })
    );
    handleClose();
  };

  return (
    <>
      <Stack sx={{ width: "100%", alignItems: "center", mt: 6 }}>
        <ModalEvento />

        <Stack sx={{ p: 3, width: "100%" }}>
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            events={events}
            eventClick={handleEventClick}
            initialView="dayGridMonth"
            height="50vh"
            width="auto"
            navLinks="true"
            nowIndicator="true"
          />
        </Stack>
      </Stack>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{textAlign:"center"}}>{"EVENTO"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body1" sx={{mt:2}}>INICIA: {`${start?.split("T")[0]} a las ${start?.split("T")[1].slice(0,5)}`}</Typography>
            <Typography variant="body1">FINALIZA: {`${end?.split("T")[0]} a las ${end?.split("T")[1].slice(0,5)}`}</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete}>Eliminar</Button>
            { events && events.length && events?.map((event) => {
              if (event?.id == eventId) {
                return (
                  <ModalUpdateEvento
                    event={event}
                    handleCloseDialog={handleClose}
                  />
                );
              }
            })}
          <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CalendarioBranchOffice;
