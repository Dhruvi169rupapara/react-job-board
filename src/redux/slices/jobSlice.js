import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance.js";

const initialState = {
    jobList: [],
    loading: false,
    error: null,
}

// First, create the thunk
export const fetchJobs = createAsyncThunk('job/fetchJobs', async (_,dispatch) => {
        const response = await axiosInstance.get(`/posts`);
        console.log(response.data);
        return response.data
    },
)

export const jobSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobs.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.jobList = action.payload;
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                console.log('Error fetching jobs:', action.error.message);
                state.error = action.error.message;
            });
    },
})

// Action creators are generated for each case reducer function
// export const { } = jobSlice.actions
export default jobSlice.reducer
