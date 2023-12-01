import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "../../utils/axios";
import { hospitalLogin } from "../../utils/Constants";
import { change } from "../../Redux/usernameReducer";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const DoctorLogin=()=>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();
        const data = JSON.stringify({
        username,
        password,
        });
        axios
        .post(hospitalLogin, data, {
            headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
            if (response.data === "Authentication Failed") {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Authentication Failed",
                showConfirmButton: false,
                timer: 1500,
            });
            } else {
            Cookies.set("jwt-hospital", String(response.data.jwt));
            Cookies.set("role", String(response.data.role));
            Cookies.set("hospital_id", String(response.data.id));
            dispatch(change(response.data.payload.id));
            navigate("/hospital/panel");
            }
        });
  };
  return (
    <section className='px-5 lg:px-0'>
      <div className='w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10'>
        <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10'>
          Hello! <span className='text-primaryColor'>Welcome</span>Back
        </h3>
        <form className='py-4 md:py-0' onSubmit={handleLogin}>
          <div className='mb-5'>
            <input 
              type='text' 
              placeholder='Enter your username' 
              name='username' 
              value={username} 
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className='w-full px-4  border-b border-solid border-[#0066ff61] focus:outline-none
              focus:border-b-primaryColor  text-[16px] leading-7 text-headingColor 
              placeholder:text-textColor rounded-md cursor-pointer '
              required/>
          </div>
          <div className='mb-5'>
            <input 
              type='password' 
              placeholder='Enter your Passoword' 
              name='password' 
              value={password} 
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className='w-full px-4 border-b border-solid border-[#0066ff61] focus:outline-none
              focus:border-b-primaryColor  text-[16px] leading-7 text-headingColor 
              placeholder:text-textColor rounded-md cursor-pointer '
              required/>
          </div>

          <div className='mt-7'>
            <button
              type='submit'
              className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'>
                Login
              </button>
          </div>
          <p className='mt-5 text-textColor text-center'>
            Do you have an account?<Link to='/hospital/signup' className='text-primaryColor font-medium ml-1'>Register Here</Link>
          </p>
        </form>
      </div>
    </section>
  )
}

export default DoctorLogin;