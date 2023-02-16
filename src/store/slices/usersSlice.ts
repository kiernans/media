import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosError } from 'axios';
import { fetchUsers } from '../thunks/fetchUsers';
import { addUser } from '../thunks/addUser';

type UsersState = {
	data: User[];
	error: Error;
	isLoading: boolean;
};

type User = {
	name: string;
	id?: number;
};

type Error = null | {};
const initialState: UsersState = {
	data: [],
	isLoading: false,
	error: null,
};

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(fetchUsers.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(
			fetchUsers.fulfilled,
			(state, action: PayloadAction<User[]>) => {
				state.isLoading = false;
				state.data = action.payload;
			}
		);
		builder.addCase(fetchUsers.rejected, (state, action) => {
			state.isLoading = false;
			console.log(action.error);
			state.error = action.error;
		});

		builder.addCase(addUser.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
			state.isLoading = false;
			state.data.push(action.payload);
		});
		builder.addCase(addUser.rejected, (state, action) => {
			state.isLoading = false;
			console.log(action.error);
			state.error = action.error;
		});
	},
});

export const usersReducer = usersSlice.reducer;
