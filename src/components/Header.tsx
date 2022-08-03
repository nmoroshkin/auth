import { Link } from 'react-router-dom';

import { MyButton } from './UI';
import { removeUser } from '../redux/user/slice';
import { deleteTodos } from '../redux/todos/slice';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';

const Header = () => {
    const dispatch = useAppDispatch();
    const { isAuth, username, image } = useAppSelector(({ user }) => user);

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
                            <img src={image} alt="smth" />
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
                                color="secondary"
                                variant="outlined"
                                sx={{ textTransform: 'none', fontSize: '1.1rem', mr: '10px' }}
                                size="medium"
                            >
                                login
                            </Button>
                        </Link>
                        <Link to="/register">
                            <Button
                                color="secondary"
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
