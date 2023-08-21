import { createSlice } from "@reduxjs/toolkit";
import { removeDuplicates } from "../../utils/common";

const tvScheduleSlice = createSlice({
    name: "schedule",
    initialState: [],
    reducers: {
        getSchedule: (state, action) => {
            const filterDuplicates = removeDuplicates(action.payload.data);
            return filterDuplicates;
        }
    }
})

export default tvScheduleSlice.reducer;
export const { getSchedule } = tvScheduleSlice.actions;