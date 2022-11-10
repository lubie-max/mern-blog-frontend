import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice"
import blogPostReducer from "./Slices/postSlice" 
const store= configureStore({
    reducer: {
    auth : authReducer, 
    posts : blogPostReducer,
    }
})

export default store ;