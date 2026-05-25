import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance.js";

const initialState = {
    jobList: [],
    jobListLoading: false,
    jobListError: null,
    jobDetails: null,
    jobDetailsLoading: false,
    jobDetailsError: null,
}

// First, create the thunk
export const fetchJobs = createAsyncThunk('job/fetchJobs', async (_,dispatch) => {
        const response = await axiosInstance.get(`/posts`);
        return response.data
    },
)

export const fetchJobById = createAsyncThunk('job/fetchJobById', async (id) => {
    const response = await axiosInstance.get(`/posts/${id}`);
    console.log(response.data);
    return response.data
})

export const jobSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobs.pending, (state) => {
                state.jobListLoading = true;
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.jobList = action.payload;
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                console.log('Error fetching jobs:', action.error.message);
                state.jobListError = action.error.message;
            })
            .addCase(fetchJobById.pending, (state) => {
                state.jobDetailsLoading = true;
            })
            .addCase(fetchJobById.fulfilled, (state, action) => {
                state.jobDetails = action.payload;
            })
            .addCase(fetchJobById.rejected, (state, action) => {
                console.log('Error fetching job details:', action.error.message);
                state.jobDetailsError = action.error.message;
            });
    },
})

// Action creators are generated for each case reducer function
// export const { } = jobSlice.actions
export default jobSlice.reducer
