import React, { useState, useEffect } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import Cookies from 'js-cookie';

import './ChatComponent.css'; // Import your CSS file for styling
import { baseUrl } from '../../utils/Constants';

const DocChatComponent = () => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [client, setClient] = useState(null);
  const docId = Cookies.get('hospital_id');

  useEffect(() => {
    const fetchUpcomingAppointments = async () => {
      try {
        const response = await fetch(`${baseUrl}doctors/upcoming-appointments/${docId}/`);
        const data = await response.json();
        console.log("Fetched Upcoming Appointments:", data);
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching upcoming appointments:', error);
      }
    };

    fetchUpcomingAppointments();
  }, [docId]);

  const connectToWebSocket = (appointmentId) => {
    if (!appointmentId) return;

    const newClient = new W3CWebSocket(`ws://127.0.0.1:8001/ws/chat/${appointmentId}/`);
    setClient(newClient);

    newClient.onopen = () => {
      console.log('WebSocket Client Connected');
    };

    newClient.onmessage = (message) => {
      const data = JSON.parse(message.data);
      setChatMessages((prevMessages) => [...prevMessages, data.message]);
    };

    return () => {
      newClient.close();
    };
  };

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
    setChatMessages([]);
    connectToWebSocket(appointment.id);
  };

  const sendMessage = () => {
    if (message.trim() === '' || !client) return;

    client.send(JSON.stringify({ message }));
    setMessage('');
  };

  return (
    <div className="chat-container">
      <div className="appointments-list">
        <h2>Upcoming Appointments</h2>
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment.id} onClick={() => handleAppointmentClick(appointment)}>
              {`${appointment.id},${appointment.user.name}`}
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-window">
        {selectedAppointment && (
          <div>
            <div className="selected-appointment-info">
              <h2>{`Chat with  ${selectedAppointment.user.name}`}</h2>
              {/* Add more details as needed */}
            </div>
            <div className="chat-messages">
              {chatMessages.map((msg, index) => (
                <div key={index} className="message">
                  {msg}
                  {/* Add user profile image here if available */}
                </div>
              ))}
            </div>
            <div className="message-input">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocChatComponent;