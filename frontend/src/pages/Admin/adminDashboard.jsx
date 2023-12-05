import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

import './admin.css';

const AdminDashboard = () => {
  const [appointmentsData, setAppointmentsData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Appointments',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });

  const [topFeedback, setTopFeedback] = useState([]);
  const [counts, setCounts] = useState({
    users: 0,
    departments: 0,
    doctors: 0,
  });

  useEffect(() => {
    // Fetch counts
    axios.get('http://localhost:8001/cadmin/')
      .then(response => {
        setCounts(response.data);
      })
      .catch(error => {
        console.error('Error fetching counts:', error);
      });

    // Fetch top feedback
    axios.get('http://localhost:8001/cadmin/top-feedback/')
      .then(response => {
        setTopFeedback(response.data);
      })
      .catch(error => {
        console.error('Error fetching top feedback:', error);
      });

    // Fetch appointments
    axios.get('http://localhost:8001/cadmin/appointments/')
      .then(response => {
        const appointments = response.data.appointments;
        const doctors = response.data.doctors;

        const labels = doctors.map(doctor => doctor.name);
        const data = doctors.map(doctor =>
          appointments.filter(appointment => appointment.doctor === doctor.id).length
        );

        setAppointmentsData({
          labels: labels,
          datasets: [
            {
              ...appointmentsData.datasets[0],
              data: data,
            },
          ],
        });
      })
      .catch(error => {
        console.error('Error fetching appointments:', error);
      });
  }, [appointmentsData.datasets]); // Added appointmentsData.datasets as dependency

  return (
    <div className="admin-dashboard-container">
      <div className="counts-container">
        <h3>Counts</h3>
        <p>Users: {counts.users}</p>
        <p>Departments: {counts.departments}</p>
        <p>Doctors: {counts.doctors}</p>
      </div>
      <div className="graph-container">
        <h2>Doctor Appointments</h2>
        <Bar
          data={appointmentsData}
          options={{
            scales: {
              x: {
                type: 'category', // Specify x-axis as categorical
                labels: appointmentsData.labels,
              },
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
      <div className="feedback-container">
        <h2>Top 5 Feedback</h2>
        <ul>
          {topFeedback.map(feedback => (
            <li key={feedback.id}>
              {`${feedback.review_text} to Dr. ${feedback.doctor.name}: ${feedback.rating}`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
