import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';



// Async thunk for fetching community posts
export const fetchCommunityPost = createAsyncThunk('communityPosts/fetchCommunityPosts', async () => {
  const response = await axios.get('http://localhost:3000/api/communityposts');
  return response.data;
});

// Async thunk for creating a new community post
export const createCommunityPost = createAsyncThunk('communityPosts/createCommunityPost', async (postData) => {
  const response = await axios.post('http://localhost:3000/api/communityposts', postData);
  return response.data;
});

// Async thunk for updating a community post
export const updateCommunityPost = createAsyncThunk('communityPosts/updateCommunityPost', async ({ id, postData }) => {
  const response = await axios.put(`http://localhost:3000/api/communityposts/${id}`, postData);
  return response.data;
});

// Async thunk for deleting a community post
export const deleteCommunityPost = createAsyncThunk('communityPosts/deleteCommunityPost', async (id) => {
  await axios.delete(`http://localhost:3000/api/communityposts/${id}`);
  return id;
});

const communityPostSlice = createSlice({
  name: 'communityPost',
  initialState: { posts: [], status: 'idle', error: null },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCommunityPost.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.status = 'succeeded';
      })
      .addCase(createCommunityPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(updateCommunityPost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(post => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(deleteCommunityPost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(post => post.id !== action.payload);
      });
  },
});

export default communityPostSlice.reducer;
