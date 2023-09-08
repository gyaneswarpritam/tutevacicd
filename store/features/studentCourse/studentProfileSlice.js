import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import studentProfileService from './studentProfileService';

const initialState = {
  profile: null,
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: '',
};

//updat Password
export const updateStudentPassword = createAsyncThunk(
  `student/updatePassword`,
  async (updateData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth?.user?.token?.token;
      if (token) {
        return await studentProfileService.updateStudentPassword(
          updateData,
          token,
        );
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(studentProfileService.errorMessage(error));
    }
  },
);

//Student details by id
export const studentDetails = createAsyncThunk(
  `student/studentDetails`,
  async (_, thunkAPI) => {
    try {
      const userId = thunkAPI.getState().auth?.user?._id;
      const token = thunkAPI.getState().auth?.user?.token?.token;
      if (token) {
        return await studentProfileService.getDetails(userId, token);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(studentProfileService.errorMessage(error));
    }
  },
);

//Student Profile update by id
export const studentProfileUpdate = createAsyncThunk(
  `student/studentProfileUpdate`,
  async (updateData, thunkAPI) => {
    try {
      const userId = thunkAPI.getState().auth?.user?._id;
      const token = thunkAPI.getState().auth?.user?.token?.token;
      const reqData = {
        studentId: userId,
        data: updateData
      }
      if (token) {
        return await studentProfileService.updateStudent(reqData, token);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(studentProfileService.errorMessage(error));
    }
  },
);

const studentProfileSlice = createSlice({
  name: 'studentProfile',
  initialState,
  reducers: {
    reset: state => {
      state = initialState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(updateStudentPassword.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateStudentPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
        state.isSuccess = true;
      })
      .addCase(updateStudentPassword.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(studentDetails.pending, state => {
        state.isLoading = true;
      })
      .addCase(studentDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
        state.isSuccess = true;
      })
      .addCase(studentDetails.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(studentProfileUpdate.pending, state => {
        state.isLoading = true;
      })
      .addCase(studentProfileUpdate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
        state.isSuccess = true;
      })
      .addCase(studentProfileUpdate.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export const { reset } = studentProfileSlice.actions;
export default studentProfileSlice.reducer;
