import {combineReducers} from "redux";
import userReducer from "./features/users/userSlice";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
	user: userReducer,
});

export default configureStore({
	reducer: rootReducer
});