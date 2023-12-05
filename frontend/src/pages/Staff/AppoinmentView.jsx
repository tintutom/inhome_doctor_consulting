import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import {baseUrl} from '../../utils/Constants'
const MapView = ({ appointment, onClose }) => {
  const [userLocation, setUserLocation] = useState([
    parseFloat(appointment.latitude),
    parseFloat(appointment.longitude),
  ]);
  const [doctorLocation, setDoctorLocation] = useState([
    9.9377157,
    76.32278183249196,
  ]);

  return (
    <div>
      <MapContainer center={userLocation} zoom={12} style={{ height: '400px', marginTop: '20px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={userLocation}>
          <Popup>{`User: ${appointment.user.name}`}</Popup>
        </Marker>
        <Marker position={doctorLocation}>
          <Popup>{`Doctor: ${appointment.doctor.name}`}</Popup>
        </Marker>
        <Polyline positions={[userLocation, doctorLocation]} />
      </MapContainer>
    </div>
  );
};


const AppoinmentView = () => {
  const docId = Cookies.get("hospital_id");
  console.log("dddUUID",docId)
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${baseUrl}doctors/upcoming-appointments/${docId}/`);
        setAppointments(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [docId]);

  // Function to calculate Haversine distance between two points
  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth radius in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * (Math.PI / 180))) * Math.cos((lat2 * (Math.PI / 180))) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };

  const toggleMap = (appointment) => {
    if (selectedAppointment && selectedAppointment.id === appointment.id) {
      setSelectedAppointment(null);
    } else {
      setSelectedAppointment(appointment);
    }
  };
  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Your Appointments</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-2">Patient</th>
              <th className="py-2">Date</th>
              <th className="py-2">Time</th>
              <th className="py-2">Distance (km)</th>
              <th className="py-2">Locate in Map</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appointment => (
              
              <tr key={appointment.id}>
                <td className="py-2">{appointment.user.name}</td>
                <td className="py-2">{appointment.date}</td>
                <td className="py-2">{`${appointment.start_time} - ${appointment.end_time}`}</td>
                <td className="py-2">
                  {/* Calculate and display the distance */}
                  {haversineDistance(
                    appointment.latitude,  
                    appointment.longitude,
                    9.9377157,
                    76.32278183249196
                  ).toFixed(2)}
                </td>
                <td className="py-2">
                  <button onClick={() => toggleMap(appointment)}>{selectedAppointment && selectedAppointment.id === appointment.id
                      ? "Close Map"
                      : "Show Map"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        {selectedAppointment && (
        <MapView appointment={selectedAppointment} onClose={()=>toggleMap(selectedAppointment)} />
      )}
      </div>
  );
};

export default AppoinmentView;