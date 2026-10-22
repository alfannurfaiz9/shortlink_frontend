import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clearToken } from "./authSlice";
import { upperCaseResponse } from "../../utils";

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

export const createLink = createAsyncThunk(
  "create_link",
  async (payload, { getState, dispatch, rejectWithValue }) => {
    const token = getState().authState.auth.token;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/links`, {
        method: "POST",
        body: JSON.stringify(payload.body),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (response.status === 401) {
        dispatch(clearToken());
      }
      if (!response.ok) {
        throw { data, setErr: payload.setErr };
      }

      return { data, next: payload.next };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteLink = createAsyncThunk(
  "delete_link",
  async (payload, { dispatch, getState, rejectWithValue }) => {
    const token = getState().authState.auth.token;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/links/${payload.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();

      if (response.status === 401) {
        dispatch(clearToken());
      }
      if (!response.ok) {
        throw { data, setErr: payload.setErr };
      }

      dispatch(getUserLink());

      return { data, next: payload.next };
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
    return builder
      .addAsyncThunk(getUserLink, {
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
      })
      .addAsyncThunk(createLink, {
        pending: (state) => {
          state.isPending = true;
          state.isFulfilled = false;
          state.isRejected = false;
        },
        fulfilled: (state, { payload }) => {
          state.isPending = false;
          state.isFulfilled = true;
          if (payload.next) {
            payload.next(upperCaseResponse(payload.data));
          }
        },
        rejected: (state, { payload }) => {
          state.isPending = true;
          state.isRejected = false;
          if (payload.setErr) {
            payload.setErr(upperCaseResponse(payload.data));
          }
        },
      })
      .addAsyncThunk(deleteLink, {
        pending: (state) => {
          state.isPending = true;
          state.isFulfilled = false;
          state.isRejected = false;
        },
        fulfilled: (state, { payload }) => {
          state.isPending = false;
          state.isFulfilled = true;
          if (payload.next) {
            payload.next(upperCaseResponse(payload.data));
          }
        },
        rejected: (state, { payload }) => {
          state.isPending = true;
          state.isRejected = false;
          if (payload.setErr) {
            payload.setErr(upperCaseResponse(payload.data));
          }
        },
      });
  },
});

export default userSlice.reducer;
