import React from 'react';
import DoctorSlotForm from '../../components/Staffdoctor/DoctorSlotForm';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../utils/Constants';
const DoctorSlotPage = ({ doctorId }) => {
    const navigate = useNavigate();
    const handleSlotSubmit = async (formData) => {
        try {
          const token = Cookies.get('hospital_id'); 
          const {doctorId} = Cookies.get('hospital_id'); // Replace with your actual cookie retrieval logic
          console.log("tokennnn",token)
          console.log("id",{doctorId})
          console.log("hiiiiii")
          console.log("URL:", `${baseUrl}doctors/${token}/slots`);

          await axios.post(
            `${baseUrl}doctors/${token}/slots`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          alert('Slot added successfully!');
          navigate("/hospital/slots") 
          // You may want to redirect or perform additional actions after successful slot addition.
        } catch (error) {
          console.error('Error adding slot:', error);
          alert('Error adding slot. Please try again.');
        }
      };
      

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Add Doctor Appointment Slot</h2>
      <DoctorSlotForm onSubmit={handleSlotSubmit} />
    </div>
  );
};

export default DoctorSlotPage;