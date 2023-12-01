// import React, { useState } from 'react'
// import signupImg from '../assets/images/signup.gif';
// import avatar from '../assets/images/doctor-img01.png';
// import { Link } from 'react-router-dom';

import React, { useState } from 'react';
import signupImg from '../assets/images/signup.gif';
import avatar from '../assets/images/doctor-img01.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import toast from 'react-hot-toast';
import { userSignup } from '../utils/Constants';

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");


  const [selectedFile, setSelectedFile]=useState(null)
  const [previewURL,setPreviewURL]=useState('')
  const [phoneError, setPhoneError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {

    if (nameError || emailError || numberError || passwordError) {
      toast.error("Please fix details correctly.", {
        autoClose: 20000,
      });
      return;
    }

    if (!name || !email || !phone || !password) {
      toast.error("Please fill all the required fields.", {
        autoClose: 20000,
      })
      return;
    }
    const data = JSON.stringify({
      name,
      email,
      phone,
      password,
      photo,
    });
    e.preventDefault();
    axios
      .post(userSignup, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        toast.error(response.data.status, {
          autoClose: 40000,
        });
        navigate("/login");
      });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (!/^[A-Za-z]{3,}$/.test(e.target.value)) {
      setNameError("Must contain at least 3 letters and letters only");
    } else {
      setNameError("");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(e.target.value)) {
      setEmailError("Email is not valid");
    } else {
      setEmailError("");
    }
  };

  const handleNumberChange = (e) => {
    setPhone(e.target.value);
    if (!/^\d{10}$/.test(e.target.value)) {
      setNumberError("Phone Number is not valid");
    } else {
      setNumberError("");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/.test(e.target.value)) {
      setPasswordError("Password length must contains 5 letters and 1 number ");
    } else {
      setPasswordError("");
    }
  };
  const handleFileInputChange=(e)=>{
    setPhoto(e.target.value);
  };

  return (
    <section className='px-5 xl:px-0'>
      <div className='max-w-[1170px] mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2'>
          <div className='hidden lg:block bg-primaryColor rounded-l-lg'>
            <figure className='rounded-l-lg'>
              <img src={signupImg} alt='' className='w-full rounded-l-lg' />
            </figure>
          </div>
          <div className='rounded-l-lg lg:pl-16 py-10'>
            <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10'>
              Create an <span className='text-primaryColor'>Account</span>
            </h3>
            <form onSubmit={handleSubmit}>
              <div className='mb-5'>
                <input
                  type='text'
                  placeholder='Full Name'
                  name='name'
                  value={name}
                  onChange={handleNameChange}
                  className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
                  focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
                  placeholder:text-textColor rounded-md cursor-pointer '
                  required
                />
                <span className='text-danger'>{nameError}</span>
              </div>
              <div className='mb-5'>
                <input
                  type='text'
                  placeholder='Enter Your Email'
                  name='email'
                  value={email}
                  onChange={handleEmailChange}
                  className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
                  focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
                  placeholder:text-textColor rounded-md cursor-pointer '
                  required
                />
                <span className='text-danger'>{emailError}</span>
              </div>
              <div className='mb-5'>
                <input
                  type='password'
                  placeholder='Password'
                  name='password'
                  value={password}
                  onChange={handlePasswordChange}
                  className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
                  focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
                  placeholder:text-textColor rounded-md cursor-pointer '
                  required
                />
                <span className='text-danger'>{passwordError}</span>
              </div>
              <div className='mb-5'>
                <input
                  type='text'
                  placeholder='Mobile Number'
                  name='phone'
                  value={phone}
                  onChange={handleNumberChange}
                  className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
                  focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
                  placeholder:text-textColor rounded-md cursor-pointer '
                  required
                />
                <span className='text-danger'>{phoneError}</span>
              </div>
              <div className='mb-5 flex items-center gap-3'>
                <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center'>
                  {previewURL ? (
                    <img src={previewURL} alt='Selected' className='w-full rounded-full' />
                  ) : (
                    <img src={avatar} alt='' className='w-full rounded-full' />
                  )}
                </figure>
                <div className='relative w-[130px] h-[50px]'>
                  <input
                    type='file'
                    name='photo'
                    id='customFile'
                    onChange={handleFileInputChange}
                    accept='.jpg, .jpeg, .png'
                    className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                  />
                  <label
                    htmlFor='customFile'
                    className='absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] 
                    py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46]
                    text-headingColor font-semibold rounded-lg truncate cursor-pointer'>
                    Upload Photo
                  </label>
                </div>
              </div>
              <div className='mt-7'>
                <button
                  type='submit'
                  className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'
                >
                  SignUp
                </button>
              </div>
              <p className='mt-5 text-textColor text-center'>
                Already have an account?<Link to='/login' className='text-primaryColor font-medium ml-1'>
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;

// const Signup = () => {
//   const [photo, setPhoto] = useState(null);
//   const [previewURL, setPreviewURL] = useState('');
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     phone: '',
//   });

