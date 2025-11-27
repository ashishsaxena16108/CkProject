import { configureStore } from "@reduxjs/toolkit";
import auth from "./feature/authReducer";

const store = configureStore({
    reducer:{auth},
});

export default store;