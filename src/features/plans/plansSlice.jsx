import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching plans
export const fetchPlans = createAsyncThunk('plans/fetchPlans', async () => {
  const response = await axios.get('http://localhost:3000/api/plans');
  return response.data;
});

// Async thunk for creating a new plan
export const createPlan = createAsyncThunk('plans/createPlan', async (planData) => {
  const response = await axios.post('http://localhost:3000/api/plans', planData);
  return response.data;
});

// Async thunk for updating a plan
export const updatePlan = createAsyncThunk('plans/updatePlan', async ({ id, planData }) => {
  const response = await axios.put(`http://localhost:3000/api/plans/${id}`, planData);
  return response.data;
});

// Async thunk for deleting a plan
export const deletePlan = createAsyncThunk('plans/deletePlan', async (id) => {
  await axios.delete(`http://localhost:3000/api/plans/${id}`);
  return id;
});

const plansSlice = createSlice({
  name: 'plans',
  initialState: { plans: [], status: 'idle', error: null },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.plans = action.payload;
        state.status = 'succeeded';
      })
      .addCase(createPlan.fulfilled, (state, action) => {
        state.plans.push(action.payload);
      })
      .addCase(updatePlan.fulfilled, (state, action) => {
        const index = state.plans.findIndex(plan => plan.id === action.payload.id);
        if (index !== -1) {
          state.plans[index] = action.payload;
        }
      })
      .addCase(deletePlan.fulfilled, (state, action) => {
        state.plans = state.plans.filter(plan => plan.id !== action.payload);
      });
  },
});

export default plansSlice.reducer;
