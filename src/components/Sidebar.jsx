import React from "react";

//Material ui styles
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SecurityIcon from "@mui/icons-material/Security";
import { Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import { Link } from "react-router-dom";

const Sidebar = () => {
  //media query
  const isBiggerScreen = useMediaQuery("(min-width:600px)");

  //state to toggle list guard(open close)
  const [openGuard, setOpenGuard] = React.useState(false);

  const handleGuardClick = () => {
    setOpenGuard(!openGuard);
  };

  //state to toggle list admin(open close)
  const [openAdmin, setOpenAdmin] = React.useState(false);

  const handleAdminClick = () => {
    setOpenAdmin(!openAdmin);
  };

  //state to toggle list client(open close)
  const [openClient, setOpenClient] = React.useState(false);

  const handleClientClick = () => {
    setOpenClient(!openClient);
  };

  return (
    <Box sx={{ bgcolor: "#748067" }} width={isBiggerScreen ? "300px" : "100%"}>
      <List
        sx={{ width: "100%", color: "#F4F4F4" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton onClick={handleAdminClick}>
          <ListItemIcon>
            <AdminPanelSettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Administradores" />
          {openAdmin ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openAdmin} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link
              to="/nuevoAdministrador"
              style={{ textDecoration: "none", color: "unset" }}
            >
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Nuevo administrador" />
              </ListItemButton>
            </Link>
            <Link
              to="/administradores"
              style={{ textDecoration: "none", color: "unset" }}
            >
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Administradores" />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>

        <ListItemButton onClick={handleClientClick}>
          <ListItemIcon>
            <AdminPanelSettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Clientes" />
          {openClient ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openClient} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link
              to="/nuevoCliente"
              style={{ textDecoration: "none", color: "unset" }}
            >
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Nuevo cliente" />
              </ListItemButton>
            </Link>
            <Link
              to="/clientes"
              style={{ textDecoration: "none", color: "unset" }}
            >
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Clientes" />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>

        <ListItemButton onClick={handleGuardClick}>
          <ListItemIcon>
            <SecurityIcon />
          </ListItemIcon>
          <ListItemText primary="Guardias de seguridad" />
          {openGuard ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openGuard} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link
              to="/nuevoGuardia"
              style={{ textDecoration: "none", color: "unset" }}
            >
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Nuevo guardia" />
              </ListItemButton>
            </Link>
            <Link
              to="/guardias"
              style={{ textDecoration: "none", color: "unset" }}
            >
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Guardias de seguridad" />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>
      </List>
    </Box>
  );
};

export default Sidebar;
