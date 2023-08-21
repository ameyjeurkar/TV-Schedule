import { createSlice } from "@reduxjs/toolkit";
import { getShowAiringTime, removeDuplicates } from "../../utils/common";

const filteredScheduleSlice = createSlice({
    name: "filteredSchedule",
    initialState: [],
    reducers: {
        filterScheduleToTime: (state, action) => {
            const { scheduleAPIResponse, timeRange } = action.payload;
            const filteredData = scheduleAPIResponse.filter(obj => {
                const value = getShowAiringTime(obj?.show?.schedule?.time) === timeRange;
                return value && obj;
            }).map(obj => {
                return obj?.show;
            })
            const data = removeDuplicates(filteredData);
            return data;
        },
        filterShowsBySearchQuery: (state, action) => {
            const { searchedResults } = action.payload;
            const filteredData = searchedResults?.data?.map(obj => {
                return obj?.show;
            })
            const data = removeDuplicates(filteredData);
            return data;
        }
    }
})

export default filteredScheduleSlice.reducer;
export const { filterScheduleToTime, filterShowsBySearchQuery } = filteredScheduleSlice.actions;