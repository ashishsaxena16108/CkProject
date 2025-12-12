import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogin:localStorage.getItem('isLogin') && localStorage.getItem('isLogin') === 'true',
    user:localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
};
const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state,action)=>{
           localStorage.setItem('isLogin',true);
           localStorage.setItem('user',JSON.stringify(action.payload.user));
           state.isLogin=action.payload.isLogin;
           state.user=action.payload.user;
        },
        logout:(state)=>{
           localStorage.clear();
           state.isLogin=false;
           state.user={};
        }
    },
 });

 export const {login,logout} = authSlice.actions;
 export default authSlice.reducer;
