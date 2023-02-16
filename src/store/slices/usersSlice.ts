import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UsersState = {
	data: User[];
};

type User = {
	name: string;
};
const initialState: UsersState = {
	data: [],
};

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
});

export const usersReducer = usersSlice.reducer;