//   const [nameError, setNameError] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [phoneError, setPhoneError] = useState('');
//   const [passwordError, setPasswordError] = useState('');

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileInputChange = (event) => {
//     const file = event.target.files[0];

//     setPhoto(file);

//     // Create a preview URL for the selected image
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       setPreviewURL(e.target.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   const submitHandler = async (event) => {
//     event.preventDefault();

//     const { name, email, password, phone } = formData;

//     if (nameError || emailError || phoneError || passwordError) {
//       toast.error('Please fix details correctly.', {
//         autoClose: 20000,
//       });
//       return;
//     }

//     if (!name || !email || !phone || !password) {
//       toast.error('Please fill all the required fields.', {
//         autoClose: 20000,
//       });
//       return;
//     }

//     const data = new FormData();
//     data.append('name', name);
//     data.append('email', email);
//     data.append('password', password);
//     data.append('phone', phone);
//     data.append('photo', photo);

//     axios
//       .post(userSignup, data, {
//         headers: { "Content-Type": "application/json" },
//       })
//       .then((response) => {
//         toast.error(response.data.status, {
//           autoClose: 40000,
//         });
//         console.log("data",data.name,data.email,data.password,data.phone,)
//         // Navigate to the login page or any other page after successful signup
//         navigate('/login');
//       })
//       .catch((error) => {
//         toast.error('Error occurred while signing up.', {
//           autoClose: 40000,
//         });
//       });
//   };

//   const handleNameChange = (e) => {
//     const name = e.target.value;
//     setFormData({ ...formData, name });
//     if (!/^[A-Za-z]{3,}$/.test(name)) {
//       setNameError('Must contain at least 3 letters and letters only');
//     } else {
//       setNameError('');
//     }
//   };

//   const handleEmailChange = (e) => {
//     const email = e.target.value;
//     setFormData({ ...formData, email });
//     if (!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email)) {
//       setEmailError('Email is not valid');
//     } else {
//       setEmailError('');
//     }
//   };

//   const handlePhoneChange = (e) => {
//     const phone = e.target.value;
//     setFormData({ ...formData, phone });
//     if (!/^\d{10}$/.test(phone)) {
//       setPhoneError('Phone Number is not valid');
//     } else {
//       setPhoneError('');
//     }
//   };

//   const handlePasswordChange = (e) => {
//     const password = e.target.value;
//     setFormData({ ...formData, password });
//     if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/.test(password)) {
//       setPasswordError('Password length must contain 5 letters and 1 number');
//     } else {
//       setPasswordError('');
//     }
//   };

//   return (
//     <section className='px-5 xl:px-0'>
//       <div className='max-w-[1170px] mx-auto'>
//         <div className='grid grid-cols-1 lg:grid-cols-2'>
//           <div className='hidden lg:block bg-primaryColor rounded-l-lg'>
//             <figure className='rounded-l-lg'>
//               <img src={signupImg} alt='' className='w-full rounded-l-lg' />
//             </figure>
//           </div>
//           <div className='rounded-l-lg lg:pl-16 py-10'>
//             <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10'>
//               Create an <span className='text-primaryColor'>Account</span>
//             </h3>
//             <form onSubmit={submitHandler}>
//               <div className='mb-5'>
//                 <input
//                   type='text'
//                   placeholder='Full Name'
//                   name='name'
//                   value={formData.name}
//                   onChange={handleNameChange}
//                   className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
//                   focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
//                   placeholder:text-textColor rounded-md cursor-pointer '
//                   required
//                 />
//                 <span className='text-danger'>{nameError}</span>
//               </div>
//               <div className='mb-5'>
//                 <input
//                   type='text'
//                   placeholder='Enter Your Email'
//                   name='email'
//                   value={formData.email}
//                   onChange={handleEmailChange}
//                   className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
//                   focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
//                   placeholder:text-textColor rounded-md cursor-pointer '
//                   required
//                 />
//                 <span className='text-danger'>{emailError}</span>
//               </div>
//               <div className='mb-5'>
//                 <input
//                   type='password'
//                   placeholder='Password'
//                   name='password'
//                   value={formData.password}
//                   onChange={handlePasswordChange}
//                   className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
//                   focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
//                   placeholder:text-textColor rounded-md cursor-pointer '
//                   required
//                 />
//                 <span className='text-danger'>{passwordError}</span>
//               </div>
//               <div className='mb-5'>
//                 <input
//                   type='text'
//                   placeholder='Mobile Number'
//                   name='phone'
//                   value={formData.phone}
//                   onChange={handlePhoneChange}
//                   className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
//                   focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
//                   placeholder:text-textColor rounded-md cursor-pointer '
//                   required
//                 />
//                 <span className='text-danger'>{phoneError}</span>
//               </div>
//               <div className='mb-5 flex items-center gap-3'>
//                 <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center'>
//                   {previewURL ? (
//                     <img src={previewURL} alt='Selected' className='w-full rounded-full' />
//                   ) : (
//                     <img src={avatar} alt='' className='w-full rounded-full' />
//                   )}
//                 </figure>
//                 <div className='relative w-[130px] h-[50px]'>
//                   <input
//                     type='file'
//                     name='photo'
//                     id='customFile'
//                     onChange={handleFileInputChange}
//                     accept='.jpg, .jpeg, .png'
//                     className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
//                   />
//                   <label
//                     htmlFor='customFile'
//                     className='absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] 
//                     py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46]
//                     text-headingColor font-semibold rounded-lg truncate cursor-pointer'>
//                     Upload Photo
//                   </label>
//                 </div>
//               </div>
//               <div className='mt-7'>
//                 <button
//                   type='submit'
//                   className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'
//                 >
//                   SignUp
//                 </button>
//               </div>
//               <p className='mt-5 text-textColor text-center'>
//                 Already have an account?<Link to='/login' className='text-primaryColor font-medium ml-1'>
//                   Login
//                 </Link>
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Signup;


// const Signup = () => {
//   const [selectedFile, setSelectedFile]=useState(null)
//   const [previewURL,setPreviewURL]=useState('')

  

//   const submitHandler=async event=>{
//     event.preventDefault()
//   }

//   return (
//     <section className='px-5 xl:px-0'>
//       <div className='max-w-[1170px] mx-auto'>
//         <div className='grid grid=cols-1 lg:grid-cols-2'>
//           {/*======img=========== */}
//           <div className='hidden lg:block bg-primaryColor rounded-l-lg'>
//             <figure className='rounded-l-lg'>
//               <img src={signupImg} alt='' className='w-full rounded-l-lg'/>
//             </figure>
//           </div>
//           {/*============signup================== */}
//           <div className='rounded-l-lg lg:pl-16 py-10'>
//             <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10'>
//               Create an <span className='text-primaryColor'>Account</span>
//             </h3>

//             <form onSubmit={submitHandler}>
//             <div className='mb-5'>
//                 <input 
//                   type='name' 
//                   placeholder='Full Name' 
//                   name='name' 
//                   value=''
//                   onChange=''
//                   className='w-full pr-4 py-3  border-b border-solid border-[#0066ff61] focus:outline-none
//                   focus:border-b-primaryColor  text-[16px] leading-7 text-headingColor 
//                   placeholder:text-textColor rounded-md cursor-pointer '
//                   required/>
//               </div>
//               <div className='mb-5'>
//                 <input 
//                   type='email' 
//                   placeholder='Enter Your Email' 
//                   name='email' 
//                   value=''
//                   onChange='' 
//                   className='w-full pr-4 py-3  border-b border-solid border-[#0066ff61] focus:outline-none
//                   focus:border-b-primaryColor  text-[16px] leading-7 text-headingColor 
//                   placeholder:text-textColor rounded-md cursor-pointer '
//                   required/>
//               </div>
//               <div className='mb-5'>
//                 <input 
//                     type='password' 
//                     placeholder='Password' 
//                     name='password' 
//                     value=''
//                     onChange=''
//                     className='w-full pr-4 py-3  border-b border-solid border-[#0066ff61] focus:outline-none
//                     focus:border-b-primaryColor  text-[16px] leading-7 text-headingColor 
//                     placeholder:text-textColor rounded-md cursor-pointer '
//                     required/>
//               </div>
//               <div className='mb-5'>
//                 <input 
//                     type='phone' 
//                     placeholder='phone' 
//                     name='phone' 
//                     value=''
//                     onChange=''
//                     className='w-full pr-4 py-3  border-b border-solid border-[#0066ff61] focus:outline-none
//                     focus:border-b-primaryColor  text-[16px] leading-7 text-headingColor 
//                     placeholder:text-textColor rounded-md cursor-pointer '
//                     required/>
//               </div>
             
              
//               <div className='mb-5 flex items-center gap-3'>
//                 <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center'>
//                   <img src={avatar} alt='' className='w-full rounded-full'/>
//                 </figure>
//                 <div className='relative w-[130px] h-[50px]'>
//                   <input
//                     type="file"
//                     name="photo"
//                     id="customFile"
//                     onChange=''
//                     accept=".jpg,jpeg,png"
//                     className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
//                   />

//                   <label
//                     htmlFor='customFile'
//                     className='absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] 
//                     py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46]
//                     text-headingColor font-semibold rounded-lg truncate cursor-pointer'>
//                       Upload Photo
//                     </label>
                  
//                   <label htmlFor='customFile'></label>
//                 </div>
//               </div>
              
//               <div className='mt-7'>
//                 <button
//                   type='submit'
//                   className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'>
//                     SignUp
//                   </button>
//               </div>
//               <p className='mt-5 text-textColor text-center'>
//                 Already have an account?<Link to='/login' className='text-primaryColor font-medium ml-1'>Login</Link>
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default Signup