import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const Maps = ({ selectPosition }) => {
  const icon = L.icon({
    iconUrl:
      "https://ganoitouchpanama.com/wp-content/uploads/2021/03/032-placeholder.png",
    iconSize: [38, 38],
  });
  const locationSelection = [selectPosition?.lat, selectPosition?.lon];

  const position = selectPosition;
  function ResetCenterView({ selectPosition }) {
    const map = useMap();

    useEffect(() => {
      if (selectPosition) {
        map.setView(
          L.latLng(selectPosition?.lat, selectPosition?.lon),
          map.getZoom(),
          { animate: true }
        );
      }
    }, [selectPosition]);

    return null;
  }
  return (
    <MapContainer
      center={[-34.61398353993321, -58.445374178612305]}
      zoom={15}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%", borderRadius: "10px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors'
      />
      {selectPosition && (
        <Marker position={locationSelection} icon={icon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      )}
      <ResetCenterView selectPosition={selectPosition} />
    </MapContainer>
  );
};

export default Maps;
