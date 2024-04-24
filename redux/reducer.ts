import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import formReducer from "./slices/formSlice";

const rootReducer = combineReducers({
  user: userReducer,
  formDetails: formReducer,
});

export default rootReducer;
