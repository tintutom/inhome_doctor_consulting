// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
// import L from 'leaflet';
// import {baseUrl} from '../utils/Constants';

// const MapView = ({ appointment, onClose }) => {
//   const [userLocation, setUserLocation] = useState([
//     parseFloat(appointment.latitude),
//     parseFloat(appointment.longitude),
//   ]);
//   const [doctorLocation, setDoctorLocation] = useState([
//     9.9377157,
//     76.32278183249196,
//   ]);

//   return (
//     <div>
//       <MapContainer center={userLocation} zoom={12} style={{ height: '400px', marginTop: '20px' }}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <Marker position={userLocation}>
//           <Popup>{`User: ${appointment.user.name}`}</Popup>
//         </Marker>
//         <Marker position={doctorLocation}>
//           <Popup>{`Doctor: ${appointment.doctor.name}`}</Popup>
//         </Marker>
//         <Polyline positions={[userLocation, doctorLocation]} />
//       </MapContainer>
//     </div>
//   );
// };

// const ChatComponent = ({ doctor, user, onClose, appointment }) => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [ws, setWs] = useState(null);
//   console.log("websocket",`ws://http://127.0.0.1:8001/ws/chat/${doctor.id}/${user.id}/${appointment.id}`)
//   useEffect(() => {
//     if (!doctor || !doctor.id) {
//       // Handle the case when doctor is undefined or doctor.id is undefined
//       console.error("Invalid doctor data");
//       return;
//     }
//     // Create a WebSocket connection
//     const socket = new WebSocket(`ws://http://127.0.0.1:8001/ws/chat/${doctor.id}/${user.id}/${appointment.id}`);
    

//     // Set up WebSocket event listeners
//     socket.onopen = () => {
//       console.log('WebSocket connection opened.');
//     };

//     socket.onmessage = (event) => {
//       const messageData = JSON.parse(event.data);
//       setMessages([...messages, { sender: messageData.sender_id, text: messageData.message }]);
//     };

//     socket.onclose = () => {
//       console.log('WebSocket connection closed.');
//     };
//     setWs(socket);

//     return () => {
//       // Close the WebSocket connection when the component unmounts
//       socket.close();
//     };
    
//   }, [doctor.id, user.id, messages, appointment.id, messages]);
//   const handleSendMessage = () => {
//     if (!ws || !doctor || !doctor.id) {
//       console.error("Invalid WebSocket or doctor data");
//       return;
//     }
//     ws.send(JSON.stringify({
//       message: newMessage,
//       user_id: Cookies.get('id'),
//       doctor_id: doctor.id,
//       payment_id: appointment.id,
//     }));
//     setMessages([...messages, { sender: 'user', text: newMessage }]);
//     setNewMessage('');
//   };
//   return (
//     <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '10px' }}>
//       <h2>Chat with {doctor.name}</h2>
//       <div style={{ flex: 1, overflowY: 'auto', border: '1px solid #ccc', marginBottom: '10px' }}>
//         {messages.map((message, index) => (
//           <div key={index} style={{ textAlign: message.sender === 'user' ? 'right' : 'left' }}>
//             <strong>{message.sender === 'user' ? 'You' : doctor.name}:</strong> {message.text}
//           </div>
//         ))}
//       </div>
//       <div style={{ display: 'flex' }}>
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           style={{ flex: 1, marginRight: '10px' }}
//         />
//         <button onClick={handleSendMessage}>Send</button>
//       </div>
//       <button onClick={onClose}>Close Chat</button>
//     </div>
//   );
// };

// const ChatModal = ({ appointmentInfo, onClose }) => {
//   return (
//     <div className="chat-modal" style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '50%', background: 'white', zIndex: '1000' }}>
//       <ChatComponent doctor={appointmentInfo.doctor} user={appointmentInfo.user} onClose={onClose} />
//     </div>
//   );
// };

// const UserAppointments = () => {
//   const userId = Cookies.get("id");
//   console.log("UUID",userId)
//   const [appointments, setAppointments] = useState([]);
//   const [selectedAppointment, setSelectedAppointment] = useState(null);
//   const [chatModalVisible, setChatModalVisible] = useState(false);
//   const [chatAppointmentInfo, setChatAppointmentInfo] = useState(null);
//   const [selectedChatAppointment, setSelectedChatAppointment] = useState(null);
//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const response = await axios.get(`${baseUrl}upcoming-appointments/${userId}`);
//         setAppointments(response.data);
//         console.log(response.data)
//       } catch (error) {
//         console.error('Error fetching appointments:', error);
//       }
//     };

