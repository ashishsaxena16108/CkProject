import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isLoading:true,
};

const loadSlice = createSlice({
    name:'load',
    initialState,
    reducers:{
       showLoader:(state)=>{
          state.isLoading=true;
       },
       hideLoader:(state)=>{
        state.isLoading=false;
       }
    }
});

export const {showLoader,hideLoader} = loadSlice.actions;

export default loadSlice.reducer;