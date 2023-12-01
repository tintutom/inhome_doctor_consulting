// // import React, { useState } from 'react'
// // import signupImg from '../assets/images/signup.gif';
// // import avatar from '../assets/images/doctor-img01.png';
// // import { Link } from 'react-router-dom';

// import React, { useState } from 'react';
// import signupImg from '../../assets/images/signup.gif';
// // import avatar from '../assets/images/doctor-img01.png';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from '../../utils/axios';
// import toast from 'react-hot-toast';
// import { hospitalSignup } from '../../utils/Constants';

// function DoctorRegister() {
//   const [name, setName] = useState("");
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [admin_position, setPosition] = useState("");
//   const [specialization, setSpecialization] = useState("");
//   const [password, setPassword] = useState("");
//   const [nameError, setNameError] = useState("");
//   const [adminError, setAdminError] = useState("");
//   const [positionError, setPositionError] = useState("");
//   const [numberError, setNumberError] = useState("");
//   const [usernameError, setUsernameError] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [descriptionError, setDescriptionError] = useState("");
//   const [description, setDescription] = useState("");
  
//   const [image, setImage] = useState(null); // Add state for image file
//   const [imageError, setImageError] = useState(""); // Add state for image error

//   const navigate = useNavigate();


//   // const { doctorId } = useParams();

//   const handleSubmit = (e) => {
//     if (
//       nameError ||
//       emailError ||
//       numberError ||
//       passwordError ||
//       descriptionError ||
//       adminError ||
//       positionError
//     ) {
//       toast.error("Please fix details correctly.", {
//         autoClose: 20000,
//       });
//       return;
//     }
//     if (
//       !name ||
//       !email ||
//       !phone ||
//       !password ||
//       !specialization ||
//       !description ||
//       !admin_position
//     ) {
//       toast.error("Please fill all the required fields.", {
//         autoClose: 20000,
//       });
//       return;
//     }
//     const data = JSON.stringify({
//       name,
//       username,
//       email,
//       phone,
//       admin_position,
//       specialization,
//       description,
//       password,
//       image
//     });
    
//     e.preventDefault();

//     // Perform image-related validation
//     if (imageError) {
//       toast.error(imageError, {
//         autoClose: 20000,
//       });
//       return;
//     }
//     // const apiUrl = `http://localhost:8000/doctors/${doctorId}`;
//     // console.log("Request URL:", apiUrl);

//     console.log("Request URL:", DoctorRegister);
//     console.log("Request Data:", data);

    
//     axios
//       .post(hospitalSignup, data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       })
//       .then((response) => {

//         toast.success("Registered succesfully.You can login when admin approve your account", {
//           autoClose: 40000,
//         });

//         navigate("/hospital/login");
//       })
//       .catch((error) => {
//         console.error("Axios Error:", error);
//       });
//   };

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//     if (!/^[A-Za-z ]{4,}$/.test(e.target.value)) {
//       setNameError("Must contain at least 3 letters and no numbers");
//     } else {
//       setNameError("");
//     }
//   };
//   const handleUserameChange = (e) => {
//     setUsername(e.target.value);
//     if (!/^[A-Za-z][A-Za-z0-9_]{4,10}$/.test(e.target.value)) {
//       setUsernameError("Must min 4 and max 10 letter");
//     } else {
//       setUsernameError("");
//     }
//   };
//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//     if (!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(e.target.value)) {
//       setEmailError("Email is not valid");
//     } else {
//       setEmailError("");
//     }
//   };
 
//   const handlePositionChange = (e) => {
//     setPosition(e.target.value);
//     if (!/^[A-Za-z]{4,}$/.test(e.target.value)) {
//       setPositionError("Must contain at least 3 letters and no numbers");
//     } else {
//       setPositionError("");
//     }
//   };

//   const handleNumberChange = (e) => {
//     setPhone(e.target.value);
//     if (!/^\d{10}$/.test(e.target.value)) {
//       setNumberError("Phone Number is not valid");
//     } else {
//       setNumberError("");
//     }
//   };
  
//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//     if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/.test(e.target.value)) {
//       setPasswordError(
//         "Password length must be 5 with letter only and 1 number"
//       );
//     } else {
//       setPasswordError("");
//     }
//   };
//   const handleDescriptionChange = (e) => {
//     setDescription(e.target.value);
//     if (!/^[A-Za-z ]{10,}$/.test(e.target.value)) {
//       setDescriptionError("Must contain at least 10 letters and no numbers");
//     } else {
//       setDescriptionError("");
//     }
//   };
//   const handleSpecializationChange = (e) => {
//     setSpecialization(e.target.value);
    
