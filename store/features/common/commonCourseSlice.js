import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import commonCourseService from './commonCourseService';

const initialState = {
  courses: null,
  courseNameList: [],
  coursePages: 0,
  coureseDetails: null,
  levels: null,
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: '',
};


//Get course name List
export const courseNames = createAsyncThunk(
  `course/courseNames`,
  async (_, thunkAPI) => {
    try {
      return await commonCourseService.getCourseNameList();
    } catch (error) {
      return thunkAPI.rejectWithValue(commonCourseService.errorMessage(error));
    }
  },
);
//Get Course List
export const courseList = createAsyncThunk(
  `course/courseStudentList`,
  async (data, thunkAPI) => {
    try {
      return await commonCourseService.getCourseList(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(commonCourseService.errorMessage(error));
    }
  },
);


//Get Course Details
export const courseDetails = createAsyncThunk(
  `course/courseDetails`,
  async (id, thunkAPI) => {
    try {
      return await commonCourseService.getCourseDetails(id, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(commonCourseService.errorMessage(error));
    }
  },
);

//Get Course List By page
export const commonCourseListByPage = createAsyncThunk(
  `course/commonCourseListByPage`,
  async (data, thunkAPI) => {
    try {
      return await commonCourseService.getCourseListByParam(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(commonCourseService.errorMessage(error));
    }
  },
);

const commonCourseSlice = createSlice({
  name: 'commonCourse',
  initialState,
  reducers: {
    reset: state => {
      state = initialState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(courseList.pending, state => {
        state.isLoading = true;
      })
      .addCase(courseList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses = action.payload.data;
        state.coursePages = action.payload.totalPages;
        state.enrolledCourses = false;
        state.isSuccess = true;
      })
      .addCase(courseList.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(courseNames.pending, state => {
        // state.isLoading = true;
      })
      .addCase(courseNames.fulfilled, (state, action) => {
        // state.isLoading = false;
        state.courseNameList = action.payload.data;
        state.isSuccess = true;
      })
      .addCase(courseNames.rejected, (state, action) => {
        state.isError = true;
        // state.isLoading = false;
      })
      .addCase(commonCourseListByPage.pending, state => {
        state.isIndicator = true;
      })
      .addCase(commonCourseListByPage.fulfilled, (state, action) => {
        state.isIndicator = false;
        state.courses = [].concat(state.courses, action.payload.data);
        state.coursePages = action.payload.totalPages;
        state.isSuccess = true;
      })
      .addCase(commonCourseListByPage.rejected, (state, action) => {
        state.isError = true;
        state.isIndicator = false;
      })
      .addCase(courseDetails.pending, state => {
        state.isLoading = true;
      })
      .addCase(courseDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.coureseDetails = action.payload;
        state.isSuccess = true;
      })
      .addCase(courseDetails.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export const { reset } = commonCourseSlice.actions;
export default commonCourseSlice.reducer;
