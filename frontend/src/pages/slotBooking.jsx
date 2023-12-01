
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import moment from 'moment';

// const DoctorAppointmentPage = () => {
//   const { id } = useParams();
//   const [allSlots, setAllSlots] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [bookedSlots, setBookedSlots] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null); // Add state for selected date
//   const userId = Cookies.get('id');

//   useEffect(() => {
//     const fetchSlots = async () => {
//       try {
//         const allSlotsResponse = await axios.get(`http://127.0.0.1:8000/all_slots/${id}`);
//         const bookedResponse = await axios.get(`http://127.0.0.1:8000/booked_slots/${id}`);
        
//         setAllSlots(allSlotsResponse.data);
//         console.log("sssss",allSlotsResponse.data)
//         setBookedSlots(bookedResponse.data.map(slot => slot.id));
//       } catch (error) {
//         console.error('Error fetching slots:', error);
//       }
//     };

//     fetchSlots();
//   }, [id]);

//   const handleSlotSelection = (slot) => {
//     // Check if the slot is available before updating the state
//     if (!bookedSlots.includes(slot.id)) {
//       setSelectedSlot(slot);
//     }
//   };

//   const handleBooking = async () => {
//     // Check if the selected slot is not already booked
//     if (!bookedSlots.includes(selectedSlot.id)) {
//       try {
//         const response = await axios.post(`http://127.0.0.1:8000/book-appointment/${id}/${selectedSlot.id}`, {
//           doctor_slot: selectedSlot.id,
//           user: userId
//         });

//         setBookedSlots([...bookedSlots, selectedSlot.id]);
//         alert(`Slot booked: ${selectedSlot.start_time} - ${selectedSlot.end_time} (ID: ${selectedSlot.id})`);
//         setSelectedSlot(null);
//       } catch (error) {
//         console.error('Error booking appointment:', error);
//         alert('Error booking appointment. Please try again.');
//       }
//     } else {
//       alert('Slot already booked. Please choose another slot.');
//     }
//   };

//   useEffect(() => {
//     const fetchSlots = async () => {
//       try {
//         // Use moment library to format the date in 'YYYY-MM-DD' format
//         const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
        
//         const response = await axios.get(`http://127.0.0.1:8000/available_slots/${id}/${formattedDate}`);
        
//         // Separate available slots and booked slots
//         const availableSlots = response.data.filter(slot => !slot.isBooked);
//         const bookedSlots = response.data.filter(slot => slot.isBooked).map(slot => slot.id);
  
//         setAllSlots(availableSlots);
//         setBookedSlots(bookedSlots);
//       } catch (error) {
//         console.error('Error fetching slots:', error);
//       }
//     };
  
//     if (selectedDate) {
//       fetchSlots();
//     }
//   }, [id, selectedDate]);
  
  

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//     // Add logic to fetch slots for the selected date if needed
//   };

//   return (
//     <div className="container mx-auto p-8">
//       <h2 className="text-3xl font-bold mb-8">Doctor Appointment Slot Booking</h2>

