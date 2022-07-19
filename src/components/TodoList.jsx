import React from 'react';

import TodoItem from './TodoItem';

const TodoList = ({ todos }) => {
    return !!todos.length ? (
        todos.map((todo) => <TodoItem key={todo.id} {...todo} />)
    ) : (
        <h2>Empty</h2>
    );
};

export default TodoList;
