import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import tutorCourseService from './tutorCourseService';

const initialState = {
  courses: null,
  courseForm: null,
  createdCourse: null,
  updatedCourse: null,
  coureseDetails: null,
  selectedSlots: {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
  },
  categories: [],
  levels: [],
  notification: null,
  notifylist: [],
  upNextCourseList: [],
  upNextSliderList: [],
  upNextCoursePages: 0,
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: '',
};

//Get levelList List
export const levelList = createAsyncThunk(
  `level/levelList`,
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth?.user?.token?.token;
      if (token) {
        return await tutorCourseService.getlevelList({ data }, token);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(tutorCourseService.errorMessage(error));
    }
  },
);
//Get Course List
export const courseList = createAsyncThunk(
  `course/courseTutorList`,
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth?.user?.token?.token;
      if (token) {
        return await tutorCourseService.getCourseList(token);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(tutorCourseService.errorMessage(error));
    }
  },
);

//Get Course List
export const cronNotifylist = createAsyncThunk(
  `course/cronNotifylist`,
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth?.user?.token?.token;
      if (token) {
        const data = await tutorCourseService.getCronNotifylist(token);
        return data.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(tutorCourseService.errorMessage(error));
    }
  },
);

export const upNextCourses = createAsyncThunk(
  `course/upNextCourses`,
  async (userdata, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth?.user?.token?.token;
      if (token) {
        return await tutorCourseService.getUpNextCourses(token, {
          itemPerPage: userdata.itemPerPage,
          page: userdata.page,
        });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(tutorCourseService.errorMessage(error));
    }
  },
);

export const upNextSliderCourses = createAsyncThunk(
  `course/upNextSliderCourses`,
  async (userdata, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth?.user?.token?.token;
      if (token) {
        return await tutorCourseService.getUpNextCourses(token, {
          itemPerPage: userdata.itemPerPage,
          page: userdata.page,
        });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(tutorCourseService.errorMessage(error));
    }
  },
);

//Get Course List By page
export const courseListByPage = createAsyncThunk(
  `course/courseListByPage`,
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth?.user?.token?.token;
      if (token) {
        return await tutorCourseService.getCourseListByParam(token, data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(tutorCourseService.errorMessage(error));
    }
  },
);
//Get Course Details
export const tutorCourseDetails = createAsyncThunk(
  `course/tutorCourseDetails`,
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth?.user?.token?.token;
      if (token) {
        return await tutorCourseService.getCourseDetails(id, token);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(tutorCourseService.errorMessage(error));
    }
  },
);
//create Course
export const createCourse = createAsyncThunk(
  `course/createCourse`,
  async (createData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth?.user?.token?.token;
      if (token) {
        return await tutorCourseService.createCourseAPI(createData, token);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(tutorCourseService.errorMessage(error));
    }
  },
);
//updat Course
export const updateCourse = createAsyncThunk(
  `course/updateCourse`,
  async (updateData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth?.user?.token?.token;
      if (token) {
        return await tutorCourseService.updateCourseAPI(updateData, token);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(tutorCourseService.errorMessage(error));
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
        return await tutorCourseService.getNotifications(
          { tutorID: userId },
          token,
        );
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(tutorCourseService.errorMessage(error));
    }
  },
);

const tutorCourseSlice = createSlice({
  name: 'tutorCourse',
  initialState,
  reducers: {
    reset: state => {
      state = initialState;
    },
    courseFormCreate: (state, action) => {
      state.courseForm = action.payload
    },
    courseFormReset: (state) => {
      state.courseForm = null
    },
    updateSlots: (state, action) => {
      state.selectedSlots = { ...state.selectedSlots, ...action.payload };
    },
    clearSlots: state => {
      state.selectedSlots = {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: []
      };
    }
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
        state.isSuccess = true;
      })
      .addCase(courseList.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(courseListByPage.pending, state => {
        state.isLoading = true;
      })
      .addCase(courseListByPage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses = [].concat(state.courses, action.payload.data);
        state.coursePages = action.payload.totalPages;
        state.isSuccess = true;
      })
      .addCase(courseListByPage.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(createCourse.pending, state => {
        state.isLoading = true;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.createdCourse = action.payload;
        state.courses = [...state.courses, action.payload];
        state.isSuccess = true;
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(updateCourse.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.updatedCourse = action.payload;
        const update_obj = state.courses.findIndex(obj => obj._id == action.payload._id);
        state.courses[update_obj] = action.payload;
        // state.courses = [...state.courses, action.payload];
        state.isSuccess = true;
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(tutorCourseDetails.pending, state => {
        state.isLoading = true;
      })
      .addCase(tutorCourseDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.coureseDetails = action.payload;
        state.isSuccess = true;
      })
      .addCase(tutorCourseDetails.rejected, (state, action) => {
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
      .addCase(getNotification.pending, state => {
        // state.isLoading = true;
      })
      .addCase(getNotification.fulfilled, (state, action) => {
        state.notification = action.payload;
        state.isSuccess = true;
      })
      .addCase(getNotification.rejected, (state, action) => {
        state.isError = true;
      })
      .addCase(cronNotifylist.pending, state => {
        // state.isLoading = true;
      })
      .addCase(cronNotifylist.fulfilled, (state, action) => {
        state.notifylist = action.payload;
        state.isSuccess = true;
      })
      .addCase(cronNotifylist.rejected, (state, action) => {
        state.isError = true;
      })
      .addCase(upNextCourses.pending, state => {
        state.isLoading = true;
      })
      .addCase(upNextCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.upNextCourseList = [].concat(state.upNextCourseList, action.payload.data);
        state.upNextCoursePages = action.payload.totalPages;
        state.isSuccess = true;
      })
      .addCase(upNextCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(upNextSliderCourses.pending, state => {
        // state.isLoading = true;
      })
      .addCase(upNextSliderCourses.fulfilled, (state, action) => {
        state.upNextSliderList = action.payload.data;
        state.isSuccess = true;
      })
      .addCase(upNextSliderCourses.rejected, (state, action) => {
        state.isError = true;
      });
  },
});

export const { reset, courseFormCreate, updateSlots, clearSlots, courseFormReset } = tutorCourseSlice.actions;
export default tutorCourseSlice.reducer;
