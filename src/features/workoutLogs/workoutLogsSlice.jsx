import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const BASE_URL = 'http://localhost:3000/api/workoutLogs';
const token = localStorage.getItem('token'); 

export const fetchWorkoutLogs = createAsyncThunk('workoutLogs/fetchWorkoutLogs', async (_, { getState }) => {
    const { user } = getState().user;
    const response = await axios.get('http://localhost:3000/api/workoutLogs', {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    return response.data;
  });

export const createWorkoutLog = createAsyncThunk('workoutLogs/createWorkoutLog', async (logData) => {
  const response = await axios.post(BASE_URL, logData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

export const updateWorkoutLog = createAsyncThunk('workoutLogs/updateWorkoutLog', async ({ id, logData }) => {
  const response = await axios.put(`${BASE_URL}/${id}`, logData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

export const deleteWorkoutLog = createAsyncThunk('workoutLogs/deleteWorkoutLog', async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (error) {
      console.error("Error in deleteWorkoutLog:", error.response || error);
      return rejectWithValue(error.response.data);
    }
  });

const workoutLogsSlice = createSlice({
  name: 'workoutLogs',
  initialState: { logs: [], status: 'idle', error: null },
  reducers: {},
  extraReducers(builder) {
    builder
      // Handle fetch
      .addCase(fetchWorkoutLogs.fulfilled, (state, action) => {
        state.logs = action.payload;
      })
      // Handle create
      .addCase(createWorkoutLog.fulfilled, (state, action) => {
        state.logs.push(action.payload);
      })
      // Handle update
      .addCase(updateWorkoutLog.fulfilled, (state, action) => {
        const index = state.logs.findIndex(log => log.id === action.payload.id);
        if (index !== -1) {
          state.logs[index] = action.payload;
        }
      })
      // Handle delete
      .addCase(deleteWorkoutLog.fulfilled, (state, action) => {
        state.logs = state.logs.filter(log => log.id !== action.payload);
    });
  },
});

export default workoutLogsSlice.reducer;
