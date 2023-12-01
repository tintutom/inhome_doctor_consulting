// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { FiHome, FiUser, FiUserCheck, FiCalendar, FiMapPin, FiList, FiAirplay, FiClock, FiBookOpen } from 'react-icons/fi';
// import { useAuthContext } from "../../pages/AuthContext"; // Import the custom hook useAuthContext to access the AuthContext data


// const LeftNavBar = () => {
//   const [activeLink, setActiveLink] = useState('');
//   const [isFirstClick, setIsFirstClick] = useState(true);
//     // Destructure the data and functions from the AuthContext using the useAuthContext hook
//     const {
//       accessToken,
//       refreshToken,
//       userRole,
//       handleLogin,
//       handleLogout,
//       email,
//       name,

//     } = useAuthContext();

  

//   useEffect(() => {
//     if (isFirstClick) {
//       // Change link color on the first single click
//       setIsFirstClick(false);
//       // Set the activeLink state to the current link on first single click
//       const path = window.location.pathname;
//       setActiveLink(path);
//     }
//   }, [isFirstClick]);

//   const handleLinkClick = (link) => {
//     setActiveLink(link);
//   };

//   return (
//     <div className="flex-shrink-0 bg-indigo-950 text-white h-screen md:h-auto md:min-h-screen">
//       <div className="bg-indigo-900 text-white p-3 flex justify-between items-center">
//       {/* <p className="px-4 py-2">{userRole.charAt(0).toUpperCase() + userRole.slice(1)}'s Dashboard</p> */}
//       <p className="px-4 py-2"> Professionals's Dashboard</p>
//       </div>
//       <nav className="py-4">
//         {/*  Navigation links  */}
//         <Link
//           to="/Professional/home"
//           onClick={() => handleLinkClick('/Professional/home')}
//           className={`block py-2 px-4 hover:bg-gray-400 ${
//             activeLink === '/Professional/home' ? 'bg-gray-400' : ''
//           }`}
//         >
//           <FiHome className="inline-block mr-2" /> Dashboard
//         </Link>
//         <Link
//           to="/Professional/NewAppointments"
//           onClick={() => handleLinkClick('/Professional/NewAppointments')}
//           className={`block py-2 px-4 hover:bg-gray-400 ${
//             activeLink === '/Professional/NewAppointments' ? 'bg-gray-400' : ''
//           }`}
//         >
//           <FiAirplay className="inline-block mr-2" /> New Appointments
//         </Link>
//         <Link
//           to="/Professional/SheduleAvailability"
//           onClick={() => handleLinkClick('/Professional/SheduleAvailability')}
//           className={`block py-2 px-4 hover:bg-gray-400 ${
//             activeLink === '/Professional/SheduleAvailability' ? 'bg-gray-400' : ''
//           }`}
//         >
//           <FiClock className="inline-block mr-2" /> Shedule Availability
//         </Link>
//         <Link
//           to="/Professional/Calender"
//           onClick={() => handleLinkClick('/Professional/Calender')}
//           className={`block py-2 px-4 hover:bg-gray-400 ${
//             activeLink === '/Professional/Calender' ? 'bg-gray-400' : ''
//           }`}
//         >
//           <FiCalendar className="inline-block mr-2" /> Calender
//         </Link>
//         <Link
//           to="/Professional/BookingHistory"
//           onClick={() => handleLinkClick('/Professional/BookingHistory')}
//           className={`block py-2 px-4 hover:bg-gray-400 ${
//             activeLink === '/Professional/BookingHistory' ? 'bg-gray-400' : ''
//           }`}
//         >
//           <FiBookOpen className="inline-block mr-2" /> Booking History
//         </Link>

//       </nav>
//     </div>
//   );
// };

// export default LeftNavBar;
