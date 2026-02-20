import { configureStore } from '@reduxjs/toolkit';
import userReducer from './organization/organizationSlice';
import upiReducer from './cashFree/cashFreeSlice';
import canbanReducer from "./canban/canbanSlice";
import subTaskReducer from "./subTask/subTaskSlice"
import commentReducer from "./comment/commentSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    Upi: upiReducer,
    task: canbanReducer,
    subTask: subTaskReducer,
    comment: commentReducer,
  },
});
