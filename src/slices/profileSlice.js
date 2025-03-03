import { createSlice } from "@reduxjs/toolkit"
// import { useState } from "react";

const initialState={
    user:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null,
}

const profileSlice=createSlice({
    name:"profile",
    initialState:initialState,
    reducers:{
        setUser(state, action){
            state.token=action.payload;
        },
        
    }
})


export const {setUser}=profileSlice.actions;
export default profileSlice.reducer; 