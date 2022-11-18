import React from "react";

//styles material ui
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import { Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

//import react-router
import { Link } from "react-router-dom";

//imports redux
import { useSelector } from "react-redux";

const Footer = () => {
  const user = useSelector((state) => state.user);
  const isBiggerScreen = useMediaQuery("(min-width:600px)");

  return (
    <Box
      component={"footer"}
      sx={{ backgroundColor: "#182d4f", color: "#F4F4F4" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" component="div" sx={{ fontFamily: "Oswald" }}>
          SECURITYNET
        </Typography>

        {isBiggerScreen && (
          <Typography
            paragraph={true}
            sx={{ margin: "0", fontWeight: "200", fontSize: "15px" }}
          >
            © 2022 securitynet company. All rights reserved
          </Typography>
        )}
        {!user.id && (
          <Link
            to="/contacto"
            style={{ textDecoration: "none", color: "unset" }}
          >
            <IconButton
              size="small"
              aria-label="link to contact info"
              color="inherit"
            >
              <ContactPageIcon />
              Contacto
            </IconButton>
          </Link>
        )}
      </Toolbar>
    </Box>
  );
};

export default Footer;
