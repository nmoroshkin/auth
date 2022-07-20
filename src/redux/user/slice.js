import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuth: '',
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
        setUser(state, action) {
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.id = action.payload.id;
            state.image = action.payload.image;
            state.isAuth = action.payload.isAuth;
            state.username = action.payload.username;
        },
        setUsername(state, action) {
            state.username = action.payload;
        },
        removeUser(state) {
            state.email = null;
            state.token = null;
            state.id = null;
            state.image = null;
            state.isAuth = null;
            state.username = null;
        },
    },
});

export const { setUser, removeUser, setUsername } = userSlice.actions;
export default userSlice.reducer;
