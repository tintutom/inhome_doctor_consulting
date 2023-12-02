import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import {baseUrl} from '../utils/Constants';
const PaymentSuccess = () => {
  const location = useLocation();

  const user = location.state?.user;
  const doctor = location.state?.doctor;
  const date = location.state?.date;
  const start_time = location.state?.start_time;
  const end_time = location.state?.end_time;
  const amount = location.state?.amount;
  const selectedSlotId = location.state?.selectedSlotId;
  const propertyDetails = location.state?.propertyDetails || {};
  console.log("orrrrr",propertyDetails)

  useEffect(() => {
    console.log('useEffect triggered');
    console.log('Data to be sent:', {
      user: user,
      doctor: doctor,
      date: date,
      start_time: start_time,
      end_time: end_time,
      amount: amount,
      payment: true,
      doctor_slot: selectedSlotId,
      address:propertyDetails.address,
      city:propertyDetails.city,
      latitude:propertyDetails.latitude,
      longitude:propertyDetails.longitude,
    });
    const storeBookingDetails = async () => {
      try {
        const bookingData = {
          user: user,
          doctor: doctor,
          date: date,
          start_time: start_time,
          end_time: end_time,
          amount: amount,
          payment: true,
          doctor_slot: selectedSlotId,
          address:propertyDetails.address,
          city:propertyDetails.city,
          latitude:propertyDetails.latitude,
          longitude:propertyDetails.longitude,
        };

        console.log('Booking Data:', bookingData);

        const response = await axios.post(`${baseUrl}booking-update/`, bookingData);

        console.log('Booking details stored successfully:', response.data);
      } catch (error) {
        console.error('Error storing booking details:', error);
      }
    };

    storeBookingDetails();
  }, [user, doctor, date, start_time, end_time, amount, selectedSlotId,propertyDetails]);

  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-center rounded-full bg-green-500 w-16 h-16">
            <i className="text-white text-4xl">✓</i>
          </div>
          <h1 className="text-3xl font-bold mt-4 font-green">Success</h1>
          <p className="text-lg mt-2 mb-6">
            We have confirmed your booking; thank you for choosing our services. We'll be in touch with further details
            shortly.
          </p>
          <Link
            to={`/home`}
            className="btn btn-outline-success btn-lg mt-6 px-6 py-3 rounded-md text-lg font-medium hover:bg-green-500 hover:text-white transition-colors duration-300"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
