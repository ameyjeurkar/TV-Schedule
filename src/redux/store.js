import { configureStore } from "@reduxjs/toolkit";
import scheduleReducer from "./slice/tvScheduleSlice";
import filteredScheduleReducer from "./slice/filteredScheduleSlice";

const store = configureStore({
    reducer: {
        schedule: scheduleReducer,
        filteredSchedule: filteredScheduleReducer
    }
})

export default store;