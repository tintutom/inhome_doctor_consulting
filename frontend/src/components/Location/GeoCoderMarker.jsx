import React, { useEffect, useState } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import * as ELG from 'esri-leaflet-geocoder';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;


const GeoCoderMarker = ({ address, city,onSelectLocation }) => {
  const map = useMap();
  const [position, setPosition] = useState([0, 0]);
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    const fullAddress = `${address}, ${city || ''}`; 

    const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}`;
    console.log('Geocoding URL:', nominatimUrl);

    try {
      fetch(nominatimUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            const { lat, lon } = data[0];
            setPosition([lat, lon]);
            console.log('Latitude:', lat);
            console.log('Longitude:', lon);
            setCoordinates({ latitude: lat, longitude: lon });
            console.log({coordinates})
            if (typeof onSelectLocation === 'function') {
              onSelectLocation({ latitude: lat, longitude: lon,address: fullAddress, city: city || '', });
              
            }
            
            // onSelectLocation({ latitude: lat, longitude: lon });

            // Update map view to center on marker position
            map.flyTo([lat, lon], 10);
          } else {
            console.warn('No results found for the address:', fullAddress);
          }
        })
        .catch((error) => {
          console.error('Error during geocoding:', error);
        });
    } catch (error) {
      console.log(error);
    }
  }, [address, city, map,onSelectLocation]);

  return (
    <Marker position={position} icon={DefaultIcon}>
      <Popup>
        <div>{address}</div>
      </Popup>
    </Marker>
  );
};

export default GeoCoderMarker;
