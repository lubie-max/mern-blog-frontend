import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

// api calls
//login
// https://geeksblog-backend.onrender.com 
export const userLogin = createAsyncThunk(
    'userLogin',
    async (loginData)=>{
        const response = await axios({
            method: "post",
            url : `https://geeksblog-backend.onrender.com/api/users/login/`,
            data : loginData
        })
        const data = await response.data;
        
        localStorage.setItem("userId",data.message._id)
        return data ;
    }
)


export const userLogout = createAsyncThunk(
    'userLogout',
    async ()=>{
        const response = await "Logged Out"
        console.log(response)
        return response
    }
)
//signup

export const userSignUp = createAsyncThunk(
    'userSignup',
    async (signUpData) => {
        const response = await axios({
            method: "post",
            url:`https://geeksblog-backend.onrender.com/api/users/signup/`,
            data: signUpData
        })
        const data = await response.data
        console.log(data)
        return data
    }
)



//slices

export const authSlice = createSlice({
    name: "auth",
    initialState:{
        isLoggedIn: false
    },
    extraReducers :{
        [userLogin.pending]:(state)=>{
            state.isLoggedIn =false
        },
        [userLogin.fulfilled]: (state, action)=>{
            state.isLoggedIn =true
        },
        [userLogin.rejected]: (state, action)=>{
            state.isLoggedIn = false
        },

        // signup 
        [userSignUp.fulfilled]: (state, action)=>{
            state.isLoggedIn = false
        },

        //logout
        [userLogout.fulfilled]: (state, action)=>{
            state.isLoggedIn = false
        },


    }
})

export default authSlice.reducer