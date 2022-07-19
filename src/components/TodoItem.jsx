import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkTodo, deleteTodo } from '../redux/todos/slice';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';

import { db } from '../firebase';

import MyButton from './UI/MyButton';
import { userSelect } from '../redux/user/selector';
import MyCheckBox from './UI/MyCheckBox';

const TodoItem = React.memo(({ id, todoBody, status, docId }) => {
    const dispatch = useDispatch();
    const { email } = useSelector(userSelect);

    const handleClick = async () => {
        dispatch(deleteTodo(id));
        await deleteDoc(doc(db, email, docId));
    };

    const handleCheck = async () => {
        const todo = { id, todoBody, status, docId };
        await updateDoc(doc(db, email, docId), {
            docId,
            status: !status,
        });
        dispatch(checkTodo(todo));
    };

    return (
        <div>
            <div>
                <MyCheckBox status={status} onCheck={handleCheck} />
                <span>{todoBody}</span>
            </div>
            <div>
                <MyButton handleClick={handleClick}>Delete</MyButton>
            </div>
        </div>
    );
});

export default TodoItem;
