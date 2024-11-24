import { apis } from '@/services/api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';


interface AuthState {
    isLogin: boolean
    user: any
    error: string | null
    isLoading: boolean

}

// Initial state
const initialState: AuthState = {
    isLogin: false,
    user: null,
    error: null,
    isLoading: true
};

export const validate = createAsyncThunk(
    'auth/validate',
    async (_, { rejectWithValue }) => {
        console.log("store : validate")
        try {
            const response = await apis.auth.validate()
            if (response && response.statusCode === 200) {
                return response
            }
            return rejectWithValue('Failed to fetch auth');

        } catch (error: any) {
            return rejectWithValue(error.message || 'Unknown error');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: state => {
            state.isLogin = false
            state.user = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(validate.pending, (state) => {
                state.error = null
                state.isLoading = true
            })
            .addCase(validate.fulfilled, (state, action: PayloadAction<{ statusCode: Number, data?: any }>) => {
                state.isLoading = false
                state.error = null
                if (action.payload.statusCode === 200) {
                    console.log("action.payload : ", action.payload)
                    state.isLogin = true
                    state.user = action.payload.data
                }
                else {
                    state.isLogin = false
                    state.user = null
                }
            })
            .addCase(validate.rejected, (state, action) => {
                state.error = action.payload as string
                state.isLoading = false
            })
    },
});

export const { logout } = authSlice.actions;


export default authSlice.reducer;
