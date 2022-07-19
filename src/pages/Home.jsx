import React from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { collection, addDoc } from 'firebase/firestore';

import { userSelect } from '../redux/user/selector';

import MyInput from '../components/UI/MyInput';
import MyButton from '../components/UI/MyButton';
import TodoList from '../components/TodoList';

import { deleteTodos, setTodo } from '../redux/todos/slice';

import { fetchTodos } from '../redux/todos/slice';
import { todoSelect } from '../redux/todos/selector';

import { db } from '../firebase';
import { removeUser } from '../redux/user/slice';

const Home = () => {
    const dispatch = useDispatch();
    const [todoBody, setTodoBody] = React.useState('');
    const { isAuth, email } = useSelector(userSelect);
    const { todos } = useSelector(todoSelect);

    React.useEffect(() => {
        dispatch(fetchTodos(email));
    }, []);

    const handleLogout = () => {
        dispatch(removeUser());
        dispatch(deleteTodos());
        localStorage.removeItem('user');
    };

    const handleClick = async () => {
        const todo = {
            id: Date.now(),
            todoBody,
            status: false,
        };
        setTodoBody('');
        try {
            const docRef = await addDoc(collection(db, email), {
                ...todo,
            });
            dispatch(setTodo({ ...todo, docId: docRef.id }));
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    if (!isAuth) {
        return <Navigate to="/" replace={true} />;
    }

    return (
        <div>
            <h1>Home</h1>
            <button onClick={handleLogout}>logout</button>
            <MyInput
                placeholder="todo..."
                value={todoBody}
                changeValue={(value) => setTodoBody(value)}
            />
            <MyButton handleClick={handleClick}>add</MyButton>
            <TodoList todos={todos} />
        </div>
    );
};

export default Home;
