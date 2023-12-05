import { createSlice } from "@reduxjs/toolkit";

const emailSlice = createSlice({
  name: "email",
  initialState: "",
  reducers: {
    change: (state, action) => {
      return action.payload;
    },
  },
});

export const { change } = emailSlice.actions;

export default emailSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";

// const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     id: "",
//     name: "",
//   },
//   reducers: {
//     change: (state, action) => {
//       return {
//         ...state,
//         name: action.payload.name,
//         id: action.payload.id,
//       };
//     },
//   },
// });

// export const { change } = userSlice.actions;

// export default userSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";

// const emailSlice = createSlice({
//     name: "email",
//     initialState: { email:'' },
//     reducers: {
//         change: (state, action) => {
//             return {  email: action.payload };
//         },
        
//         setEmail: (state, action) => {
//             const { email } = action.payload;
//             return { email };
//         },
//         logout: (state) => {
//             return { email:null };
//         },
//     },
// });

// export const { change, setEmail, logout } = emailSlice.actions;
// export default emailSlice.reducer;

