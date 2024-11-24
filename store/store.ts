import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import taskReducer from "./slices/taskSlice"
import authReducer from "./slices/authSlice"

const store = configureStore({
    reducer: {
        task: taskReducer,
        auth: authReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;