//       {/* Date Picker */}
//       <div className="p-6">
//         <div className="flex">
//           <div className="mr-4">
//             <label className="block font-bold mb-2">Select Date:</label>
//             <DatePicker
//               selected={selectedDate}
//               onChange={handleDateChange}
//               minDate={new Date()} // Set minimum date to the current date
//               dateFormat="yyyy-MM-dd" // Set the date format if needed
//             />
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-wrap -mx-4">
//         {allSlots.map((slot, index) => (
//           // Adjust the code for displaying slots based on the selected date
//           <div key={index} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-4">
//             <div
//               className={`bg-white p-6 border rounded cursor-pointer ${
//                 bookedSlots.includes(slot.id)
//                   ? 'bg-red-200'
//                   : selectedSlot === slot
//                   ? 'border-primaryColor'
//                   : 'border-gray-300'
//               }`}
//               onClick={() => handleSlotSelection(slot)}
//             >
//               <div className="text-lg font-semibold mb-2">{`${slot.start_time} - ${slot.end_time} (ID: ${slot.id})`}</div>
//               <div className="text-sm">
//                 {slot.is_available ? 'Available' : 'Booked'}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="mt-8">
//         {selectedSlot && (
//           <div>
//             <h3 className="text-xl font-bold mb-4">Selected Slot:</h3>
//             <div className="bg-white p-6 border rounded border-primaryColor">
//               <div className="text-lg font-semibold mb-2">
//                 {`${selectedSlot.start_time} - ${selectedSlot.end_time} (ID: ${selectedSlot.id})`}
//               </div>
//               <div className="text-sm">
//                 {bookedSlots.includes(selectedSlot.id) ? 'Booked' : 'Available'}
//               </div>
//             </div>
//             <button
//               className={`mt-4 bg-primaryColor text-white px-4 py-2 rounded hover:bg-primaryColorDark ${
//                 bookedSlots.includes(selectedSlot.id)
//                   ? 'cursor-not-allowed opacity-50'
//                   : ''
//               }`}
//               onClick={handleBooking}
//               disabled={bookedSlots.includes(selectedSlot.id)}
//             >
//               {bookedSlots.includes(selectedSlot.id)
//                 ? 'Slot Booked'
//                 : 'Book Appointment'}
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DoctorAppointmentPage;




