import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import dashboardReducer from '../features/dashboard/dashboardSlice';
import workoutLogsReducer from '../features/workoutLogs/workoutLogsSlice';

// Define the initial state
const initialState = {
  user: {}, // Initialize with an empty object
  
};

// Create the Redux store with the initial state and reducers
export const store = configureStore({
  reducer: {
    user: userReducer,
    dashboard: dashboardReducer,
    workoutLogs: workoutLogsReducer,
  },
  preloadedState: initialState, 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(),
});
