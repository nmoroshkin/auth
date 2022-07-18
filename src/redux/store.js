import { configureStore } from '@reduxjs/toolkit';

import user from './user/slice';
import posts from './posts/slice';

export const store = configureStore({
    reducer: {
        user,
        posts,
    },
});
