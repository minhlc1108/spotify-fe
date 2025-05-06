import { loginAPI, logoutAPI, registerAPI } from "@/api";
import { AuthLogin, AuthRegister, User } from "@/types/Auth";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface AuthState {
	user: User | null;
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null;
}

// Initial state
const initialState: AuthState = {
	user: null,
	status: "idle",
	error: null,
};

export const login = createAsyncThunk("auth/login", async (credentials: AuthLogin, { rejectWithValue }) => {
	try {
		const response = await loginAPI(credentials);
		return response as unknown as User; // Ensure the response matches the User type
	} catch (err) {
		const error = err as { response?: { data?: { detail?: string } } };
		return rejectWithValue(error.response?.data?.detail || "Login failed");
	}
});

export const register = createAsyncThunk("auth/register", async (data: AuthRegister, { rejectWithValue }) => {
	const res = await registerAPI(data);
	return res as unknown as User; // hoặc toàn bộ res nếu cần access/refresh
});

export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
	return await logoutAPI();
});

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.status = "loading";
				state.error = null;
			})
			.addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
				state.status = "succeeded";
				state.user = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload as string;
			})
			.addCase(register.pending, (state) => {
				state.status = "loading";
				state.error = null;
			})
			.addCase(register.fulfilled, (state, action: PayloadAction<User>) => {
				state.status = "succeeded";
				state.user = action.payload;
			})
			.addCase(register.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload as string;
			})
			// logout
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
				state.status = "idle";
			})
			.addCase(logout.rejected, (state, action) => {
				state.error = action.payload as string;
			});
	},
});

export default authSlice.reducer;
