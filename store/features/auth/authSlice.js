import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from './authService';

initialState = {
  user: null,
  userRole: '',
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: {},
  signupSuccess: false
};

export const studentRegister = createAsyncThunk(
  'auth/studentRegister',
  async (studentData, thunkAPI) => {
    try {
      return await authService.studentRegister(studentData);
    } catch (error) {
      thunkAPI.rejectWithValue(authService.errorMessage(error));
    }
  },
);

export const studentLogin = createAsyncThunk(
  'auth/studentLogin',
  async (studentData, thunkAPI) => {
    try {
      return await authService.studentLogin(studentData);
    } catch (error) {
      thunkAPI.rejectWithValue(authService.errorMessage(error));
    }
  },
);

export const tutorLogin = createAsyncThunk(
  'auth/tutorLogin',
  async (tutorData, thunkAPI) => {
    try {
      return await authService.tutorLogin(tutorData);
    } catch (error) {
      thunkAPI.rejectWithValue(authService.errorMessage(error));
    }
  },
);

export const tutorRegister = createAsyncThunk(
  'auth/tutorRegister',
  async (tutorData, thunkAPI) => {
    try {
      return await authService.tutorRegister(tutorData);
    } catch (error) {
      thunkAPI.rejectWithValue(authService.errorMessage(error));
    }
  },
);

export const getUserInfoStorage = createAsyncThunk(
  'auth/useStorage',
  async (_, thunkAPI) => {
    try {
      return await authService.userInfoStorage();
    } catch (error) {
      thunkAPI.rejectWithValue(authService.errorMessage(error));
    }
  },
);

export const updateUserDeviceToken = createAsyncThunk(
  'auth/updateDeviceToken',
  async (fcmToken, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth?.user?.token?.token;
      const user = thunkAPI.getState().auth?.user;
      return await authService.updateDeviceToken({ user, fcmToken }, token);
    } catch (error) {
      thunkAPI.rejectWithValue(authService.errorMessage(error));
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: state => {
      state.signupSuccess = false;
      state = initialState;
    },
    logout: state => {
      state.user = null;
      authService.logoutUser();
    },
    tutorLoginSuccess: (state, action) => {
      state.user = action.payload;
      state.userRole = action.payload.userRole;
    },
    studentLoginSuccess: (state, action) => {
      state.user = action.payload;
      state.userRole = action.payload.type;
    }
    // getUserInfoStorage: state => {
    //   const userdataValue = authService.userInfoStorage();
    //   state.user = userdataValue;
    // },
  },
  extraReducers: builder => {
    builder
      .addCase(studentRegister.pending, state => {
        state.isLoading = true;
      })
      .addCase(studentRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.signupSuccess = true;
      })
      .addCase(studentRegister.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(tutorRegister.pending, state => {
        state.isLoading = true;
      })
      .addCase(tutorRegister.fulfilled, (state, action) => {
        // state.user = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
        state.signupSuccess = true;
      })
      .addCase(tutorRegister.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(tutorLogin.pending, state => {
        state.isLoading = true;
      })
      .addCase(tutorLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.userRole = 'tutor';
        state.isSuccess = true;
      })
      .addCase(tutorLogin.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(studentLogin.pending, state => {
        state.isLoading = true;
      })
      .addCase(studentLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.userRole = 'student';
        state.isSuccess = true;
      })
      .addCase(studentLogin.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(updateUserDeviceToken.pending, state => {
        // state.isLoading = true;
      })
      .addCase(updateUserDeviceToken.fulfilled, (state, action) => {
        // state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateUserDeviceToken.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUserInfoStorage.pending, state => {
        state.isLoading = true;
      })
      .addCase(getUserInfoStorage.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
        state.userRole = action?.payload?.userRole;
      })
      .addCase(getUserInfoStorage.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export const { reset, logout, tutorLoginSuccess, studentLoginSuccess } = authSlice.actions;
export default authSlice.reducer;
