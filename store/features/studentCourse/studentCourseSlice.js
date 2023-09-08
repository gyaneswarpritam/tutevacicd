import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import studentCourseService from './studentCourseService';

const initialState = {
  courses: null,
  courseNameList: [],
  coursePages: 0,
  updatedCourse: null,
  coureseDetails: null,
  categories: null,
  searchedCourses: null,
  enrolledCourses: null,
  levels: null,
  notification: null,
  isSuccess: false,
  isError: false,
  isLoading: false,
  isIndicator: false,
  message: '',
};

//Get Level List
export const levelList = createAsyncThunk(
  `course/levelList`,
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth?.user?.token?.token;
      if (token) {
        return await studentCourseService.getLevelList({ data }, token);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(studentCourseService.errorMessage(error));
    }
  },
);

//Get course name List
export const courseNames = createAsyncThunk(
  `course/courseNames`,
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth?.user?.token?.token;
      if (token) {
        return await studentCourseService.getCourseNameList(token);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(studentCourseService.errorMessage(error));
    }
  },
);
//Get Course List
export const courseList = createAsyncThunk(
  `course/courseStudentList`,
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth?.user?.token?.token;
      const userId = thunkAPI.getState().auth?.user?._id;
      const location = thunkAPI.getState().auth?.user?.location;
      data['student'] = userId;
      if (data && data?.distance) {
        data['location'] = location;
      }
      if (token) {
        return await studentCourseService.getCourseList(data, token);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(studentCourseService.errorMessage(error));
    }
  },
);
//Get Course List
export const searchedCourseList = createAsyncThunk(
  `course/searchCourseList`,
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth?.user?.token?.token;
      if (token) {
        return await studentCourseService.getCourseList(data, token);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(studentCourseService.errorMessage(error));
    }
  },
);

//Enroll to course
export const enrollToCourse = createAsyncThunk(
  `course/enrollToCourse`,
  async (courseId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth?.user?.token?.token;
      const userId = thunkAPI.getState().auth?.user?._id;
      if (token) {
        return await studentCourseService.studentEnrollToCourse(
          { courseId, userId },
          token,
        );
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(studentCourseService.errorMessage(error));
    }
  },
);

//Add notification
export const addNotification = createAsyncThunk(
  `course/addNotification`,
  async ({ course, message }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth?.user?.token?.token;
      const userId = thunkAPI.getState().auth?.user?._id;
      if (token) {
        return await studentCourseService.addNotifications(
          { courseID: course?._id, tutorID: course?.tutorID, message, studentID: userId },
          token,
        );
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(studentCourseService.errorMessage(error));
    }
  },
);
//Add push notification
export const addPushNotification = createAsyncThunk(
  `course/addPushNotification`,
  async ({ device_token, title, message }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth?.user?.token?.token;
      const userId = thunkAPI.getState().auth?.user?._id;
      if (token) {
        return await studentCourseService.addPushNotifications(
          { device_token, title, message },
          token,
        );
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(studentCourseService.errorMessage(error));
    }
  },
);
//Get notification
export const getNotification = createAsyncThunk(
  `notification/getNotification`,
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth?.user?.token?.token;
      const userId = thunkAPI.getState().auth?.user?._id;
      if (token) {
        return await studentCourseService.getNotifications(
          { studentID: userId },
          token,
        );
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(studentCourseService.errorMessage(error));
    }
  },
);

//Get Course Details
export const courseDetails = createAsyncThunk(
  `course/courseDetails`,
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth?.user?.token?.token;
      if (token) {
        return await studentCourseService.getCourseDetails(id, token);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(studentCourseService.errorMessage(error));
    }
  },
);

//Get Course List By page
export const studentCourseListByPage = createAsyncThunk(
  `course/studentCourseListByPage`,
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth?.user?.token?.token;
      if (token) {
        return await studentCourseService.getCourseListByParam(token, data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(studentCourseService.errorMessage(error));
    }
  },
);

const studentCourseSlice = createSlice({
  name: 'studentCourse',
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
      .addCase(studentCourseListByPage.pending, state => {
        state.isIndicator = true;
      })
      .addCase(studentCourseListByPage.fulfilled, (state, action) => {
        state.isIndicator = false;
        state.courses = [].concat(state.courses, action.payload.data);
        state.coursePages = action.payload.totalPages;
        state.isSuccess = true;
      })
      .addCase(studentCourseListByPage.rejected, (state, action) => {
        state.isError = true;
        state.isIndicator = false;
      })
      .addCase(searchedCourseList.pending, state => {
        state.isLoading = true;
      })
      .addCase(searchedCourseList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchedCourses = action.payload;
        state.isSuccess = true;
      })
      .addCase(searchedCourseList.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
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
      })
      .addCase(levelList.pending, state => {
        state.isLoading = true;
      })
      .addCase(levelList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.levels = action.payload;
        state.isSuccess = true;
      })
      .addCase(levelList.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(enrollToCourse.pending, state => {
        state.isLoading = true;
      })
      .addCase(enrollToCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.enrolledCourses = true;
        state.isSuccess = true;
      })
      .addCase(enrollToCourse.rejected, (state, action) => {
        state.isError = true;
        state.enrolledCourses = false;
        state.isLoading = false;
      })
      .addCase(addNotification.pending, state => {
        // state.isLoading = true;
      })
      .addCase(addNotification.fulfilled, (state, action) => {
        state.isSuccess = true;
      })
      .addCase(addNotification.rejected, (state, action) => {
        state.isError = true;
      })
      .addCase(addPushNotification.pending, state => {
        // state.isLoading = true;
      })
      .addCase(addPushNotification.fulfilled, (state, action) => {
        state.isSuccess = true;
      })
      .addCase(addPushNotification.rejected, (state, action) => {
        state.isError = true;
      })
      .addCase(getNotification.pending, state => {
        // state.isLoading = true;
      })
      .addCase(getNotification.fulfilled, (state, action) => {
        state.notification = action.payload;
        state.isSuccess = true;
      })
      .addCase(getNotification.rejected, (state, action) => {
        state.isError = true;
      });
  },
});

export const { reset } = studentCourseSlice.actions;
export default studentCourseSlice.reducer;
