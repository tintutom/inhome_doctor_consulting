// // import React, { useState } from 'react';
// // import Map from '../Location/Map';

// // const AddLocation = ({ propertyDetails }) => {
// //   const [propertyDetailsState, setPropertyDetailsState] = useState(propertyDetails);

// //   // Function to update propertyDetailsState
// //   const updatePropertyDetails = (updatedDetails) => {
// //     setPropertyDetailsState((prev) => ({ ...prev, ...updatedDetails }));
// //   };

// //   const city = propertyDetailsState?.city;
// //   const address = propertyDetailsState?.address;

// //   const handleSubmit = () => {
// //     // Your existing submit logic
// //     console.log("handlesubmitdata", propertyDetailsState);
// //   };

// //   return (
// //     <form
// //       onSubmit={(e) => {
// //         e.preventDefault();
// //         handleSubmit();
// //       }}
// //     >
// //       <div className="flexCenter" style={{ gap: "3rem", marginTop: "3rem", justifyContent: "space-between" }}>
// //         {/* left side */}
// //         {/* inputs */}
// //         <div className="flexColStart" style={{ marginLeft:"20rem"}}>
// //           {/* Remove the Country select */}
          
// //           <label>City </label>
// //           <input style={{borderRadius:"10px",border: "1px solid black",marginLeft:"1rem"}}
// //             type="text"
// //             value={propertyDetails?.city}
// //             onChange={(e) => updatePropertyDetails({ city: e.target.value })}
// //           />

// //           <label style={{marginLeft:"1rem"}}>Address </label>
// //           <input
// //             style={{borderRadius:"10px",border: "1px solid black",marginLeft:"1rem"}}
// //             type="text"
// //             value={propertyDetails?.address}
// //             onChange={(e) => updatePropertyDetails({ address: e.target.value })}
// //           />
// //         </div>

// //         {/* right side */}
// //         <div style={{ flex: 1 }}>
// //           <Map address={address} city={city} />
// //         </div>
        
// //       </div>
      
// //     </form>
// //   );
// // };

// // export default AddLocation;


// import React, { useState } from 'react';
// import Map from './Map';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { useLocation, useNavigate } from 'react-router-dom';

// const AddLocation = ({ propertyDetails }) => {
//   const [propertyDetailsState, setPropertyDetailsState] = useState(propertyDetails);

//   // Function to update propertyDetailsState
//   const updatePropertyDetails = (updatedDetails) => {
//     setPropertyDetailsState((prev) => ({ ...prev, ...updatedDetails }));
//   };

//   const city = propertyDetailsState?.city;
//   const address = propertyDetailsState?.address;
//   const user_id = Cookies.get('id');
//   console.log("userrrid", user_id);

//   const location = useLocation();
//   const navigate = useNavigate();
//   const { users, doctor, selectedDate, selectedTimeSlot,selectedSlotId } = location.state;

//   console.log("url", `http://127.0.0.1:8000/useraddresses/${user_id}/`);
//   const handleSubmit = () => {
//     axios.post(`http://127.0.0.1:8000/useraddresses/${user_id}/`, {
//       user: user_id,
//       city: propertyDetailsState.city,
//       address: propertyDetailsState.address,
//     })
//       .then(response => {
//         console.log('Address added successfully:', response.data);
//         // Handle success, e.g., show a success message to the user
//         navigate('/payment', {
//           state: {
//             users,
//             doctor,
//             selectedDate,
//             selectedTimeSlot,
//             selectedSlotId,
//             address: propertyDetailsState?.address,
//             city: propertyDetailsState?.city,
//           }
//         });
//       },[])
//       .catch(error => {
//         console.error('Error adding address:', error);
//         // Handle error, e.g., show an error message to the user
//       });
//   };

//   return (
//     <form
//       onSubmit={(e) => {
//         e.preventDefault();
//         handleSubmit();
//       }}
//     >
//       <div className="flexCenter" style={{ gap: "3rem", marginTop: "3rem", justifyContent: "space-between" }}>
//         {/* left side */}
//         {/* inputs */}
//         <div className="flexColStart" style={{ marginLeft: "20rem" }}>
//           {/* Remove the Country select */}
//           <label>City </label>
//           <input style={{ borderRadius: "10px", border: "1px solid black", marginLeft: "1rem" }}
//             type="text"
//             value={propertyDetails?.city}
//             onChange={(e) => updatePropertyDetails({ city: e.target.value })}
//           />
//           <label style={{ marginLeft: "1rem" }}>Address </label>
//           <input
//             style={{ borderRadius: "10px", border: "1px solid black", marginLeft: "1rem" }}
//             type="text"
//             value={propertyDetails?.address}
//             onChange={(e) => updatePropertyDetails({ address: e.target.value })}
//           />

//             <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>
//               Continue
//             </button>

//         </div>

//         {/* right side */}
//         <div style={{ flex: 1 }}>
//           <Map address={address} city={city} />
//         </div>
//       </div>
      
//     </form>
//   );
// };

// export default AddLocation;

import React, { useState } from 'react';
import Map from './Map';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import { baseUrl } from '../../utils/Constants';

const AddLocation = ({ propertyDetails }) => {
  const [propertyDetailsState, setPropertyDetailsState] = useState({
    ...propertyDetails,
    latitude: null,
    longitude: null,
  });

  const updatePropertyDetails = (updatedDetails) => {
    setPropertyDetailsState((prev) => ({ ...prev, ...updatedDetails }));
  };

  const user_id = Cookies.get('id');
  const location = useLocation();
  const navigate = useNavigate();
  const { users, doctor, selectedDate, selectedTimeSlot, selectedSlotId } = location.state;

  const handleLocationSelect = async (latLng) => {
    updatePropertyDetails({ latitude: latLng.latitude, longitude: latLng.longitude });

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&lat=${latLng.latitude}&lon=${latLng.longitude}`
      );

      const address = response.data[0]?.display_name || '';
      updatePropertyDetails({ address });
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const axiosResponse = await axios.post(`${baseUrl}useraddresses/${user_id}/`, {
        user: user_id,
        city: propertyDetailsState.city,
        address: propertyDetailsState.address,
        latitude: propertyDetailsState.latitude,
        longitude: propertyDetailsState.longitude,
      });

      console.log('Address added successfully:', axiosResponse.data);

      navigate('/payment', {
        state: {
          users,
          doctor,
          selectedDate,
          selectedTimeSlot,
          selectedSlotId,
          address: propertyDetailsState?.address,
          city: propertyDetailsState?.city,
          latitude: propertyDetailsState?.latitude,
          longitude: propertyDetailsState?.longitude,
        },
      });
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="flexCenter" style={{ gap: "3rem", marginTop: "3rem", justifyContent: "space-between" }}>
        {/* left side */}
        {/* inputs */}
        <div className="flexColStart" style={{ marginLeft: "20rem" }}>
          <label>City </label>
          <input
            style={{ borderRadius: "10px", border: "1px solid black", marginLeft: "1rem" }}
            type="text"
            value={propertyDetailsState?.city}
            onChange={(e) => updatePropertyDetails({ city: e.target.value })}
          />
          <label style={{ marginLeft: "1rem" }}>Address </label>
          <input
            style={{ borderRadius: "10px", border: "1px solid black", marginLeft: "1rem" }}
            type="text"
            value={propertyDetailsState?.address}
            onChange={(e) => updatePropertyDetails({ address: e.target.value })}
          />

          <Map
            address={propertyDetailsState.address}
            city={propertyDetailsState.city}
            onSelect={(latLng) => handleLocationSelect(latLng)}
          />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            Continue
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddLocation;
