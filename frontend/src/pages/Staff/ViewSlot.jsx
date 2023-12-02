
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { baseUrl } from '../../utils/Constants';
const DoctorSlotsListPage = ({ doctorId }) => {
  const [slots, setSlots] = useState([]);
  console.log("devil")
  // console.log(slots.id)
  // console.log(slots)
  useEffect(() => {
    const fetchDoctorSlots = async () => {
      try {
        const token = Cookies.get('hospital_id');
        const response = await axios.get(`${baseUrl}doctors/${token}/view_slots`);
        setSlots(response.data);
      } catch (error) {
        console.error('Error fetching doctor slots:', error);
      }
    };

    fetchDoctorSlots();
  }, [doctorId]);

  // const handleSlotUpdate = async (slot) => {
  //   try {
  //     const token = Cookies.get('hospital_id');
  //     // console.log('Updating slot ID:', slot.id);
  //     await axios.put(
  //       `http://localhost:8000/doctors/${token}/slots/${slot.id}/update`,
  //       slot,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     alert('Slot updated successfully!');
  //     // You may want to redirect or perform additional actions after successful slot update.
  //   } catch (error) {
  //     console.error('Error updating slot:', error);
  //     alert('Error updating slot. Please try again.');
  //   }
  // };
  
  
  const handleDelete = async (slotId) => {
    try {
      const token = Cookies.get('hospital_id');
      // console.log("URLDELETE",`http://localhost:8000/doctors/${token}/slots/${slotId}/delete`)
      await axios.delete(`${baseUrl}doctors/${token}/slots/${slotId}/delete`);
      alert('Slot deleted successfully!');
      // You may want to update the state or perform additional actions after successful deletion.
    } catch (error) {
      console.error('Error deleting slot:', error);
      alert('Error deleting slot. Please try again.');
    }
  };

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Doctor Appointment Slots</h2>
      <div className="flex justify-center">
        {slots.length === 0 ? (
          <p className="text-lg">No slots available.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {slots.map((slot) => (
              <li key={slot.id} className="border border-gray-300 p-4 rounded-md mb-4">
                <p className="text-lg font-semibold">Date: {slot.date}</p>
                <p className="text-sm text-gray-500">Start Time: {slot.start_time}</p>
                <p className="text-sm text-gray-500">End Time: {slot.end_time}</p>
                <div className="flex justify-between mt-4">
                {/* <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  // onClick={() => handleSlotUpdate(slot.id)}
                >
                  Update
                </button> */}


                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                    onClick={() => handleDelete(slot.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DoctorSlotsListPage;











// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';

// const DoctorSlotsListPage = ({ doctorId }) => {
//   const [slots, setSlots] = useState([]);
//   console.log("devil")
//   console.log(slots.id)
//   console.log("slot0",slots[0].id);
//   console.log("slott",slots)
//   useEffect(() => {
//     const fetchDoctorSlots = async () => {
//       try {
//         const token = Cookies.get('hospital_id');
//         const response = await axios.get(`http://localhost:8000/doctors/${token}/view_slots`);
//         setSlots(response.data);
//       } catch (error) {
//         console.error('Error fetching doctor slots:', error);
//       }
//     };

//     fetchDoctorSlots();
//   }, [doctorId]);

//   const handleSlotUpdate = async (slot) => {
//     try {
//       const token = Cookies.get('hospital_id');
//       console.log('Updating slot ID:', slot.id);
//       await axios.put(
//         `http://localhost:8000/doctors/${token}/slots/${slot.id}/update`,
//         slot,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       alert('Slot updated successfully!');
//       // You may want to redirect or perform additional actions after successful slot update.
//     } catch (error) {
//       console.error('Error updating slot:', error);
//       alert('Error updating slot. Please try again.');
//     }
//   };
  
  
//   const handleDelete = async (slotId) => {
//     try {
//       const token = Cookies.get('hospital_id');
//       console.log("URLDELETE",`http://localhost:8000/doctors/${token}/slots/${slotId}/delete`)
//       await axios.delete(`http://localhost:8000/doctors/${token}/slots/${slotId}/delete`);
//       alert('Slot deleted successfully!');
//       // You may want to update the state or perform additional actions after successful deletion.
//     } catch (error) {
//       console.error('Error deleting slot:', error);
//       alert('Error deleting slot. Please try again.');
//     }
//   };

//   return (
//     <div className="container mx-auto my-8">
//       <h2 className="text-3xl font-bold mb-6 text-center">Doctor Appointment Slots</h2>
//       <div className="flex justify-center">
//         {slots.length === 0 ? (
//           <p className="text-lg">No slots available.</p>
//         ) : (
//           <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {slots.map((slot) => (
//               <li key={slot.id} className="border border-gray-300 p-4 rounded-md mb-4">
//                 <p className="text-lg font-semibold">Date: {slot.date}</p>
//                 <p className="text-sm text-gray-500">Start Time: {slot.start_time}</p>
//                 <p className="text-sm text-gray-500">End Time: {slot.end_time}</p>
//                 <div className="flex justify-between mt-4">
//                   <button
//                     className="bg-blue-500 text-white px-4 py-2 rounded-md"
//                     onClick={() => handleSlotUpdate(slot)}
//                   >
//                     Update
//                   </button>
//                   <button
//                     className="bg-red-500 text-white px-4 py-2 rounded-md"
//                     onClick={() => handleDelete(slot.id)}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </li>
//             ))}

//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DoctorSlotsListPage;

