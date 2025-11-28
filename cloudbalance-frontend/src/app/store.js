import { configureStore } from "@reduxjs/toolkit";
import auth from "./feature/authReducer";
import load from "./feature/loadReducer";

const store = configureStore({
    reducer:{auth,load},
});

export default store;