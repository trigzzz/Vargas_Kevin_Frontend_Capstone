import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import dashboardReducer from '../features/dashboard/dashboardSlice';
import workoutLogsReducer from '../features/workoutLogs/workoutLogsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    dashboard: dashboardReducer,
    workoutLogs: workoutLogsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});
