// Map.jsx
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

const RoutingMachine = ({ map, from, to }) => {
  useEffect(() => {
    if (map && from && to) {
      L.Routing.control({
        waypoints: [
          L.latLng(from.lat, from.lng),
          L.latLng(to.lat, to.lng),
        ],
      }).addTo(map);
    }
  }, [map, from, to]);

  return null;
};

const MapWithRouting = ({ currentLocation, destinations }) => {
  const [map, setMap] = useState(null);

  const center = currentLocation;
  const zoom = 10;

  useEffect(() => {
    if (map) {
      map.flyTo(center, zoom);
    }
  }, [map, center, zoom]);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: '60vh', width: '100%', marginTop: '20px', zIndex: 0 }}
      whenCreated={setMap}
    >
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      {destinations.map((destination, index) => (
        <RoutingMachine
          key={index}
          map={map}
          from={currentLocation}
          to={{ lat: destination.lat, lng: destination.lng }}
        />
      ))}
    </MapContainer>
  );
};

export default MapWithRouting;
