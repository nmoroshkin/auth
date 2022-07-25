import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkTodo, deleteTodo } from '../redux/todos/slice';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';

import { db } from '../firebase';

import { MyCheckBox, MyInput } from './UI';
import { userSelect } from '../redux/user/selector';
import { ListItem, ListItemButton } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { changeTodo } from '../redux/todos/slice';

const TodoItem = React.memo(({ id, todoBody, status, docId }) => {
    const dispatch = useDispatch();
    const [change, setChange] = React.useState(false);
    const [changeValue, setChangeValue] = React.useState(todoBody);
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

    const esketitChange = () => {
        setChange(!change);
    };

    const saveChanges = async (e) => {
        if (e.key !== 'Enter') {
            if (e.key === 'Escape') {
                setChange(!change);
                return;
            }
            return;
        }
        await updateDoc(doc(db, email, docId), {
            docId,
            todoBody: changeValue,
        });
        dispatch(changeTodo({ id, changeValue }));
        setChange(!change);
    };

    return (
        <ListItem component="div">
            <ListItemButton
                className="todoList__task"
                component="div"
                sx={{
                    padding: '5px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <div className="task__body">
                    <MyCheckBox status={status} onCheck={handleCheck} />
                    {!change ? (
                        <span onDoubleClick={esketitChange} className={status ? 'checked' : ''}>
                            {todoBody}
                        </span>
                    ) : (
                        <MyInput
                            autoFocus
                            value={changeValue}
                            changeValue={(value) => setChangeValue(value)}
                            onKeyDown={saveChanges}
                        />
                    )}
                </div>
                <div className="delete">
                    <HighlightOffIcon
                        className="delete__btn"
                        onClick={handleClick}
                        style={{
                            color: '#e056fd',
                        }}
                    />
                </div>
            </ListItemButton>
        </ListItem>
    );
});

export default TodoItem;
