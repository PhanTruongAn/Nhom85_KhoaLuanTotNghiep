import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../apis/authApi";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: {},
  group: {},
  topic: {},
  terms: [],
  currentTerm: {},
  majors: [],
  notes: [],
  lecturers: [],
};
22;

const fetchToken = createAsyncThunk("/fetch-token", async () => {
  const result = await authApi.fetchToken();
  if (result && result.status === 0) {
    return result.data;
  } else {
    throw new Error(result.message);
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
      state.group = action.payload;
    },
    setMyTopic: (state, action) => {
      state.topic = action.payload;
    },
    setTerms: (state, action) => {
      state.terms = action.payload;
    },
    setCurrentTerm: (state, action) => {
      state.currentTerm = action.payload;
    },
    setMajors: (state, action) => {
      state.majors = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setLecturers: (state, action) => {
      state.lecturers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchToken.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(fetchToken.rejected, (state) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.user = {};
      });
  },
});
export const {
  setUser,
  setGroup,
  setMyTopic,
  setTerms,
  setCurrentTerm,
  setMajors,
  setNotes,
  setLecturers,
} = userSlice.actions;
export { fetchToken };
export default userSlice.reducer;
