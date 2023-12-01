// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';

// const DoctorDashboard = () => {
//   const [doctorInfo, setDoctorInfo] = useState(null);
//   const [doctorId, setDoctorId] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const cookieDoctorId = Cookies.get('hospital_id');
//     setDoctorId(cookieDoctorId);
    
//     // Fetch doctor information based on the doctorId
//     axios.get(`http://localhost:8000/doctors/doctor-info/${doctorId}`)
//       .then(response => {
//         setDoctorInfo(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching doctor information:', error);
//       });
//   }, [doctorId]);

//   const handleAddAdditionalDetails = () => {
//     navigate("add-info");
//   };

//   if (!doctorInfo) {
//     // Display loading or handle the absence of data
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto p-8">
//       <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//         <div className="flex justify-center items-center bg-blue-500 h-32">
//           <img
//             src={`http://localhost:8000${doctorInfo.image}`}
//             alt="Doctor"
//             className="object-cover h-24 w-24 rounded-full"
//           />
//         </div>
//         <div className="px-6 py-4 text-center">
//           <p className="text-gray-700 text-lg mb-2">{doctorInfo.name}</p>
//           <div className="font-bold text-3xl mb-2">{doctorInfo.specialization.specialization}</div>
//           <p className="text-gray-700 text-lg">{doctorInfo.description}</p>
//         </div>
        
//         <div className="flex mt-8 space-x-4">
//           <div className="flex-1 bg-blue-100 shadow-lg rounded-lg overflow-hidden border border-gray-300">
//             <div className="px-6 py-4">
//               <div className="font-bold text-xl mb-2 border-b border-gray-300 pb-2">Personal Info</div>
//               <p className="text-gray-700 text-base"><strong>Email:</strong> {doctorInfo.email}</p>
//               <p className="text-gray-700 text-base"><strong>Phone:</strong> {doctorInfo.phone}</p>
//               <p className="text-gray-700 text-base"><strong>Gender:</strong> {doctorInfo.additional_details.gender}</p>
//             </div>
//           </div>

//           <div className="flex-1 bg-blue-200 shadow-lg rounded-lg overflow-hidden border border-gray-300">
//             <div className="px-6 py-4">
//               <div className="font-bold text-xl mb-2 border-b border-gray-300 pb-2">Professional Info</div>
//               <p className="text-gray-700 text-base"><strong>Experience:</strong> {doctorInfo.additional_details.experience} years</p>
//               <p className="text-gray-700 text-base"><strong>Education:</strong> {doctorInfo.additional_details.education}</p>
//               <p className="text-gray-700 text-base"><strong>Current Working Hospital:</strong> {doctorInfo.additional_details.current_working_hospital}</p>
//               <p className="text-gray-700 text-base"><strong>Consulting Fee:</strong> {doctorInfo.additional_details.fee}</p>
//             </div>
//           </div>
//         </div>

//         {!doctorInfo.additional_details && (
//           <div className="mt-8">
//             <button
//               onClick={handleAddAdditionalDetails}
//               className="bg-blue-500 text-white py-2 px-4 rounded"
//             >
//               Add Additional Data
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DoctorDashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {baseUrl,mediaUrl} from '../../utils/Constants'
const DoctorDashboard = () => {
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [doctorId, setDoctorId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const cookieDoctorId = Cookies.get('hospital_id');
    setDoctorId(cookieDoctorId);

    // Fetch doctor information based on the doctorId
    axios.get(`${baseUrl}doctors/doctor-info/${doctorId}`)
      .then(response => {
        setDoctorInfo(response.data);
      })
      .catch(error => {
        console.error('Error fetching doctor information:', error);
      });
  }, [doctorId]);

  const handleAddAdditionalDetails = () => {
    setIsModalOpen(true);
    setFormData({
      email: doctorInfo.email,
      phone: doctorInfo.phone,
      description: doctorInfo.description,
      gender: doctorInfo.additional_details?.gender || '',
      experience: doctorInfo.additional_details?.experience || '',
      education: doctorInfo.additional_details?.education || '',
      current_working_hospital: doctorInfo.additional_details?.current_working_hospital || '',
      fee: doctorInfo.additional_details?.fee || '',
       
    });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSuccessMessage(''); 
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  console.log("haii")

  const handleFormSubmit = () => {
    console.log("urlisssss:",`${baseUrl}doctors/update/${doctorId}`)
    axios.put(`${baseUrl}doctors/update/${doctorId}/`, formData)
      .then(response => {
        setDoctorInfo(response.data);
        setIsModalOpen(false);
        setSuccessMessage('Update successful');
      })
      .catch(error => {
        console.error('Error updating doctor information:', error);
      });
  };
  // Use effect to clear the success message after 2 seconds
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSuccessMessage('');
    }, 2000);

    // Cleanup the timeout to prevent memory leaks
    return () => clearTimeout(timeoutId);
  }, [successMessage]);

  if (!doctorInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> {successMessage}</span>
        </div>
        
      )}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex justify-center items-center bg-blue-500 h-32">
          <img
            src={`${mediaUrl}${doctorInfo.image}`}
            alt="Doctor"
            className="object-cover h-24 w-24 rounded-full"
          />
          <button
            onClick={handleAddAdditionalDetails}
            className="ml-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
          >
            <i className="fas fa-pencil-alt"></i>
          </button>
        </div>
        <div className="px-6 py-4 text-center">
          <p className="text-gray-700 text-lg mb-2">{doctorInfo.name}</p>
          <div className="font-bold text-3xl mb-2">{doctorInfo.specialization.specialization}</div>
          <p className="text-gray-700 text-lg">{doctorInfo.description}</p>
        </div>

        <div className="flex mt-8 space-x-4">
          <div className="flex-1 bg-blue-100 shadow-lg rounded-lg overflow-hidden border border-gray-300">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 border-b border-gray-300 pb-2">Personal Info</div>
              <p className="text-gray-700 text-base"><strong>Email:</strong> {doctorInfo.email}</p>
              <p className="text-gray-700 text-base"><strong>Phone:</strong> {doctorInfo.phone}</p>
              <p className="text-gray-700 text-base"><strong>Gender:</strong> {doctorInfo.additional_details.gender}</p>
            </div>
          </div>

          <div className="flex-1 bg-blue-200 shadow-lg rounded-lg overflow-hidden border border-gray-300">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 border-b border-gray-300 pb-2">Professional Info</div>
              <p className="text-gray-700 text-base"><strong>Experience:</strong> {doctorInfo.additional_details.experience} years</p>
              <p className="text-gray-700 text-base"><strong>Education:</strong> {doctorInfo.additional_details.education}</p>
              <p className="text-gray-700 text-base"><strong>Current Working Hospital:</strong> {doctorInfo.additional_details.current_working_hospital}</p>
              <p className="text-gray-700 text-base"><strong>Consulting Fee:</strong> {doctorInfo.additional_details.fee}</p>
            </div>
          </div>
        </div>

        {!doctorInfo.additional_details && (
          <div className="mt-8">
            <button
              onClick={handleAddAdditionalDetails}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Add Additional Data
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="bg-white p-8 w-96 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Update Doctor Information</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email:</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Education:</label>
              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Experience:</label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Phone:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Fee:</label>
              <input
                type="text"
                name="fee"
                value={formData.fee}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Description:</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            {/* Add similar fields for other information */}
            <div className="flex justify-end">
              <button onClick={handleModalClose} className="mr-2 text-gray-600">Cancel</button>
              <button onClick={handleFormSubmit} className="bg-blue-500 text-white py-2 px-4 rounded">Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
