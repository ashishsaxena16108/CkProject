import { configureStore } from "@reduxjs/toolkit";
import auth from "./feature/authReducer";
import load from "./feature/loadReducer";
import accounts from "./feature/accountReducer";

const store = configureStore({
    reducer:{auth,load,accounts},
});

export default store;