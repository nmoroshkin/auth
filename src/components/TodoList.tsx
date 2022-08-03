import React from 'react';
import { Todo } from '../redux/todos/slice';

import TodoItem from './TodoItem';

interface TodoListProps {
    todos: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
    return (
        <div className="todoList">
            {!!todos.length ? (
                todos.map((todo) => <TodoItem key={todo.id} {...todo} />)
            ) : (
                <h2>Empty</h2>
            )}
        </div>
    );
};

export default TodoList;
