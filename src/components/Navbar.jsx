import React from "react";

//styles material ui
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { Divider } from "@mui/material";

//react-router
import { Link, useNavigate } from "react-router-dom";

//redux
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../state/user";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/')
    handleClose() 
  }

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#182d4f", color: "#F4F4F4" }}
    >
      <Toolbar>
        <Link
          to={"/"}
          style={{ textDecoration: "none", color: "unset", flexGrow: 1 }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ fontFamily: "Oswald" }}
          >
            SECURITYNET
          </Typography>
        </Link>

        {user.id ? (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <PersonIcon fontSize="small" sx={{ marginRight: "20px" }} />{" "}
                Perfil
              </MenuItem>
              <Divider variant="middle"/>
              <MenuItem onClick={handleLogout} sx={{ color: "#182d4f" }}>
                <LogoutIcon fontSize="small" sx={{ marginRight: "20px" }} />
                Logout
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <Link
            to={"/login"}
            style={{ textDecoration: "none", color: "unset" }}
          >
            <Typography>LOGIN</Typography>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