import React, { useState, useEffect } from 'react';
import { mediaUrl,baseUrl } from '../utils/Constants';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { DatePicker } from 'antd';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Map from '../components/Location/AddLocation';
const SlotBooking=()=>{
  const location = useLocation();
  
  const [doctor, setDoctor] = useState([]); // for displaying the professional details
  const [users, setUsers] = useState([]); // for displaying the user details
  const [availability,setAvailability]=useState([]) //store available date from backend
  const [selectedDate, setSelectedDate] = useState(''); // store selected date 
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]); //for manage time slotes
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const navigate = useNavigate();

  const { id } = useParams();
  const user_id = Cookies.get('id');

  useEffect (()=>{
    FetchDoctorDetails()
    FetchUserDetails()
    FetchAvailability()
    
  },[]);


  const FetchDoctorDetails = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}doctors/doctor-info/${id}`,
        
      );
      setDoctor(response.data)
      console.log("doctor details",response)
    } catch (error) {
      console.error("Error fetching professional details:", error);
    }
  };

  const FetchUserDetails = async () => {
    try {
      console.log("url",`${baseUrl}get-user/${user_id}`)
      const response = await axios.get(
        `${baseUrl}get-user/${user_id}`,

        
      );
      setUsers(response.data)
      console.log("user details",response)
    } catch (error) {
      console.error("Error fetching professional details:", error);
    }
  };
  const FetchAvailability = async () => {
    try {
      console.log(`${baseUrl}available_slots/${id}`)
      const response = await axios.get(
        `${baseUrl}available_slots/${id}`,

        
      );
      setAvailability(response.data)
      console.log("slott details",response)
    } catch (error) {
      console.error("Error fetching professional details:", error);
    }
  };

  const handleDateChange = (date) => {
    if (date === null) {
      setSelectedDate(null);
      setAvailableTimeSlots([]); 
    } else {
  
       setSelectedDate(date); // Update selected date
  
  
        // Filter available time slots for the selected date
        const dateStr = date.format('YYYY-MM-DD');
        const timeSlots = availability
          .filter((item) => item.date === dateStr && item.is_available) 
          .map((item) => ({
            id:item.id,
            start_time:item.start_time,
            end_time:item.end_time,
          }));
        setAvailableTimeSlots(timeSlots);
  
    } 
    
  };

  const disabledDate = (current) => {
    if (!current || current.isBefore(moment().startOf('day'))) {
      return true; // Disable dates in the past or before today
    }
  
    const dateStr = current.format('YYYY-MM-DD');
    const isAvailable = availability.some((item) => item.date === dateStr && item.is_available);
    return !isAvailable; // Return true to disable if it's not available
  };
  const handleSlotSelection = (slotId) => {
    console.log("Selected Slot ID:", slotId);
    setSelectedSlotId(slotId);
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    console.log('Button clicked!');
    navigate('/addlocation',{ state: { users, doctor,selectedDate,selectedTimeSlot,selectedSlotId } })
    console.log(doctor.name,"name")
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 mt-10 ml-4">
        {/* First Card - Professional Details */}
        <div className="w-full md:w-1/4 bg-white rounded-lg shadow-md">
          <div className="bg-sky-600 text-white text-center text-xl p-4 rounded-t-lg">
            Appointment With {doctor.name}
          </div>
          <div className="p-6">
            <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
              <img
                src={`${mediaUrl}${doctor.image}`}
                alt="Profile Picture"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-bold text-xl text-center mb-2">{doctor.name}</p>
            <p className="text-lg mb-2">Specialization: {doctor.specialization? doctor.specialization.specialization: 'N/A'}</p>
            <p className="mb-2">Phone: {doctor.phone}</p>
            <p className="mb-2">Email: {doctor.email}</p>
            <p className="mb-2">Fee Amount: {doctor.additional_details ? doctor.additional_details.fee : 'N/A'}</p>
          </div>
        </div>
        {/* Second Card - Additional Details (Placeholder) */}
        <div className="w-full md:w-3/4 bg-white rounded-lg shadow-lg ml-4 mr-4">
          <div className="p-6">
            {/* First Separate Heading Card */}
            <div className="bg-sky-600 text-white text-center text-xl p-3 rounded-t-2xl">
              Review Your Details
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="font-bold">Name:</p>
                  <p>{users.username}</p>
                  <p className="font-bold">Phone Number:</p>
                  <p>{users.phone}</p>
                </div>
                <div>
                  <p className="font-bold">Email:</p>
                  <p>{users.email}</p>
                  {/* <p className="font-bold">Address:</p> */}
                  {/* <p>{users.address}</p> */}
                </div>
              </div>
            </div>
          </div>
        
        {/* Second Separate Heading Card */}
        <div className="bg-sky-600 text-white text-center  text-xl mt-4 p-3 rounded-t-2xl mt-4">
          Book Your Appointment
          </div>
          {/* Date Picker */}
          <div className="p-6">
            <div className="flex">
              <div className="mr-4">
                <label className="block font-bold mb-2">Select Date :</label>
                <DatePicker
                  disabledDate={disabledDate}
                  selected={selectedDate}
                  onChange={handleDateChange}
                  minDate={moment().toDate()}
                  maxDate={moment().add(1, 'year').toDate()}
                />
              </div>
            <div className="flex flex-col ml-20">

            {selectedDate && (
              <div>
                {availableTimeSlots.length > 0 ? (
                  <div>
                  <h2 className="font-bold mb-2">Available Time Slots:</h2>
                
                {availableTimeSlots.map((slot, index) => (
                  <label key={index} className="mb-2 ml-4 ">
                    <input
                      type="radio"
                      name="timeSlot"
                      value={slot.id}
                      onChange={() => {
                        handleSlotSelection(slot.id);
                        setSelectedTimeSlot(`${slot.start_time} - ${slot.end_time}`);
                      }}
                    />
                    {`${slot.start_time} - ${slot.end_time}`}
                  </label>
                ))}

                  </div>
                ) : (
                  <p>No available time slots for the selected date.</p>
                )}
              </div>
            )}
          </div>
          

        
      </div>
      
      
    </div>


      <div className="p-6 flex justify-end">
        <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md mr-4 "   
        onClick={handleSubmit}
        >Add Address</button>
        {/* <Map  /> */}
      </div>            
    
    </div>
    
      </div>
    </div>
  );
  

}


export default SlotBooking