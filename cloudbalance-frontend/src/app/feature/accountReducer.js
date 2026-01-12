import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    accounts:[],
    startDate:'',
    endDate:''
}

const accountSlice = createSlice({
    name:'accounts',
    initialState,
    reducers:{
        setaccounts:(state,action)=>{
            state.accounts=action.payload;
        },
        setdates:(state,action)=>{
            state.startDate=action.payload.startDate;
            state.endDate=action.payload.endDate;
        }
    }
})

export const {setaccounts,setdates} = accountSlice.actions;

export default accountSlice.reducer;
