import { getTodosFromDB } from '../../utils/getTodosFromDB';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
    id: number;
    status: boolean;
    todoBody: string;
    docId?: string;
}

enum Status {
    Loading = 'loading',
    Succeed = 'succeed',
    Failed = 'failed',
}

interface TodosState {
    todos: Todo[];
    status: Status;
}

const initialState: TodosState = {
    todos: [],
    status: Status.Loading,
};

export const fetchTodos = createAsyncThunk<Todo[], string, { rejectValue: string }>(
    'todos/fetchTodos',
    async (email, { rejectWithValue }) => {
        try {
            const todo = await getTodosFromDB(email);
            return todo;
        } catch (error) {
            return rejectWithValue('Smth wrong!!!');
        }
    },
);

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        setTodo(state, action: PayloadAction<Todo>) {
            state.todos.push(action.payload);
        },
        deleteTodo(state, action: PayloadAction<number>) {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },
        deleteTodos(state) {
            state.todos = [];
        },
        changeTodo(state, action: PayloadAction<{ id: number; changeValue: string }>) {
            const findIndex = state.todos.findIndex((obj) => obj.id === action.payload.id);
            state.todos = state.todos.map((task) => {
                if (findIndex >= 0) {
                    state.todos[findIndex].todoBody = action.payload.changeValue;
                }
                return task;
            });
        },
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
        builder.addCase(fetchTodos.pending, (state) => {
            state.todos = [];
            state.status = Status.Loading;
        });
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.todos = action.payload;
            state.status = Status.Succeed;
        });
        builder.addCase(fetchTodos.rejected, (state) => {
            state.todos = [];
            state.status = Status.Failed;
        });
    },
});

export const { setTodo, deleteTodo, deleteTodos, changeTodo, checkTodo } = todoSlice.actions;
export default todoSlice.reducer;
