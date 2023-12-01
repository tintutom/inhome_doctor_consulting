// UserProfile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { mediaUrl, baseUrl } from '../utils/Constants';
import UserAppointments from './Appoinment';  // Import UserAppointments component

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [tab, setTab] = useState('about');
  const userid = Cookies.get("id");

  useEffect(() => {
    axios.get(`${baseUrl}get-user/${userid}`)
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, [userid]);

  return (
    <section>
      <div className='max-w-[1170px] px-5 mx-auto'>
        <div className='grid md:grid-cols-3 gap-[50px]'>
          <div className='md:col-span-2'>
            {userData && (
              <div className="flex items-center gap-5">
                <figure className="max-w-[200px] max-h-[200px]">
                  <img src={`${mediaUrl}${userData.userimage}`} alt="" className="w-full rounded-full" />
                </figure>
                <div>
                  <p className="text-xl font-semibold">{userData.name}</p>
                  <p className="text-gray-600">{userData.email}</p>
                  <p className="text-gray-600">{userData.phone}</p>
                </div>
              </div>
            )}

            <div className='mt-[50px] border-b border-solid border-[#0066ff34]'>
              <button
                onClick={() => setTab('about')}
                className={`${tab === 'about' && 'border-b border-solid border-primaryColor'} py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}>
                Previous Appoinments
              </button>
              <button
                onClick={() => setTab('appointments')}
                className={`${tab === 'appointments' && 'border-b border-solid border-primaryColor'} py-2 px-5 text-[16px] leading-7 text-headingColor font-semibold`}>
                Upcoming Appointments
              </button>
            </div>

            <div className='mt-[50px]'>
              {tab === 'about' && (
                <div>
                  {/* Display additional about information if needed */}
                </div>
              )}
              {tab === 'appointments' && (
                <UserAppointments />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UserProfile;
