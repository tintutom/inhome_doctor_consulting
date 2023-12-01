
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const DoctorAdditionalDetailsForm = () => {
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');
  const [currentWorkingHospital, setCurrentWorkingHospital] = useState('');
  const [fee, setFee] = useState('');
  const [gender, setGender] = useState('');
  const [doctorId, setDoctorId] = useState(''); // State to hold doctorId
  const [availableTimes, setAvailableTimes] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch doctorId from the cookie when the component mounts
    const cookieDoctorId = Cookies.get('hospital_id');
    setDoctorId(cookieDoctorId);
    console.log('doccc id:', cookieDoctorId);
    console.log("URL:", `http://localhost:8000/doctors/${doctorId}/additional-details`);
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (!doctorId) {
        console.error('Doctor ID is not available.');
        return;
      }
      await axios.post(`http://localhost:8000/doctors/${doctorId}/additional-details`, {
        experience,
        education,
        current_working_hospital: currentWorkingHospital,
        fee,
        gender,
      });
      console.log('Doctor additional details added successfully');
      // Redirect or perform other actions after success
      navigate('/hospital/panel'); // Example: Redirect to hospital panel
    } catch (error) {
      console.error('Error adding additional details:', error.response.data);
      // Handle error, e.g., show an error message
    }
  };


  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Additional Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="experience" className="block text-gray-700 text-sm font-bold mb-2">
            Experience (Years)
          </label>
          <input
            type="number"
            id="experience"
            name="experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="education" className="block text-gray-700 text-sm font-bold mb-2">
            Education
          </label>
          <textarea
            id="education"
            name="education"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="currentWorkingHospital" className="block text-gray-700 text-sm font-bold mb-2">
            Current Working Hospital
          </label>
          <input
            type="text"
            id="currentWorkingHospital"
            name="currentWorkingHospital"
            value={currentWorkingHospital}
            onChange={(e) => setCurrentWorkingHospital(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="fee" className="block text-gray-700 text-sm font-bold mb-2">
            Fee
          </label>
          <input
            type="number"
            id="fee"
            name="fee"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="gender" className="block text-gray-700 text-sm font-bold mb-2">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Additional Details
        </button>
      </form>
    </div>
  );
};

export default DoctorAdditionalDetailsForm;
