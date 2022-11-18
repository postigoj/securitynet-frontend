import React, { useState } from "react";
import { Box, Button, OutlinedInput, Stack, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import axios from "axios";

//redux
import { useDispatch } from "react-redux";
import { isSelected } from "../state/selected";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

const SearchBox = ({ selectPosition, setSelectPosition }) => {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);
  //console.log("soy searchbox", listPlace);

  const handleBackgroundChange = (e) => {
    e.target.style.backgroundColor = "#e0dfdf";
  };
  const handleBlur = (e) => {
    e.target.style.backgroundColor = "";
  };

  return (
    <Box>
      <Stack>
        <OutlinedInput
          sx={{ m: "15px" }}
          value={searchText}
          onChange={(event) => {
            setSearchText(event.target.value);
          }}
        />
        <Button
          variant="contained"
          size="small"
          sx={{ marginX: "15px" }}
          onClick={async () => {
            const params = {
              q: searchText,
              format: "json",
              addressdetails: "addressdetails",
            };
            const queryString = new URLSearchParams(params).toString();
            const res = await axios.get(`${NOMINATIM_BASE_URL}${queryString}`);
            setListPlace(res.data);
            // console.log(res.data);
          }}
        >
          Buscar dirección
        </Button>
      </Stack>
      <Box>
        <List sx={{ height: "400px", overflow: "auto" }} component="nav">
          {listPlace.slice(0, 9).map((item) => {
            return (
              <ListItem
                onFocus={handleBackgroundChange}
                onBlur={handleBlur}
                key={item?.place_id}
                button
                onClick={() => {
                  setSelectPosition(item);
                  dispatch(isSelected(true));
                  // if (item.address.road) {
                  // setSelectPosition(item);
                  // } else {
                  //   alert("ingrese una calle ");
                  // }
                }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <img
                      src="https://ganoitouchpanama.com/wp-content/uploads/2021/03/032-placeholder.png"
                      style={{ width: 35, height: 35 }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={item?.display_name} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );
};

export default SearchBox;
