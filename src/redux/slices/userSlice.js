import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clearToken } from "./authSlice";

const initialState = {
  user: null,
  links: null,
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  error: null,
};

export const getUserLink = createAsyncThunk(
  "get_user_link",
  async (_, { dispatch, getState, rejectWithValue }) => {
    const token = getState().authState.auth.token;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/links`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (response.status === 401) {
        return dispatch(clearToken());
      }
      if (!response.ok) {
        throw data;
      }

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    return builder.addAsyncThunk(getUserLink, {
      pending: (state) => {
        state.isPending = true;
        state.isFulfilled = false;
        state.isRejected = false;
      },
      fulfilled: (state, { payload }) => {
        state.isPending = false;
        state.isFulfilled = true;
        state.links = payload.result;
      },
      rejected: (state, { payload }) => {
        state.isPending = true;
        state.isRejected = false;
        state.error = payload.message;
      },
    });
  },
});

export default userSlice.reducer;
