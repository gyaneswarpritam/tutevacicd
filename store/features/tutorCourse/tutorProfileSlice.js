import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import tutorProfileService from './tutorProfileService';

const initialState = {
  profile: null,
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: '',
};

//updat Password
export const updateTutorPassword = createAsyncThunk(
  `tutor/updatePassword`,
  async (updateData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth?.user?.token?.token;
      if (token) {
        return await tutorProfileService.updateTutorPassword(updateData, token);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(tutorProfileService.errorMessage(error));
    }
  },
);

//Tutor details by id
export const tutorDetails = createAsyncThunk(
  `tutor/tutorDetails`,
  async (_, thunkAPI) => {
    try {
      const userId = thunkAPI.getState().auth?.user?._id;
      const token = thunkAPI.getState().auth?.user?.token?.token;
      if (token) {
        return await tutorProfileService.getDetails(userId, token);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(tutorProfileService.errorMessage(error));
    }
  },
);

//Tutor Profile update by id
export const tutorProfileUpdate = createAsyncThunk(
  `tutor/tutorProfileUpdate`,
  async (updateData, thunkAPI) => {
    try {
      const userId = thunkAPI.getState().auth?.user?._id;
      const token = thunkAPI.getState().auth?.user?.token?.token;
      const reqData = {
        tutorId: userId,
        data: updateData
      }
      if (token) {
        return await tutorProfileService.updateTutor(reqData, token);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(tutorProfileService.errorMessage(error));
    }
  },
);

const tutorProfileSlice = createSlice({
  name: 'tutorProfile',
  initialState,
  reducers: {
    reset: state => {
      state = initialState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(updateTutorPassword.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateTutorPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
        state.isSuccess = true;
      })
      .addCase(updateTutorPassword.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(tutorDetails.pending, state => {
        state.isLoading = true;
      })
      .addCase(tutorDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
        state.isSuccess = true;
      })
      .addCase(tutorDetails.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(tutorProfileUpdate.pending, state => {
        state.isLoading = true;
      })
      .addCase(tutorProfileUpdate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
        state.isSuccess = true;
      })
      .addCase(tutorProfileUpdate.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export const { reset } = tutorProfileSlice.actions;
export default tutorProfileSlice.reducer;
