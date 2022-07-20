import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.js";
import moment from "moment";
import "moment/locale/vi";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import socketIOClient from "socket.io-client";

const ENDPOINT = "https://trunghanh.azurewebsites.net/";

const position = [10.684353, 106.746466];

const icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
});

function MultipleMarkers(markerCoordinates) {
  console.log(markerCoordinates);
  return markerCoordinates.data?.map((item, index) => {
    return (
      <Marker
        key={item.id}
        position={[item.data.latitude, item.data.longitude]}
        icon={icon}
      >
        <Popup>
          {item.fullname} - Thời gian truy cập cuối cùng:{" "}
          {moment(item.data.timestamp).format("LLL")}
        </Popup>
      </Marker>
    );
  });
}

const MapWrapper = () => {
  const [response, setResponse] = useState([]);
  const [markerCoordinates, setMarkerCoordinates] = useState([]);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.on("markers", (data) => {
      response.push(data);

      const newMarkerCoordinates = Object.values(response).filter((item) => {
        return item !== null;
      });
      setMarkerCoordinates(newMarkerCoordinates);
    });
  }, [response]);

  return (
    <MapContainer
      center={position}
      zoom={12}
      style={{ height: "200vh", width: "200vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MultipleMarkers data={markerCoordinates} />
    </MapContainer>
  );
};
export default MapWrapper;
