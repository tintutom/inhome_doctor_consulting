import React, { useState,useEffect } from 'react'
import doctorImg from '../../assets/images/doctor-img02.png';
import starIcon from '../../assets/images/Star.png';
import DoctorAbout from './DoctorAbout';
import Feedback from './Feedback';
import SidePanel from './SidePanel';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { mediaUrl } from '../../utils/Constants';
import {baseUrl} from '../../utils/Constants';
const DoctorsDetails = () => {
  const [tab, setTab]=useState('about')

  const navigate = useNavigate()
  const { id } = useParams();
  console.log('Doctor ID:', id);
  const [doctorDetails, setDoctorDetails] = useState(null);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await fetch(`${baseUrl}hospital_detail/${id}`);
        const data = await response.json();
        setDoctorDetails(data);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      }
    };

    fetchDoctorDetails();
  }, [id]);

  if (!doctorDetails) {
    // Loading state or error handling
    return <div>Loading...</div>;
  }

  const {
    name,
    specialization,
    additional_details,
    phone,
    email,
    description,
    image,
    is_approved,
  } = doctorDetails;
 
  const handleBookAppointment = () => {
    // Redirect to the slot booking page with doctor's ID
    navigate(`/doctors/${id}/slot`);
  }; 

  return (
    <section>
      <div className='max-w-[1170px] px-5 mx-auto'>
        <div className='grid md:grid-cols-3 gap-[50px]'>
          <div className='md:col-span-2'>
            <div className="flex items-center gap-5">
              <figure className="max-w-[200px] max-h-[200px]">
                <img src={`${mediaUrl}${image}`} alt="" className="w-full" />
              </figure>

              <div>
                <div className="flex items-center gap-6">
                  <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                    {specialization.specialization}
                  </span>
                  <div>
                    <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">{name}</h3>
                    <div className="flex items-center gap-[6px]">
                      <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                        <img src={starIcon} alt="" />4.8
                      </span>
                      <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-textColor">(272)</span>
                    </div>
                  </div>
                </div>

                <p className="text__para text-[14px] leading-6 md:text-[15px] lg:max-w-[390px]">{description}</p>
              </div>
            </div>

            
            <div className='mt-[50px] border-b border-solid border-[#0066ff34]'>
              <button
                onClick={()=>setTab('about')}
                className={`${tab==='about' && 'border-b border-solid border-primaryColor'} py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}>
                  About
              </button>
              <button 
                onClick={()=>setTab('feedback')}
                className={`${tab==='about' && 'border-b border-solid border-primaryColor'} py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}>
                Feedback
              </button>
            </div>

            <div className='mt-[50px]'>
              {tab==='about' && <DoctorAbout name={name} 
                                            description={description} 
                                            specialization={specialization} 
                                            additional_details={additional_details}
                                            phone={phone} 
                                            email={email}
                                            image={image}
                                            />}
              {tab==='feedback' && <Feedback />}
            </div>
          </div>
          <div>
          <div className='shadow-panelShadow p-3 lg:p-5 rounded-md'>
        <div className='flex items-center justify-between'>
            <p className='text__Para mt-0 font-semibold'>Ticket Price</p>
            <span className='text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold'>
                500 BDT
            </span>
        </div>
        

        <div className='mt-[30px]'>
            <p  className='text__para mt-0 font-semibold text-headingColor'>
                      Available Time Slots:
                  </p>
                  <ul className='mt-3'>
                      <li className='flex items-center justify-between mb-2'>
                          <p className='text-[15px] leading-6 text-textColor font-semibold'>
                              Sunday
                          </p>
                          <p className='text-[15px] leading-6 text-textColor font-semibold'>
                              4:00 PM -5:00 PM
                          </p>
                      </li>
                      <li className='flex items-center justify-between mb-2'>
                          <p className='text-[15px] leading-6 text-textColor font-semibold'>
                              Sunday
                          </p>
                          <p className='text-[15px] leading-6 text-textColor font-semibold'>
                              9:00 AM -12:00 PM
                          </p>
                      </li>
                      <li className='flex items-center justify-between mb-2'>
                          <p className='text-[15px] leading-6 text-textColor font-semibold'>
                              Monday
                          </p>
                          <p className='text-[15px] leading-6 text-textColor font-semibold'>
                              3:00 PM -7:00 PM
                          </p>
                      </li>
                  </ul>
              </div>
              <button className='btn px-2 w-full rounded-md'onClick={handleBookAppointment}>Book Appoinment</button>
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DoctorsDetails
