import { configureStore } from '@reduxjs/toolkit';
import userReducer from './organization/organizationSlice';
import upiReducer from './cashFree/cashFreeSlice';
import canbanTasks from './canban/canbanSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        Upi: upiReducer,
        task: canbanTasks
    }
});
