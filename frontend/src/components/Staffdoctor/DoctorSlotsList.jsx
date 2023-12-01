import React from 'react';

const DoctorSlotsList = ({ slots }) => {
  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Doctor Appointment Slots</h2>
      {slots.length > 0 ? (
        <ul className="space-y-4">
          {slots.map((slot) => (
            <li key={slot.id} className="border p-4 rounded-md">
              <p>Date: {slot.date}</p>
              <p>Time: {slot.time}</p>
              {/* Add other slot details here */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No slots available</p>
      )}
    </div>
  );
};

export default DoctorSlotsList;
