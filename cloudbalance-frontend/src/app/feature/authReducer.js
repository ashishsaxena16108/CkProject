import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogin:localStorage.getItem('isLogin') === 'true',
    user:{},
};
const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state,action)=>{
           localStorage.setItem('isLogin',true);
           state.isLogin=action.payload.isLogin;
           state.user=action.payload.user;
        },
        logout:(state)=>{
           localStorage.removeItem('isLogin');
           state.isLogin=false;
           state.user={};
        }
    },
 });

 export const {login,logout} = authSlice.actions;
 export default authSlice.reducer;
