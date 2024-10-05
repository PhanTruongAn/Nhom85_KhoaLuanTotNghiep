import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../apis/authApi";
import { toast } from "react-toastify";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: {},
  group: {},
};
22;

const fetchToken = createAsyncThunk("/fetch-token", async () => {
  try {
    const result = await authApi.fetchToken();
    if (result && result.status === 0) {
      return result.data;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    throw error;
  }
});
const userSlice = createSlice({
  name: "userInit",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    setGroup: (state, action) => {
      state.isAuthenticated = true;
      state.group = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchToken.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(fetchToken.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.user = {};
      });
  },
});
export const { setUser, setGroup } = userSlice.actions;
export { fetchToken };
export default userSlice.reducer;
