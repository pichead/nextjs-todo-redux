import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import taskReducer from "./slices/taskSlice"

const store = configureStore({
    reducer: {
        task: taskReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;