import React from 'react';
import { Navigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';

import TodoList from '../components/TodoList';
import { MyButton, MyInput } from '../components/UI';

import { db } from '../firebase';
import { Container } from '@mui/material';
import Loader from '../components/Loader';
import { setTodo } from '../redux/todos/slice';
import { fetchTodos } from '../redux/todos/slice';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';

const Home = () => {
    const dispatch = useAppDispatch();
    const [todoBody, setTodoBody] = React.useState('');
    const { isAuth, email } = useAppSelector(({ user }) => user);
    const { todos } = useAppSelector(({ todos }) => todos);
    const status = useAppSelector(({ todos }) => todos.status);

    React.useEffect(() => {
        dispatch(fetchTodos(email));
    }, [dispatch, email]);

    const handleEnterTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if ((e.key === 'Enter' || e.target.tagName === 'BUTTON') && todoBody !== '') {
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
        }
    };

    if (!isAuth) {
        return <Navigate to="/" replace={true} />;
    }

    return (
        <Container
            maxWidth="sm"
            sx={{
                pt: '50px',
                height: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div className="container">
                <div className="inputTodo">
                    <MyInput
                        onKeyDown={handleEnterTodo}
                        placeholder="todo..."
                        value={todoBody.trim()}
                        changeValue={(value) => setTodoBody(value)}
                        sx={{ width: '70%' }}
                    />
                    <MyButton handleClick={handleEnterTodo}>add</MyButton>
                </div>
                {status === 'succeed' ? <TodoList todos={todos} /> : <Loader />}
            </div>
        </Container>
    );
};

export default Home;
