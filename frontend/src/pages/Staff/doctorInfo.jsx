// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const DoctorInfo = () => {
//   const [doctorInfo, setDoctorInfo] = useState({});
//   const [extraDetails, setExtraDetails] = useState({
//     experience: '',
//     education: '',
//     current_working_hospital: '',
//     fee: '',
//     gender: '',
//     available_times: '',
//   });

//   // Fetch doctor's information on component mount
//   useEffect(() => {
//     const fetchDoctorInfo = async () => {
//       try {
//         const response = await axios.get('/api/doctor-info'); // Replace with your API endpoint
//         setDoctorInfo(response.data);
//       } catch (error) {
//         console.error('Error fetching doctor info:', error);
//       }
//     };

//     fetchDoctorInfo();
//   }, []);

//   // Handle input changes for extra details form
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setExtraDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   // Handle submit for adding extra details
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post('/api/additional-details', extraDetails); // Replace with your API endpoint
//       // Optionally, you can refetch the doctor's information to update the displayed data
//       // const response = await axios.get('/api/doctor-info');
//       // setDoctorInfo(response.data);
//     } catch (error) {
//       console.error('Error adding extra details:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Doctor Information</h2>
//       <p>Name: {doctorInfo.name}</p>
//       <p>Specialization: {doctorInfo.specialization}</p>
//       {/* Display other doctor info fields as needed */}

//       <h2>Add Extra Details</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Experience:
//           <input
//             type="text"
//             name="experience"
//             value={extraDetails.experience}
//             onChange={handleInputChange}
//           />
//         </label>
//         {/* Add other input fields for extra details */}

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default DoctorInfo;