//     fetchAppointments();
//   }, [userId]);

//   // Function to calculate Haversine distance between two points
//   const haversineDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371; // Earth radius in kilometers
//     const dLat = (lat2 - lat1) * (Math.PI / 180);
//     const dLon = (lon2 - lon1) * (Math.PI / 180);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos((lat1 * (Math.PI / 180))) * Math.cos((lat2 * (Math.PI / 180))) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     const distance = R * c; // Distance in kilometers
//     return distance;
//   };

//   const toggleMap = (appointment) => {
//     console.log("Toggle Map - appointment:", appointment);
//     if (!appointment) {
//       console.error("Invalid appointment data");
//       return;
//     }

//     if (selectedAppointment && selectedAppointment.id === appointment.id) {
//       setSelectedAppointment(null);
//     } else {
//       setSelectedAppointment(appointment);
//       // Set the information for the chat modal
//       setChatAppointmentInfo({
//         doctor: appointment.doctor,
//         user: appointment.user,
//         paymentId: appointment.id,
//       }); 
//       setChatModalVisible(true);
//     }
//   };

//   const openChatModal = (appointment) => {
//     console.log("Open Chat Modal - appointment:", appointment);

//     setChatAppointmentInfo({
//       doctor: appointment.doctor,
//       user: appointment.user,
//       paymentId: appointment.id,
//     });
//     setChatModalVisible(true);
//   };
//   return (
//     <div className="container mx-auto mt-8">
//       <h2 className="text-2xl font-bold mb-4">Your Appointments</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead className="bg-blue-500 text-white">
//             <tr>
//               <th className="py-2">Doctor</th>
//               <th className="py-2">Date</th>
//               <th className="py-2">Time</th>
//               {/* <th className="py-2">Distance (km)</th> */}
//               <th className="py-2">Locate in Map</th>
//               <th className='py-2'>message</th>
//             </tr>
//           </thead>
//           <tbody>
//             {appointments.map(appointment => (
              
//               <tr key={appointment.id}>
//                 <td className="py-2">{appointment.doctor.name}</td>
//                 <td className="py-2">{appointment.date}</td>
//                 <td className="py-2">{`${appointment.start_time} - ${appointment.end_time}`}</td>
//                 {/* <td className="py-2"> */}
//                   {/* Calculate and display the distance */}
//                   {/* {haversineDistance(
//                     appointment.user.address.latitude,  
//                     appointment.user.address.longitude,
//                     9.9377157,
//                     76.32278183249196
//                   ).toFixed(2)}
//                 </td> */}
//                 <td className="py-2">
//                   <button onClick={() => toggleMap(appointment)}>{selectedAppointment && selectedAppointment.id === appointment.id
//                       ? "Close Map"
//                       : "Show Map"}
//                   </button>
//                 </td>
//                 <td className="py-2">
//                   <button onClick={() => openChatModal(appointment)}>Chat</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         </div>
//         {selectedAppointment && (
//         <MapView appointment={selectedAppointment} onClose={()=>toggleMap(selectedAppointment)} />
//       )}
//       {chatModalVisible && (
//         <ChatModal appointmentInfo={chatAppointmentInfo} onClose={() => setChatModalVisible(false)} />
//       )}
//       </div>
//   );
// };

// export default UserAppointments;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import {baseUrl} from '../utils/Constants';

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


const UserAppointments = () => {
  const userId = Cookies.get("id");
  console.log("UUID",userId)
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${baseUrl}upcoming-appointments/${userId}`);
        setAppointments(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [userId]);

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
              <th className="py-2">Doctor</th>
              <th className="py-2">Date</th>
              <th className="py-2">Time</th>
              {/* <th className="py-2">Distance (km)</th> */}
              <th className="py-2">Locate in Map</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appointment => (
              
              <tr key={appointment.id}>
                <td className="py-2">{appointment.doctor.name}</td>
                <td className="py-2">{appointment.date}</td>
                <td className="py-2">{`${appointment.start_time} - ${appointment.end_time}`}</td>
                {/* <td className="py-2"> */}
                  {/* Calculate and display the distance */}
                  {/* {haversineDistance(
                    appointment.user.address.latitude,  
                    appointment.user.address.longitude,
                    9.9377157,
                    76.32278183249196
                  ).toFixed(2)}
                </td> */}
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

export default UserAppointments;