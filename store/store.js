import { configureStore } from '@reduxjs/toolkit';
import TutorCourseReducer from './features/tutorCourse/tutorCourseSlice';
import TutorProfileReducer from './features/tutorCourse/tutorProfileSlice';
import StudentCourseReducer from './features/studentCourse/studentCourseSlice';
import StudentProfileReducer from './features/studentCourse/studentProfileSlice';
import CommonDataReducer from './features/common/commonSlice';
import CommonCourseReducer from './features/common/commonCourseSlice';
import AuthReducer from './features/auth/authSlice';

const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
  reducer: {
    auth: AuthReducer,
    tutorCourse: TutorCourseReducer,
    tutorProfile: TutorProfileReducer,
    studentProfile: StudentProfileReducer,
    studentCourse: StudentCourseReducer,
    commonData: CommonDataReducer,
    commonCourse: CommonCourseReducer
  },
});

export default store;
