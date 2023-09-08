import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import commonService from './commonService';

initialState = {
  industrySkillSpecializationInterestTypes: null,
  industry: [],
  specialization: [],
  skills: [],
  fileData: null,
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: '',
  signupData: {}
};

//Get Type List
export const typeList = createAsyncThunk(
  `types/typeList`,
  async (data, thunkAPI) => {
    try {
      return await commonService.getTypeList({ data });
    } catch (error) {
      return thunkAPI.rejectWithValue(commonService.errorMessage(error));
    }
  },
);

//Get Industry List
export const industryList = createAsyncThunk(
  `industry/industryList`,
  async (data, thunkAPI) => {
    try {
      return await commonService.getIndustryList({ data });
    } catch (error) {
      return thunkAPI.rejectWithValue(commonService.errorMessage(error));
    }
  },
);

//Get Industry List
export const specializationList = createAsyncThunk(
  `industry/specializationList`,
  async (data, thunkAPI) => {
    try {
      return await commonService.getSpecializationList({ data });
    } catch (error) {
      return thunkAPI.rejectWithValue(commonService.errorMessage(error));
    }
  },
);

//Get Industry List
export const skillsList = createAsyncThunk(
  `skills/skillsList`,
  async (data, thunkAPI) => {
    try {
      return await commonService.getSkillsList({ data });
    } catch (error) {
      return thunkAPI.rejectWithValue(commonService.errorMessage(error));
    }
  },
);

//File upload
export const fileUpload = createAsyncThunk(
  `upload/uploadFile`,
  async (image, thunkAPI) => {
    try {
      return await commonService.uploadFile(image);
    } catch (error) {
      return thunkAPI.rejectWithValue(commonService.errorMessage(error));
    }
  },
);

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    reset: state => {
      state = initialState;
    },
    signupStoreData: (state, action) => {
      state.signupData = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(typeList.pending, state => {
        state.isLoading = true;
      })
      .addCase(typeList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.industrySkillSpecializationInterestTypes = action.payload;
        state.isSuccess = true;
      })
      .addCase(typeList.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(industryList.pending, state => {
        state.isLoading = true;
      })
      .addCase(industryList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.industry = action.payload;
        state.isSuccess = true;
      })
      .addCase(industryList.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(specializationList.pending, state => {
        state.isLoading = true;
      })
      .addCase(specializationList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.specialization = action.payload;
        state.skills = [];
        state.isSuccess = true;
      })
      .addCase(specializationList.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(skillsList.pending, state => {
        state.isLoading = true;
      })
      .addCase(skillsList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.skills = action.payload;
        state.isSuccess = true;
      })
      .addCase(skillsList.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(fileUpload.pending, state => {
        state.isLoading = true;
      })
      .addCase(fileUpload.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fileData = action.payload;
        state.isSuccess = true;
      })
      .addCase(fileUpload.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export const { reset, logout, signupStoreData } = commonSlice.actions;
export default commonSlice.reducer;
