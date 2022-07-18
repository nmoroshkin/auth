import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPostsFromDB } from '../../utils/getPostsFromDB';

const initialState = {
    posts: [],
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (email) => {
    const posts = await getPostsFromDB(email);
    return posts;
});

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPost(state, action) {
            state.posts.push(action.payload);
        },
        deletePost(state, action) {
            state.posts = state.posts.filter((post) => post.id !== action.payload);
        },
        deletePosts(state) {
            state.posts = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.posts = action.payload;
        });
    },
});

export const { setPost, deletePost, deletePosts } = postSlice.actions;
export default postSlice.reducer;
