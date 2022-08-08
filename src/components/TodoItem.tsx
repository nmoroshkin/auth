import React from 'react';
import { checkTodo, deleteTodo } from '../redux/todos/slice';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';

import { db } from '../firebase';

import { MyCheckBox, MyInput } from './UI';
import { changeTodo } from '../redux/todos/slice';
import { Box, ListItem, ListItemButton } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';

interface TodoItemProps {
    id: number;
    todoBody: string;
    status: boolean;
    docId?: string;
}

const TodoItem: React.FC<TodoItemProps> = React.memo(({ id, todoBody, status, docId }) => {
    const dispatch = useAppDispatch();
    const [change, setChange] = React.useState(false);
    const [changeValue, setChangeValue] = React.useState(todoBody);
    const { email } = useAppSelector(({ user }) => user);

    const handleClick = async () => {
        dispatch(deleteTodo(id));
        if (docId) await deleteDoc(doc<any>(db, email, docId));
    };

    const handleCheck = async () => {
        const todo = { id, todoBody, status, docId };
        if (docId) {
            await updateDoc(doc<any>(db, email, docId), {
                docId,
                status: !status,
            });
            dispatch(checkTodo(todo));
        }
    };

    const esketitChange = () => {
        setChange(!change);
    };

    const saveChanges = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') {
            if (e.key === 'Escape') {
                setChange(!change);
                return;
            }
            return;
        }
        if (docId) {
            await updateDoc(doc<any>(db, email, docId), {
                docId,
                todoBody: changeValue,
            });
            dispatch(changeTodo({ id, changeValue }));
            setChange(!change);
        }
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
                <Box
                    sx={{
                        flex: '1',
                        marginRight: '5px',
                        display: 'inline-flex',
                        alignItems: 'center',
                    }}
                    className="task__body"
                >
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
                </Box>
                <Box>
                    <HighlightOffIcon
                        className="delete__btn"
                        onClick={handleClick}
                        style={{
                            color: '#e056fd',
                        }}
                    />
                </Box>
            </ListItemButton>
        </ListItem>
    );
});

export default TodoItem;
