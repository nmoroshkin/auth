import { Box } from '@mui/material';
import React from 'react';
import { Todo } from '../redux/todos/slice';

import TodoItem from './TodoItem';

interface TodoListProps {
    todos: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
    return (
        <Box
            sx={{
                height: '70vh',
                overflow: 'auto',
            }}
            className="todoList"
        >
            {!!todos.length ? (
                todos.map((todo) => <TodoItem key={todo.id} {...todo} />)
            ) : (
                <h2>Empty</h2>
            )}
        </Box>
    );
};

export default TodoList;
