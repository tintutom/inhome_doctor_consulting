// AdminHeader.jsx
import logo from '../../assets/images/inhome-consulting-logo11.jpg';
import userImg from '../../assets/images/avatar-icon.png';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import React, { useEffect, useRef, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { BiMenu } from 'react-icons/bi';
import Cookies from 'js-cookie';
import AuthContext from '../../context/AuthProvider';

const navLinks = [
  {
    path: '/admin/panel',
    display: 'AdminHome',
  },
  {
    path: '/admin/department',
    display: 'Departments',
  },
  {
    path: 'admin/doctors',
    display: 'Doctor',
  },
  {
    path: 'admin/user',
    display: 'Patients',
  },
];

const navLinksLogin = [
  {
    path: '/admin/panel',
    display: 'AdminHome',
  },
  {
    path: '/contact',
    display: 'adContact',
  },
];

const AdminHeader = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const [isHeaderWhite, setIsHeaderWhite] = useState(false);

  const handleStickyHeader = () => {
    window.addEventListener('scroll', () => {
      const currentHeaderRef = headerRef.current;

      if (currentHeaderRef) {
        if (
          document.body.scrollTop > 80 ||
          document.documentElement.scrollTop > 80
        ) {
          currentHeaderRef.style.position = 'fixed';
          currentHeaderRef.style.top = '0';
          currentHeaderRef.style.width = '100%';
          currentHeaderRef.style.zIndex = '1000';
          setIsHeaderWhite(true);
        } else {
          currentHeaderRef.style.position = 'static';
          setIsHeaderWhite(false);
        }
      }
    });
  };

  useEffect(() => {
    handleStickyHeader();
    return () => window.removeEventListener('scroll', handleStickyHeader);
  }, []);

  const toggleMenu = () => {
    const menuItems = menuRef.current;
  
    if (menuItems) {
      menuItems.classList.toggle('hidden'); // Toggle the 'hidden' class
      // Add the following line to toggle the 'show' class for Bootstrap dropdown
      menuItems.classList.toggle('show');
    }
  };

  const dispatch = useDispatch();
  const email = useSelector((state) => state.email);
  const { setAuth } = useContext(AuthContext);

  const navigate = useNavigate();
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    if (logout) {
      Cookies.remove('jwt-admin');
      Cookies.remove('role', 'admin');
      navigate('/admin/login');
    }
  }, [logout, navigate]);

  const handleLogout = () => {
    setLogout(true);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  return (
    <header className={`header flex items-center ${isHeaderWhite ? 'bg-white shadow-md' : ''}`} ref={headerRef}>
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <img src={logo} alt="" />
          </div>
          <div className="md:flex items-center gap-[2.7rem]" ref={menuRef}>
            <ul className={`menu flex ${email ? 'hidden md:flex' : 'md:flex'} items-center gap-[2.7rem]`}>
              {email ? (
                logout ? (
                  navLinksLogin.map((link, index) => (
                    <li key={index}>
                      <NavLink
                        to={link.path}
                        className={(navclass) =>
                          navclass.isActive
                            ? 'text-primaryColor text-[16px] leading-7 font-[600]'
                            : 'text-textColor textp-[16px] leading-7 font-[500] hover:text-primaryColor'
                        }
                      >
                        {link.display}
                      </NavLink>
                    </li>
                  ))
                ) : (
                  navLinks.map((link, index) => (
                    <li key={index}>
                      <NavLink
                        to={link.path}
                        className={(navclass) =>
                          navclass.isActive
                            ? 'text-primaryColor text-[16px] leading-7 font-[600]'
                            : 'text-textColor textp-[16px] leading-7 font-[500] hover:text-primaryColor'
                        }
                      >
                        {link.display}
                      </NavLink>
                    </li>
                  ))
                )
              ) : (
                navLinksLogin.map((link, index) => (
                  <li key={index}>
                    <NavLink
                      to={link.path}
                      className={(navclass) =>
                        navclass.isActive
                          ? 'text-primaryColor text-[16px] leading-7 font-[600] cursor-pointer'
                          : 'text-textColor textp-[16px] leading-7 font-[500] hover:text-primaryColor cursor-pointer'
                      }
                    >
                      {link.display}
                    </NavLink>
                  </li>
                ))
              )}
            </ul>
          </div>
          <div className="flex items-center gap-4">
            <div className="md:hidden">
              <BiMenu className="w-6 h-6 cursor-pointer" onClick={toggleMenu} />
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="profile-dropdown relative">
                <img
                  src={userImg}
                  className="w-[35px] h-[35px] rounded-full cursor-pointer"
                  alt=""
                  onClick={toggleProfileDropdown}
                />
                {showProfileDropdown && (
                  <NavDropdown
                    show={showProfileDropdown}
                    align="end" // Align dropdown to the end
                  >
                    <NavDropdown.Item href="/services">Profile</NavDropdown.Item>
                    <NavDropdown.Item href="/appointment">Appointment</NavDropdown.Item>
                  </NavDropdown>
                )}
              </div>
              {email ? (
                <div>
                  <button
                    className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/admin/login">
                  <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default AdminHeader;


// import { NavDropdown } from 'react-bootstrap';
// import logo from '../../assets/images/inhome-consulting-logo11.jpg';
// import userImg from '../../assets/images/avatar-icon.png';

// import React, { useEffect, useRef, useContext, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import { BiMenu } from 'react-icons/bi';
// import Cookies from 'js-cookie';
// import axios from '../../utils/axios';
// // import { verifyToken } from '../../utils/Constants';
// // import { logout } from '../../Redux/emailReducer';
// // import { change } from '../../Redux/emailReducer';
// import AuthContext from '../../context/AuthProvider';

// const navLinks = [
//   {
//     path: '/admin/panel',
//     display: 'AdminHome',
//   },
//   {
//     path: '/admin/department',
//     display: 'Departments',
//   },
//   {
//     path: 'admin/doctors',
//     display: 'Doctor',
//     },
//     {
//     path: 'admin/user',
//     display: 'Patients',
//     },
//   // Additional navigation links here
// ];

// const navLinksLogin = [
//   {
//     path: '/admin/panel',
//     display: 'AdminHome',
//   },
//   {
//     path: '/contact',
//     display: 'adContact',
//   },
    
// ];

// const AdminHeader = () => {
//   const headerRef = useRef(null);
//   const menuRef = useRef(null);
//   const [showProfileDropdown, setShowProfileDropdown] = useState(false); // Added state for showing/hiding profile dropdown


//   const [isHeaderWhite, setIsHeaderWhite] = useState(false);

//   const handleStickyHeader = () => {
//     window.addEventListener('scroll', () => {
//       const currentHeaderRef = headerRef.current;
  
//       if (currentHeaderRef) {
//         if (
//           document.body.scrollTop > 80 ||
//           document.documentElement.scrollTop > 80
//         ) {
//           currentHeaderRef.style.position = 'fixed';
//           currentHeaderRef.style.top = '0';
//           currentHeaderRef.style.width = '100%';
//           currentHeaderRef.style.zIndex = '1000';
//           setIsHeaderWhite(true);
//         } else {
//           currentHeaderRef.style.position = 'static';
//           setIsHeaderWhite(false);
//         }
//       }
//     });
//   };

//   useEffect(() => {
//     handleStickyHeader();
//     return () => window.removeEventListener('scroll', handleStickyHeader);
//   }, []);

//   const toggleMenu = () => menuRef.current.classList.toggle('show__menu');

//   const dispatch = useDispatch();
//   const email = useSelector((state) => state.email);
//   const { auth, setAuth } = useContext(AuthContext);
  
//   const navigate = useNavigate();
//   const [logout, setLogout] = useState(false);

//   useEffect(() => {
//     if (logout) {
//       Cookies.remove("jwt-admin");
//       Cookies.remove("role", "admin");
//       navigate("/admin/login");
//     }
//   }, [logout, navigate]);

//   const handleLogout = () => {
//     setLogout(true);
//   };

//   const toggleProfileDropdown = () => {
//     setShowProfileDropdown(!showProfileDropdown);
//   };

//   return (
//     <header className="header flex items-center" ref={headerRef}>
//       <div className="container">
//         <div className="flex items-center justify-between">
//           <div>
//             <img src={logo} alt="" />
//           </div>
//           <div className="navigation" ref={menuRef} onClick={toggleMenu}>
//             <ul className="menu flex items-center gap-[2.7rem]">
//               {email ? (
//                 logout ? (  // Conditionally render navLinksLogin if logout is true
//                   navLinksLogin.map((link, index) => (
//                     <li key={index}>
//                       <NavLink
//                         to={link.path}
//                         className={(navclass) =>
//                           navclass.isActive
//                             ? 'text-primaryColor text-[16px] leading-7 font-[600]'
//                             : 'text-textColor textp-[16px] leading-7 font-[500] hover:text-primaryColor'
//                         }
//                       >
//                         {link.display}
//                       </NavLink>
//                     </li>
//                   ))
//                 ) : ( // Conditionally render navLinks if logout is false
//                   navLinks.map((link, index) => (
//                     <li key={index}>
//                       <NavLink
//                         to={link.path}
//                         className={(navclass) =>
//                           navclass.isActive
//                             ? 'text-primaryColor text-[16px] leading-7 font-[600]'
//                             : 'text-textColor textp-[16px] leading-7 font-[500] hover:text-primaryColor'
//                         }
//                       >
//                         {link.display}
//                       </NavLink>
//                     </li>
//                   ))
//                 )
//               ) : (
//                 // Render navLinksLogin by default if there's no user
//                 navLinksLogin.map((link, index) => (
//                   <li key={index}>
//                     <NavLink
//                       to={link.path}
//                       className={(navclass) =>
//                         navclass.isActive
//                           ? 'text-primaryColor text-[16px] leading-7 font-[600]'
//                           : 'text-textColor textp-[16px] leading-7 font-[500] hover:text-primaryColor'
//                       }
//                     >
//                       {link.display}
//                     </NavLink>
//                   </li>
//                 ))
//               )}
//             </ul>
//           </div>
//           <div className="flex items-center gap-4">
//             <div >
//               <div className="profile-dropdown">
//                   <img
//                     src={userImg}
//                     className="w-[35px] h-[35px] rounded-full cursor-pointer"
//                     alt=""

//                     onClick={toggleProfileDropdown}
//                   />
//                   {showProfileDropdown && (
//                   <NavDropdown
//                     // title="Profile"
//                     // id="profile-dropdown"
//                     // align="end"
//                     show={showProfileDropdown}
//                   >
//                     <NavDropdown.Item href="/services">Profile</NavDropdown.Item>
//                     <NavDropdown.Item href="/appointment">Appointment</NavDropdown.Item>
//                   </NavDropdown>
//                 )}
//               </div>
//               {/* <Link to="/">
//                 <figure className="w-[35px] h-[35px] rounded-full cursor-pointer">
//                   <img src={userImg} className="w-full rounded-full" alt="" />
//                 </figure>
//               </Link> */}
//             </div>
//             {email ? (
//               <div>
//                 <button
//                   className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]"
//                   onClick={handleLogout}
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <Link to="/admin/login">
//                 <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
//                   Login
//                 </button>
//               </Link>
//             )}
//             <span className="md:hidden" onClick={toggleMenu}>
//               <BiMenu className="w-6 h-6 cursor-pointer" />
//             </span>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default AdminHeader;

