import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../apis/userApi";
import { toast } from "react-toastify";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: {},
};
22;

const fetchToken = createAsyncThunk("/fetch-token", async () => {
  try {
    const result = await userApi.fetchToken();
    if (result && result.status === 0) {
      return result.data;
    } else {
      toast.error(result.message);
      throw new Error(result.message);
    }
  } catch (error) {
    throw error;
  }
});
const userSlice = createSlice({
  name: "userInit",
  initialState,
  reducers: {},
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
export { fetchToken };
export default userSlice.reducer;
