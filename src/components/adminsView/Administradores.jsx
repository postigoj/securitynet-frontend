import React,{useEffect} from "react";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Snackbar,
  Alert,
} from "@mui/material";
import ModalNuevoAdmin from "./ModalNuevoAdmin";
import DeleteIcon from '@mui/icons-material/Delete';
import { ModalUpdate } from "./ModalUpdate";
import { useSelector, useDispatch } from "react-redux";
import { getAdmins } from "../../state/admins";
import { deleteAdmin } from "../../state/admins";



const Administradores = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useDispatch()

  const admins = useSelector((state) => state.admins);
  
  const adminsNames = admins.map((admin) => admin.name);
  
  const handleDelete = async (id) => {
    await dispatch(deleteAdmin(id))
  }

  useEffect(() => {
    dispatch(getAdmins())
      }, [dispatch])

      //funciones snackbar
      const [state, setState] = React.useState({
        open: false,
        vertical: "top",
        horizontal: "center",
      });
      const { vertical, horizontal, open } = state;
      const[message, setMessage] = React.useState("")
    
      const handleCloseSnackbar = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        setState({ ...state, open: false });
      };

       const handleAddAdmin = () => {
        setState({ ...state, open: true });
        setMessage("Administrador agregado con éxito")
      };

      const handleDeleteAdmin = () => {
        setState({ ...state, open: true });
        setMessage("Administrador eliminado con éxito")
      };

      const handleUpdateAdmin = () => {
        setState({ ...state, open: true });
        setMessage("Administrador actualizado con éxito")
      };



    //value e inputvalue son para el autocomplete
    const [value, setValue] = React.useState(admins[0]);

    const [inputValue, setInputValue] = React.useState("");

    const adminActual = admins.find((a) => a.name === value);
    

  return (
    <Stack sx={{alignItems: "flex-start", width: "50%", m:"0 auto",  }}>
      <Typography variant="h5" sx={{my:6}}>Administradores</Typography>
      <ModalNuevoAdmin handleAddAdmin={handleAddAdmin} setInputValue={setInputValue}/>
      <Autocomplete
        freeSolo={true}
        disablePortal
        id="combo-box-demo"
        options={adminsNames}
        sx={{ width: "100%", mt: isMobile ? 2 : 4}}
        onChange={(event, newValue, ) => {
            setValue(newValue)
          
        }}
        inputValue={inputValue}
        value={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => <TextField {...params} label="Buscar administradores" />}
      />
      
      { adminActual && (
        <Stack
          sx={{
            mt: isMobile ? 5 : 10,
            textAlign: "flex-start",
            width: isMobile ? 200 : 400,
            height: 200,
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h6">{adminActual?.name}</Typography>
          <Typography sx={{ mt: 1}}>
          <Typography sx={{display: 'inline-block', fontWeight: 'bold'}} >Email:</Typography> {adminActual?.email}
          </Typography>
          <Typography sx={{ mt: 1, mb: 4 }}>
          <Typography sx={{display: 'inline-block', fontWeight: 'bold'}} >Puesto:</Typography> {adminActual?.role}
          </Typography>
          <Stack spacing={2} direction="row">
            <ModalUpdate prop={adminActual} handleUpdateAdmin={handleUpdateAdmin} setInputValue={setInputValue}/>
            <Button size="small" color="error" variant="outlined" startIcon={< DeleteIcon/>}
              onClick={async ()=>{ 
                await handleDelete(adminActual.id)
                setInputValue("")
                handleDeleteAdmin()
                }}>
              Borrar
            </Button>
          </Stack>
        </Stack>
      )}
       <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={state.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default Administradores;
