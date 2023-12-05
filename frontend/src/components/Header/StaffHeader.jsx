

import { NavDropdown } from 'react-bootstrap';
import logo from '../../assets/images/inhome-consulting-logo11.jpg';
import userImg from '../../assets/images/avatar-icon.png';

import React, { useEffect, useRef, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { BiMenu } from 'react-icons/bi';
import Cookies from 'js-cookie';
import axios from '../../utils/axios';
import { hospitalverifyToken } from '../../utils/Constants';
import { logout } from '../../Redux/usernameReducer';
import { change } from '../../Redux/usernameReducer';
import AuthContext from '../../context/AuthProvider';

const navLinksLogin  = [
  {
    path: '/hospital/login',
    display: 'Doctor Login',
  },
  {
    path: '/contact',
    display: 'Contact',
  },
  
  // Additional navigation links here
];

const navLinks = [
  {
    path: '/hospital/panel',
    display: 'Doctor Home',
  },
  {
    path: '/contact',
    display: 'Contact',
  },
  {
    path: 'hospital/addslots',
    display: 'Add Slot',
  },
  {
  path: '/hospital/slots',
  display: 'View Slots',
  },
  {
    path: '/hospital/calender',
    display: 'Calender',
  },
  {
    path: '/hospital/message',
    display: 'Inbox',
  },
  {
    path: '/hospital/appoinments',
    display: 'Appoinments',
  },
     
  
    
];

const StaffHeader = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false); // Added state for showing/hiding profile dropdown


  const [isHeaderWhite, setIsHeaderWhite] = useState(false);

  const handleStickyHeader = () => {
    window.addEventListener('scroll', () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
    //   ) {
    //     headerRef.current.classList.add('sticky__header');
    //   } else {
    //     headerRef.current.classList.remove('sticky__header');
    //   }
    ) {
        headerRef.current.style.position = 'fixed';
        headerRef.current.style.top = '0';
        headerRef.current.style.width = '100%';
        headerRef.current.style.zIndex = '1000'; 
        setIsHeaderWhite(true);
      } else {
        headerRef.current.style.position = 'static';
        setIsHeaderWhite(false);
      }
    });
  };

  useEffect(() => {
    handleStickyHeader();
    return () => window.removeEventListener('scroll', handleStickyHeader);
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle('show__menu');

  const dispatch = useDispatch();
  
  const username = useSelector((state) => state.username.username);
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const hospitalLogout = () => {
    Cookies.remove("jwt-hospital");
    Cookies.remove("role",'hospital')
    Cookies.remove("hospital_id")
    dispatch(logout());
    navigate('/hospital/login');
  };

  useEffect(() => {
    const token = Cookies.get('jwt-hospital');
    if (token) {
      axios
        .post(
          hospitalverifyToken,
          { token },
          {
            headers: { 'Content-Type': 'application/json' },
          }
        )
        .then((res) => {
          dispatch(change(res.data.username));
        })
        .catch((err) => {
          console.log('Error:', err);
        });
    }
  }, []);
  
  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          <div>
            <img src={logo} alt="" />
          </div>
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {username ? (
                  navLinks.map((link, index) => (
                    <li key={index}>
                      {link.display === 'Appoinments' ? (
                        <NavDropdown title={link.display} id="appoinments-dropdown">
                          <NavDropdown.Item as={Link} to="/hospital/upcoming-appointments">
                            Previous Appointments
                          </NavDropdown.Item>
                          <NavDropdown.Item as={Link} to="/hospital/appoinments">
                            Upcoming Appointments
                          </NavDropdown.Item>
                        </NavDropdown>
                      ) : (
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
                      )}
                    </li>
                  ))
                ) : ( // Conditionally render navLinks if logout is false
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
              )}
            </ul>
          </div>
          <div className="flex items-center gap-4">
            <div >
              <div className="profile-dropdown">
                  <img
                    src={userImg}
                    className="w-[35px] h-[35px] rounded-full cursor-pointer"
                    alt=""

                    onClick={toggleProfileDropdown}
                  />
                  {showProfileDropdown && (
                  <NavDropdown
                    // title="Profile"
                    // id="profile-dropdown"
                    // align="end"
                    show={showProfileDropdown}
                  >
                    <NavDropdown.Item href="/services">Profile</NavDropdown.Item>
                    <NavDropdown.Item href="/appointment">Appointment</NavDropdown.Item>
                    <NavDropdown.Item href="/hospital/calender">Calender</NavDropdown.Item>
                  </NavDropdown>
                )}
              </div>
              {/* <Link to="/">
                <figure className="w-[35px] h-[35px] rounded-full cursor-pointer">
                  <img src={userImg} className="w-full rounded-full" alt="" />
                </figure>
              </Link> */}
            </div>
            {username ? (
              <div>
                <button
                  className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]"
                  onClick={hospitalLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/hospital/login">
                <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                  Login
                </button>
              </Link>
            )}
            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default StaffHeader;