//   };

//   const handleFileInputChange = (e) => {
//     const file = e.target.files[0];
//     console.log("Selected File:", file);

//     setImage(file);
//     if (!file) {
//       setImageError("Please select an image");
//     } else if (!file.type.startsWith("image/")) {
//       setImageError("Invalid file type. Please select an image.");
//     } else if (file.size > 5242880) { // 5MB limit (you can adjust this)
//       setImageError("File size exceeds the limit. Please select a smaller image.");
//     } else {
//       setImageError("");
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
//             <form onSubmit={handleSubmit}>
//               <div className='mb-5'>
//                 <input
//                   type='text'
//                   placeholder='Full Name'
//                   name='name'
//                   value={name}
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
//                   value={email}
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
//                   type='text'
//                   placeholder='UserName'
//                   name='username'
//                   value={username}
//                   onChange={handleUserameChange}
//                   className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
//                   focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
//                   placeholder:text-textColor rounded-md cursor-pointer '
//                   required
//                 />
//                 <span className='text-danger'>{usernameError}</span>
//               </div>
//               <div className='mb-5'>
//                 <input
//                   type='text'
//                   placeholder='Mobile Number'
//                   name='phone'
//                   value={phone}
//                   onChange={handleNumberChange}
//                   className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
//                   focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
//                   placeholder:text-textColor rounded-md cursor-pointer '
//                   required
//                 />
//                 <span className='text-danger'>{numberError}</span>
//               </div>
//               <div className='mb-5'>
//                 <input
//                   type='password'
//                   placeholder='Password'
//                   name='password'
//                   value={password}
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
//                   placeholder='Admin Positon'
//                   name='admin_position'
//                   value={admin_position}
//                   onChange={handlePositionChange}
//                   className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
//                   focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
//                   placeholder:text-textColor rounded-md cursor-pointer '
//                   required
//                 />
//                 <span className='text-danger'>{positionError}</span>
//               </div>
//               <div className='mb-5'>
//                 <input
//                   type='text'
//                   placeholder='specialization'
//                   name='specialization'
//                   value={specialization}
//                   onChange={handleSpecializationChange}
//                   className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
//                   focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
//                   placeholder:text-textColor rounded-md cursor-pointer '
//                   required
//                 />
//                 {/* <span className='text-danger'>{specializationError}</span> */}
//               </div>
//               <div className='mb-5'>
//                 <input
//                   type='text'
//                   placeholder='Description'
//                   name='description'
//                   value={description}
//                   onChange={handleDescriptionChange}
//                   className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
//                   focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
//                   placeholder:text-textColor rounded-md cursor-pointer '
//                   required
//                 />
//                 <span className='text-danger'>{descriptionError}</span>
//               </div>
//               <div className='mb-5 flex items-center gap-3'>
//                 <input
//                   type='file'
//                   name='image'
//                   id='customFile'
//                   onChange={handleFileInputChange}
//                   accept='.jpg, .jpeg, .png'
//                   className='opacity-0 cursor-pointer'
//                 />
//                 <label
//                   htmlFor='customFile'
//                   className='flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46]
//                     text-headingColor font-semibold rounded-lg truncate cursor-pointer'>
//                   {image ? image.name : "Upload Photo"}
//                 </label>
//               </div>

              
//               {/* <div className='mb-5 flex items-center gap-3'>
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
//               </div> */}
//               <div className='mt-7'>
//                 <button
//                   type='submit'
//                   className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'
//                 >
//                   SignUp
//                 </button>
//               </div>
//               <p className='mt-5 text-textColor text-center'>
//                 Already have an account?<Link to='/hospital/login' className='text-primaryColor font-medium ml-1'>
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

// export default DoctorRegister;


// import React, { useState } from 'react'
// import signupImg from '../assets/images/signup.gif';
// import avatar from '../assets/images/doctor-img01.png';
// import { Link } from 'react-router-dom';

import React, { useState } from 'react';
import signupImg from '../../assets/images/signup.gif';
// import avatar from '../assets/images/doctor-img01.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';
import toast from 'react-hot-toast';
import { hospitalSignup } from '../../utils/Constants';

