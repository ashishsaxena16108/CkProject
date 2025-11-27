import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogin:localStorage.getItem('isLogin') === 'true',
    role:'admin',
};
const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state,action)=>{
           localStorage.setItem('isLogin',true);
           state.isLogin=action.payload.isLogin;
           state.role=action.payload.role;
        },
        logout:(state)=>{
           localStorage.removeItem('isLogin');
           state.isLogin=false;
        }
    },
 });

 export const {login,logout} = authSlice.actions;
 export default authSlice.reducer;
