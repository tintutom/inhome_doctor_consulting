// import { createSlice } from "@reduxjs/toolkit";

// const usernameSlice = createSlice({
//     name:"username",
//     initialState:"",
//     reducers:{
//         change:(state,action)=>{
//             return action.payload;
//         },
//     },
// });
// export const { change } = usernameSlice.actions;
// export default usernameSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const usernameSlice = createSlice({
    name: "username",
    initialState: { id: "null", username: "" },
    reducers: {
        change: (state, action) => {
            return { id: state.id, username: action.payload };
        },
        setId: (state, action) => {
            return { id: action.payload, username: state.username };
        },
        setUserNameAndId: (state, action) => {
            const { id, username } = action.payload;
            return { id, username };
        },
        logout: (state) => {
            return { id: null, username: null };
        },
    },
});

export const { change, setId, setUserNameAndId, logout } = usernameSlice.actions;
export default usernameSlice.reducer;