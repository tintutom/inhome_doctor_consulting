import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import axios from '../utils/axios';
import { useDispatch } from 'react-redux';
import {change} from '../Redux/emailReducer';
import Cookies from "js-cookie";
import { userLogin } from '../utils/Constants';
import toast from "react-hot-toast";

function Login  () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log("before data enter")
    const handleLogin = (e) => {
      e.preventDefault();
      const data = JSON.stringify({
        email,
        password,
      });
      axios
        .post(userLogin, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          if (
            response.data.status === "Wrong Password" ||
            response.data.status === "Email is not found"
          ) {
            toast.error("Email or Password is incorrect.", {
              autoClose: 20000,
            });
          } else {
            Cookies.set("jwt_user", String(response.data.jwt));
            Cookies.set("role", String(response.data.role));
            Cookies.set("id", String(response.data.id));
            toast.success("Logged Successfully", {
              autoClose: 30000,
            });
            console.log("logged data match")
            navigate("/");
            dispatch(change(response.data.payload.email));
          }
        });
    };
  // const [formData, setFormData]=useState({
  //   email:'',
  //   password:'',
  // })

  // const handleInputChange = e =>{
  //   setFormData({...formData, [e.target.name]:e.target.value})
  // }
  return (
    <section className='px-5 lg:px-0'>
      <div className='w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10'>
        <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10'>
          Hello! <span className='text-primaryColor'>Welcome</span>Back
        </h3>
        <form className='py-4 md:py-0' onSubmit={handleLogin}>
          <div className='mb-5'>
            <input 
              type='email' 
              placeholder='Enter your Email' 
              name='email' 
              value={email} 
              onChange={(e) => {
                setEmail(e.target.value);
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
            Do ypu have an account?<Link to='/register' className='text-primaryColor font-medium ml-1'>Register Here</Link>
          </p>
        </form>
      </div>
    </section>
  )
}

export default Login