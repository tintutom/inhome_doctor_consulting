import { configureStore } from "@reduxjs/toolkit";

import emailReducer from "./emailReducer";
import usernameReducer from "./usernameReducer";

const store = configureStore({
    reducer:{
        email : emailReducer,
        username : usernameReducer,
        

    }
})

export default store;