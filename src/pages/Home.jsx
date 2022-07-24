import React from 'react';
import { Navigate } from 'react-router-dom';
import { userSelect } from '../redux/user/selector';
import { useDispatch, useSelector } from 'react-redux';
import { collection, addDoc } from 'firebase/firestore';

import TodoList from '../components/TodoList';
import { MyButton, MyInput } from '../components/UI';

import { db } from '../firebase';
import { fetchTodos } from '../redux/todos/slice';
import { todoSelect } from '../redux/todos/selector';
import { setTodo } from '../redux/todos/slice';
import { Container } from '@mui/material';

const Home = () => {
    const dispatch = useDispatch();
    const [todoBody, setTodoBody] = React.useState('');
    const { isAuth, email } = useSelector(userSelect);
    const { todos } = useSelector(todoSelect);

    React.useEffect(() => {
        dispatch(fetchTodos(email));
    }, []);

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
                        placeholder="todo..."
                        value={todoBody.trim()}
                        changeValue={(value) => setTodoBody(value)}
                        sx={{ width: '70%' }}
                    />
                    <MyButton handleClick={handleClick}>add</MyButton>
                </div>
                <TodoList todos={todos} />
            </div>
        </Container>
    );
};

export default Home;
