import React, { useEffect } from "react";

//imports styles material ui
import { Container, Stack, Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

//import react-router
import { Routes, Route, Navigate } from "react-router-dom";

//import redux
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./state/user";

//import componentes
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import Contacto from "./components/Contacto";
import NuevoAdministrador from "./components/NuevoAdministrador";
import Sidebar from "./components/Sidebar";
import Administradores from "./components/adminsView/Administradores";
import NuevoCliente from "./components/NuevoCliente";
import Clientes from "./components/clientsView/Clientes";
import NuevoGuardia from "./components/NuevoGuardia";
import Guardias from "./components/guardaView/Guardias";
import ResetPassword from "./components/ResetPassword";
import NotFound from "./components/NotFound";
import Calendario from "./commons/CalendarioBranchOffice";


function App() {
  const isBiggerScreen = useMediaQuery("(min-width:600px)");
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <Box>
      <Stack sx={{ height: "100vh" }}>
        <Navbar />
        <Box sx={{ flexGrow: 1 }}>
          <Stack
            flexDirection={isBiggerScreen ? "row" : "column"}
            height={"100%"}
          >
            {user.id && <Sidebar />}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route
                path="/nuevoAdministrador"
                element={<NuevoAdministrador />}
              />
              <Route path="/administradores" element={<Administradores />} />
              <Route path="/nuevoCliente" element={<NuevoCliente />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/nuevoGuardia" element={<NuevoGuardia />} />
              <Route path="/guardias" element={<Guardias />} />
              <Route path="/login" element={<Login />} />
              <Route path="/verify" element={<ForgotPassword />} />
              <Route path="/reset/:token" element={<ResetPassword />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" />} />
              <Route path="/calendar" element={<Calendario />} />
            </Routes>
          </Stack>
        </Box>
        <Footer />
      </Stack>
    </Box>
  );
}

export default App;