function DoctorRegister() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [admin_position, setPosition] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [adminError, setAdminError] = useState("");
  const [positionError, setPositionError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [description, setDescription] = useState("");
  
  const [image, setImage] = useState(null); // Add state for image file
  const [imageError, setImageError] = useState(""); // Add state for image error

  const navigate = useNavigate();


  // const { doctorId } = useParams();

  const handleSubmit = (e) => {
    if (
      nameError ||
      emailError ||
      numberError ||
      passwordError ||
      descriptionError ||
      adminError ||
      positionError
    ) {
      toast.error("Please fix details correctly.", {
        autoClose: 20000,
      });
      return;
    }
    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !specialization ||
      !description ||
      !admin_position
    ) {
      toast.error("Please fill all the required fields.", {
        autoClose: 20000,
      });
      return;
    }
    const data = JSON.stringify({
      name,
      username,
      email,
      phone,
      admin_position,
      specialization,
      description,
      password,
      image
    });
    
    e.preventDefault();

    // Perform image-related validation
    if (imageError) {
      toast.error(imageError, {
        autoClose: 20000,
      });
      return;
    }
    // const apiUrl = `http://localhost:8000/doctors/${doctorId}`;
    // console.log("Request URL:", apiUrl);

    console.log("Request URL:", DoctorRegister);
    console.log("Request Data:", data);

    
    axios
      .post(hospitalSignup, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {

        toast.success("Registered succesfully.You can login when admin approve your account", {
          autoClose: 40000,
        });

        navigate("/hospital/login");
      })
      .catch((error) => {
        console.error("Axios Error:", error);
      });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (!/^[A-Za-z ]{4,}$/.test(e.target.value)) {
      setNameError("Must contain at least 3 letters and no numbers");
    } else {
      setNameError("");
    }
  };
  const handleUserameChange = (e) => {
    setUsername(e.target.value);
    if (!/^[A-Za-z][A-Za-z0-9_]{4,10}$/.test(e.target.value)) {
      setUsernameError("Must min 4 and max 10 letter");
    } else {
      setUsernameError("");
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
 
  const handlePositionChange = (e) => {
    setPosition(e.target.value);
    if (!/^[A-Za-z]{4,}$/.test(e.target.value)) {
      setPositionError("Must contain at least 3 letters and no numbers");
    } else {
      setPositionError("");
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
      setPasswordError(
        "Password length must be 5 with letter only and 1 number"
      );
    } else {
      setPasswordError("");
    }
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    if (!/^[A-Za-z ]{10,}$/.test(e.target.value)) {
      setDescriptionError("Must contain at least 10 letters and no numbers");
    } else {
      setDescriptionError("");
    }
  };
  const handleSpecializationChange = (e) => {
    setSpecialization(e.target.value);
    
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected File:", file);

    setImage(file);
    if (!file) {
      setImageError("Please select an image");
    } else if (!file.type.startsWith("image/")) {
      setImageError("Invalid file type. Please select an image.");
    } else if (file.size > 5242880) { // 5MB limit (you can adjust this)
      setImageError("File size exceeds the limit. Please select a smaller image.");
    } else {
      setImageError("");
    }
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
                  type='text'
                  placeholder='UserName'
                  name='username'
                  value={username}
                  onChange={handleUserameChange}
                  className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
                  focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
                  placeholder:text-textColor rounded-md cursor-pointer '
                  required
                />
                <span className='text-danger'>{usernameError}</span>
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
                <span className='text-danger'>{numberError}</span>
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
                  placeholder='Admin Positon'
                  name='admin_position'
                  value={admin_position}
                  onChange={handlePositionChange}
                  className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
                  focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
                  placeholder:text-textColor rounded-md cursor-pointer '
                  required
                />
                <span className='text-danger'>{positionError}</span>
              </div>
              <div className='mb-5'>
                <input
                  type='text'
                  placeholder='specialization'
                  name='specialization'
                  value={specialization}
                  onChange={handleSpecializationChange}
                  className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
                  focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
                  placeholder:text-textColor rounded-md cursor-pointer '
                  required
                />
                {/* <span className='text-danger'>{specializationError}</span> */}
              </div>
              <div className='mb-5'>
                <input
                  type='text'
                  placeholder='Description'
                  name='description'
                  value={description}
                  onChange={handleDescriptionChange}
                  className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
                  focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
                  placeholder:text-textColor rounded-md cursor-pointer '
                  required
                />
                <span className='text-danger'>{descriptionError}</span>
              </div>
              <div className='mb-5 flex items-center gap-3'>
                <input
                  type='file'
                  name='image'
                  id='customFile'
                  onChange={handleFileInputChange}
                  accept='.jpg, .jpeg, .png'
                  className='opacity-0 cursor-pointer'
                />
                <label
                  htmlFor='customFile'
                  className='flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46]
                    text-headingColor font-semibold rounded-lg truncate cursor-pointer'>
                  {image ? image.name : "Upload Photo"}
                </label>
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
                Already have an account?<Link to='/hospital/login' className='text-primaryColor font-medium ml-1'>
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

export default DoctorRegister;