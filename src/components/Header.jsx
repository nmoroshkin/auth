import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { MyButton } from './UI';
import { userSelect } from '../redux/user/selector';
import { removeUser } from '../redux/user/slice';
import { deleteTodos } from '../redux/todos/slice';

const Header = () => {
    const dispatch = useDispatch();
    const { isAuth, username, image } = useSelector(userSelect);

    const handleLogout = () => {
        dispatch(removeUser());
        dispatch(deleteTodos());
        localStorage.removeItem('user');
    };

    return (
        <AppBar position="static">
            <Toolbar className="appbar">
                {isAuth ? (
                    <>
                        <div className="appbar__img">
                            <img src={image} />
                        </div>
                        <Typography
                            variant="h4"
                            component="div"
                            sx={{
                                flexGrow: 1,
                                color: '#e056fd',
                                fontStyle: 'italic',
                                alignItems: 'center',
                                fontSize: '1.5rem',
                            }}
                        >
                            {username}
                        </Typography>
                        <MyButton handleClick={handleLogout}>logout</MyButton>
                    </>
                ) : (
                    <>
                        <Typography
                            variant="h4"
                            component="div"
                            sx={{ flexGrow: 1, color: '#e056fd', fontStyle: 'italic' }}
                        >
                            <Link to="/" className="font-effect-anaglyph">
                                Folome
                            </Link>
                        </Typography>
                        <Link to="/login">
                            <Button
                                color="button"
                                variant="outlined"
                                sx={{ textTransform: 'none', fontSize: '1.1rem', mr: '10px' }}
                                size="medium"
                            >
                                login
                            </Button>
                        </Link>
                        <Link to="/register">
                            <Button
                                color="button"
                                variant="outlined"
                                sx={{ textTransform: 'none', fontSize: '1.1rem' }}
                                size="medium"
                            >
                                signup
                            </Button>
                        </Link>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
