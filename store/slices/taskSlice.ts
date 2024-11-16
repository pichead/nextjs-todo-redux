import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { task } from '@/services/task';

interface TaskState {
    tasks: ITask[];
    loading: boolean;
    error: string | null;
    isInit: boolean
}

// Initial state
const initialState: TaskState = {
    tasks: [],
    loading: false,
    error: null,
    isInit: false
};

// Async Thunks
export const fetchInitialTasks = createAsyncThunk(
    'task/fetchInitialTasks',
    async (_, { rejectWithValue }) => {
        try {
            const response = await task.initial();
            if (response && response.status === 'ok') {
                const data = await task.findAllActive()
                return data?.data
            }
            return rejectWithValue('Failed to fetch tasks');

        } catch (error: any) {
            return rejectWithValue(error.message || 'Unknown error');
        }
    }
);

export const createTask = createAsyncThunk(
    'task/createTask',
    async (name: string, { rejectWithValue }) => {
        try {
            const response = await task.create(name);
            if (response && response.status === 'ok') {
                const data = await task.findAllActive()
                return data?.data
            }
            return rejectWithValue('Failed to create task');
        } catch (error: any) {
            return rejectWithValue(error.message || 'Unknown error');
        }
    }
);

export const findAllTasks = createAsyncThunk(
    'task/findAllTasks',
    async (_, { rejectWithValue }) => {
        try {
            const response = await task.findAll();
            if (response && response.status === 'ok') {
                const data = await task.findAllActive()
                return data?.data
            }
            return rejectWithValue('Failed to find all tasks');
        } catch (error: any) {
            return rejectWithValue(error.message || 'Unknown error');
        }
    }
);

export const findAllActiveTasks = createAsyncThunk(
    'task/findAllActiveTasks',
    async (_, { rejectWithValue }) => {
        try {
            const response = await task.findAllActive();
            if (response && response.status === 'ok') {
                const data = await task.findAllActive()
                return data?.data
            }
            return rejectWithValue('Failed to find active tasks');
        } catch (error: any) {
            return rejectWithValue(error.message || 'Unknown error');
        }
    }
);

export const completeTask = createAsyncThunk(
    'task/completeTask',
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await task.complete(id);
            console.log("completeTask res : ", response)
            if (response && response.status === 'ok') {
                const data = await task.findAllActive()
                return data?.data
            }
            return rejectWithValue('Failed to complete task');
        } catch (error: any) {
            return rejectWithValue(error.message || 'Unknown error');
        }
    }
);

export const pendingTask = createAsyncThunk(
    'task/pendingTask',
    async (id: number, { rejectWithValue }) => {
        try {
            console.log("pendingTask...")
            const response = await task.pending(id);
            console.log("pendingTask...response : ", response)

            if (response && response.status === 'ok') {
                const data = await task.findAllActive()
                console.log("pendingTask : ", data?.data)

                return data?.data
            }
            console.log("error try")
            return rejectWithValue('Failed to mark task as pending');
        } catch (error: any) {
            console.log("error catch")
            return rejectWithValue(error.message || 'Unknown error');
        }
    }
);

export const removeCompleteTasks = createAsyncThunk(
    'task/removeCompleteTasks',
    async (_, { rejectWithValue }) => {
        try {
            const response = await task.removeComplete();
            if (response && response.status === 'ok') {
                const data = await task.findAllActive()
                return data?.data
            }
            return rejectWithValue('Failed to remove completed tasks');
        } catch (error: any) {
            return rejectWithValue(error.message || 'Unknown error');
        }
    }
);

export const removeAllTasks = createAsyncThunk(
    'task/removeAllTasks',
    async (_, { rejectWithValue }) => {
        try {
            const response = await task.removeAll();
            if (response && response.status === 'ok') {
                const data = await task.findAllActive()
                console.log("data : ", data)
                return data?.data
            }
            return rejectWithValue('Failed to remove all tasks');
        } catch (error: any) {
            return rejectWithValue(error.message || 'Unknown error');
        }
    }
);

export const removeTask = createAsyncThunk(
    'task/removeTask',
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await task.remove(id);
            if (response && response.status === 'ok') {
                const data = await task.findAllActive()
                return data?.data
            }
            return rejectWithValue('Failed to remove task');
        } catch (error: any) {
            return rejectWithValue(error.message || 'Unknown error');
        }
    }
);

// Slice
const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Initial Tasks
            .addCase(fetchInitialTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchInitialTasks.fulfilled, (state, action: PayloadAction<ITask[]>) => {
                state.loading = false;
                if (!state.isInit) {
                    state.tasks = action.payload;
                }
                state.isInit = true
            })
            .addCase(fetchInitialTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Create Task
            .addCase(createTask.fulfilled, (state, action: PayloadAction<ITask[]>) => {
                state.tasks = action.payload;
            })

            // Find All Tasks
            .addCase(findAllTasks.fulfilled, (state, action: PayloadAction<ITask[]>) => {
                state.tasks = action.payload;
            })

            // Find All Active Tasks
            .addCase(findAllActiveTasks.fulfilled, (state, action: PayloadAction<ITask[]>) => {
                state.tasks = action.payload;
            })

            // Complete Task
            .addCase(completeTask.fulfilled, (state, action: PayloadAction<ITask[]>) => {
                state.tasks = action.payload
            })

            // Pending Task
            .addCase(pendingTask.fulfilled, (state, action: PayloadAction<ITask[]>) => {
                console.log("state.tasks : ", state)
                console.log("action.payload : ", action.payload)
                state.tasks = action.payload;
            })

            // Remove Complete Tasks
            .addCase(removeCompleteTasks.fulfilled, (state, action: PayloadAction<ITask[]>) => {
                state.tasks = action.payload;
            })

            // Remove All Tasks
            .addCase(removeAllTasks.fulfilled, (state, action: PayloadAction<ITask[]>) => {
                state.tasks = action.payload;
            })

            // Remove Task
            .addCase(removeTask.fulfilled, (state, action: PayloadAction<ITask[]>) => {
                state.tasks = action.payload;
            });
    },
});

export default taskSlice.reducer;
