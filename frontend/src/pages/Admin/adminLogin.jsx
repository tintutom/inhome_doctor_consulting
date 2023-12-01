import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "../../utils/axios";
import { change } from "../../Redux/emailReducer";
import { adminLogin } from "../../utils/Constants";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";


const AdminLogin=()=>{
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const data = JSON.stringify({
      email,
      password,
    });
    axios
      .post(adminLogin, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (
          response.data.status === "Wrong Password" ||
          response.data.status === "Email is not found" ||
          response.data.status === "Not A Admin Account"
        ) {
          toast.error("Authentication Failed", {
            autoClose: 20000,
          });
        } else {
          Cookies.set("jwt-admin", String(response.data.jwt));
          Cookies.set("role", String(response.data.role));
          toast.success("Logged Succesfully", {
            autoClose: 20000,
          });
          dispatch(change(response.data.payload.email));
          navigate("/admin/panel");
        }
      });
  };

return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-28 lg:px-8 ">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="mt-5 text-center text-2xl font-bold leading-9 text-[#ae935f] hover:text-[#635438]">
        Admin Panel
      </h2>
   
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleLogin}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="adminemail"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#9bd58b] sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#9bd58b] sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-[#e0e8cf] px-3 py-1.5 text-sm font-semibold leading-6 text-[#e0bf73] shadow-sm hover:bg-[#ae935f] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Login
          </button>
        </div>
      </form>

    </div>










  </div>
  )
}

export default AdminLogin