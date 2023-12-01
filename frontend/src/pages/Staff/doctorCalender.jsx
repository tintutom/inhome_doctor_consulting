import React, { useState,useEffect } from "react";
import { FiAlignJustify } from 'react-icons/fi';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from "axios";
import { useParams } from "react-router-dom";
import Cookies from 'js-cookie';

 const DoctorCalender=()=> {
    const [showComponent, setShowComponent] = useState(true);
    const docId = localStorage.getItem("id"); // To pass in request
    const [events, setEvents] = useState([]);
    const localizer = momentLocalizer(moment);
    const { id } = useParams();
    const userId = Cookies.get('hospital_id');
    console.log("DOC ID:",userId)


    const handleToggle = () => {
      setShowComponent((prevShowComponent) => !prevShowComponent);
    };

    useEffect(() => {
      fetchAvailability()

  
      setEvents(transformedEvents);

    }, []);

    const transformedEvents = events.map(event => {
      const start = moment(`${event.date} ${event.start_time}`);
      const end = moment(`${event.date} ${event.end_time}`);

      return {
        id: event.id,
        title: event.is_available ? 'Completed' : 'Sheduled',
        start: start.toDate(),
        end: end.toDate(),
      };
    });

    //Functiion to fetch availability
    const fetchAvailability = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/doctors/${userId}/view_slots`);
        // Handle the fetched slots data as needed
        console.log(response.data,'availabilityyyyyyyyyyyyy');
        setEvents(response.data)
        console.log(events,"okayyyyyyyyyyy");
        
      } catch (error) {
        console.log(error);
      }
    };

    const dummyEvents = [
      {
        id: 1,
        title: 'Event 1',
        start: new Date(2023, 7, 10, 10, 0), // August 10, 2023, 10:00 AM
        end: new Date(2023, 7, 10, 12, 0), // August 10, 2023, 12:00 PM
      },
      {
        id: 2,
        title: 'Event 2',
        start: new Date(2023, 7, 11, 14, 0), // August 11, 2023, 2:00 PM
        end: new Date(2023, 7, 11, 16, 0), // August 11, 2023, 4:00 PM
      },
    ];
    
  return (
    <div>
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 bg-gray-100 md:min-h-screen flex flex-col">
          <section className="bg-white w-full py-8  flex-1">
            <div className="container mx-auto text-center ">
              {/* <button
                onClick={handleToggle}
                className="flex justify-start items-center hover:bg-gray-400 hover:text-gray-600 px-2 py-1 rounded"
              >
                {showComponent ? (
                  <FiAlignJustify className="inline-block mr-1 text-xl" />
                ) : (
                  <FiAlignJustify className="inline-block mr-1 text-xl" />
                )}
              </button> */}

              <Calendar
                localizer={localizer}
                events={transformedEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}


export default DoctorCalender