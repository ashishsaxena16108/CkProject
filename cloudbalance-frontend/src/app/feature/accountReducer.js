import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    costaccounts:[],
    resourceaccounts:[]
}

const accountSlice = createSlice({
    name:'accounts',
    initialState,
    reducers:{
        setcostaccount:(state,action)=>{
            state.costaccounts=action.payload;
        },
        addcostAccount:(state,action)=>{
           state.costaccounts=[...state.costaccounts,action.payload.account];
        },
        removecostAccount:(state,action)=>{
            state.costaccounts=state.costaccounts.filter((a)=>a!==action.payload.accountId);
        },
        addresourceAccount:(state,action)=>{
            state.resourceaccounts=[...state.resourceaccounts,action.payload.account];
        },
        removeresourceAccount:(state,action)=>{
            state.resourceaccounts=state.resourceaccounts.filter((a=>a!==action.payload.accountId));
        }
    }
})

export const {setcostaccount,addcostAccount,removecostAccount,addresourceAccount,removeresourceAccount} = accountSlice.actions;

export default accountSlice.reducer;
