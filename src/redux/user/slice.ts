import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUser {
    isAuth: boolean | null;
    email: string;
    token: string;
    id: string;
    image: string;
    username: string;
}

const initialState: IUser = {
    isAuth: false,
    email: '',
    token: '',
    id: '',
    image: '',
    username: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUser>) {
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.id = action.payload.id;
            state.image = action.payload.image;
            state.isAuth = action.payload.isAuth;
            state.username = action.payload.username;
        },
        setUsername(state, action: PayloadAction<string>) {
            state.username = action.payload;
        },
        removeUser(state) {
            state.email = '';
            state.token = '';
            state.id = '';
            state.image = '';
            state.isAuth = null;
            state.username = '';
        },
    },
});

export const { setUser, removeUser, setUsername } = userSlice.actions;
export default userSlice.reducer;
