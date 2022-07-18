import { createSlice } from '@reduxjs/toolkit';
import { getUserFromLs } from '../../utils/getUserFromLs';

const { isAuth, email, token, id, password } = getUserFromLs();

const initialState = {
    isAuth,
    email,
    token,
    id,
    password,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.id = action.payload.id;
            state.password = action.payload.password;
            state.isAuth = action.payload.isAuth;
        },
        removeUser(state) {
            state.email = null;
            state.token = null;
            state.id = null;
            state.password = null;
            state.isAuth = null;
        },
    },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
