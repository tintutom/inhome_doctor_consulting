import React from 'react';
import Header from './components/Header/Header';
import StaffHeader from './components/Header/StaffHeader';
import AdminHeader from './components/Header/AdminHeader';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Contact from './pages/Contact';
import Doctors from './pages/Doctors/Doctors';
import DoctorsDetails from './pages/Doctors/DoctorsDetails';
import AdminLogin from './pages/Admin/adminLogin';
import {LoginPageRender, LoginPageRenderHospital, RequireAuthLogin, RequireAuthLoginHospital} from './utils/authAdminLogin'
import DoctorRegister from './pages/Staff/doctorRegister';
import DoctorLogin from './pages/Staff/doctorLogin';
import DoctorDashboard from './pages/Staff/doctorDashboard';
import AdminDashboard from './pages/Admin/adminDashboard';
import AddSpecialization from './pages/Admin/addSpecialization';
import UsersList from './pages/Admin/usersList';
import DoctorsList from './components/Doctors/DoctorsList';
import Doctorlist from './pages/Admin/doctorsList';
import SlotBooking from './pages/slotBooking';
import DoctorSlotPage from './pages/Staff/DoctorSlotPage';
import ViewAddedSlot from './pages/Staff/ViewSlot';
import DoctorSlotsListPage from './pages/Staff/ViewSlot';
import DoctorCalender from './pages/Staff/doctorCalender';
import UserProfile from './pages/profile';
import DoctorAdditionalDetailsForm from './pages/Staff/addAdditionaldetails';
import ClientPayment from './pages/ClintPayment';
import PaymentSuccess from './pages/PaymentSuccess';
import Map from './components/Location/AddLocation';
import Message from './components/Messages/message';
import MessageDetails from './components/Messages/MessageDetails';
import AddLocation from './components/Location/AddLocation';
import UserAppointments from './pages/Appoinment';
import SearchUsers from './components/Messages/SearchUsers';
import AppoinmentView from './pages/Staff/AppoinmentView';
import ChatComponent from './components/Messages/message';
import DocChatComponent from './components/Messages/DocMessage';

function App() {
  
  const path = window.location.pathname; // Get the current path
  const isHospitalPath = path.startsWith('/hospital');
  const isAdminPath = path.startsWith('/admin');
  return (
      <div className='App'>
      <Router>
      {isHospitalPath ? <StaffHeader /> : isAdminPath ? <AdminHeader /> : <Header />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/doctors' element={<Doctors />} />
          

          <Route path='/doctors/:id' element={<DoctorsDetails />} />
          <Route path='/doctors/:id/slot' element={<SlotBooking />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Signup />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/services' element={<Services />} />
          {/* <Route path='/slot' element={<SlotBooking />} /> */}
          <Route path='/profile' element={<UserProfile />} />
          <Route path='/payment' element={<ClientPayment />} ></Route>
          <Route path='/success' element={<PaymentSuccess />} ></Route>
          <Route path='/addlocation' element={<AddLocation />} ></Route>
          <Route path='/message' element={<ChatComponent />} ></Route>
          <Route path='/inbox' element={<MessageDetails />} ></Route>
          <Route path='/search/:username' element={<SearchUsers />} ></Route>



          <Route path='/appoinments' element={<UserAppointments />} ></Route>

          

          <Route element={<LoginPageRender />}>
            <Route path='/admin/login' element={<AdminLogin />} />
          </Route>
          <Route element={<RequireAuthLogin />}>
            <Route path='/admin/panel' element={<AdminDashboard />} />
            <Route path='admin/department' element={<AddSpecialization />} />
            <Route path='admin/user' element={<UsersList />} />
            <Route path='admin/doctors' element={<Doctorlist/>} />
          </Route>
          
          <Route element={<LoginPageRenderHospital />}>
          <Route path='hospital/login' element={<DoctorLogin />} />
          </Route>
          <Route path='hospital/signup' element={<DoctorRegister />} />

          <Route element={<RequireAuthLoginHospital />} >
            <Route path='hospital/panel' element={<DoctorDashboard />} />
            <Route path='hospital/panel/add-info' element={<DoctorAdditionalDetailsForm />} />
            <Route path='hospital/addslots' element={<DoctorSlotPage />} />
            <Route path='hospital/slots' element={<DoctorSlotsListPage />} />
            <Route path='hospital/calender' element={<DoctorCalender />} />
            <Route path='hospital/appoinments' element={<AppoinmentView />} />
            <Route path='hospital/message' element={<DocChatComponent />} ></Route>

            
          </Route>  

        </Routes>
        

        
        <Footer />
      </Router>
      </div>
  );
}

export default App;
