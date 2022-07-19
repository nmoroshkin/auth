import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTodosFromDB } from '../../utils/getTodosFromDB';

const initialState = {
    todos: [],
};

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (email) => {
    const todo = await getTodosFromDB(email);
    return todo;
});

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        setTodo(state, action) {
            state.todos.push(action.payload);
        },
        deleteTodo(state, action) {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },
        deleteTodos(state) {
            state.todos = [];
        },
        changeTodo(state, action) {},
        checkTodo(state, action) {
            const findIndex = state.todos.findIndex((obj) => obj.id === action.payload.id);
            state.todos = state.todos.map((todo) => {
                if (findIndex >= 0) {
                    state.todos[findIndex].status = !action.payload.status;
                }
                return todo;
            });
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.todos = action.payload;
        });
    },
});

export const { setTodo, deleteTodo, deleteTodos, changeTodo, checkTodo } = todoSlice.actions;
export default todoSlice.reducer;
