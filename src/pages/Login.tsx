import React from 'react';
import { Container, Divider, Snackbar } from '@mui/material';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, User } from 'firebase/auth';

import MuiAlert from '@mui/material/Alert';

import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';

import { MyButton, MyInput } from '../components/UI';

import githubAuth from '../utils/githubAuth';
import googleAuth from '../utils/googleAuth';
import { IUser, setUser } from '../redux/user/slice';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';

const Alert: any = React.forwardRef(function Alert(props, ref: any) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
    const [open, setOpen] = React.useState(false);
    const [errmsg, setErrmsg] = React.useState('');

    const dispatch = useAppDispatch();
    const { isAuth } = useAppSelector(({ user }) => user);
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleClick = async () => {
        const auth = getAuth();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            onAuthStateChanged(auth, (user: User | any) => {
                const _user: IUser = {
                    email: user.email,
                    token: user.accessToken,
                    id: user.uid,
                    image: 'https://avatars.mds.yandex.net/i?id=c8a94ab3383388ad27adebfaf01c8f18-3471343-images-thumbs&n=13&exp=1',
                    isAuth: true,
                    username: user.displayName,
                };
                dispatch(setUser(_user));
            });
            setEmail('');
            setPassword('');
            navigate('/', { replace: true });
        } catch (error: any) {
            const errorCode = error.code;
            setOpen(true);
            setErrmsg(errorCode);
        }
    };

    const handleClickGoogle = async () => {
        const user: IUser = await googleAuth();
        dispatch(setUser(user));
    };

    const handleClickGithub = async () => {
        const user: IUser = await githubAuth();
        dispatch(setUser(user));
    };

    if (isAuth) {
        return <Navigate to="/home" replace={true} />;
    }

    const handleClose = (event: any, reason: any) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Container maxWidth="sm" className="auth">
            <h1>Login</h1>
            <div className="auth__body">
                <MyInput
                    type="text"
                    placeholder="email"
                    value={email.trim()}
                    changeValue={(value) => setEmail(value)}
                />
                <MyInput
                    type="password"
                    placeholder="password"
                    value={password.trim()}
                    changeValue={(value) => setPassword(value)}
                />
                <MyButton handleClick={handleClick}>LogIn</MyButton>
                <Divider sx={{ mb: '20px' }} />
                <div className="auth__btns">
                    <MyButton handleClick={handleClickGoogle}>
                        Continue with <GoogleIcon sx={{ fontSize: '1.8rem', ml: '10px' }} />
                    </MyButton>
                    <Divider sx={{ mb: '20px' }} />
                    <MyButton handleClick={handleClickGithub}>
                        Continue with
                        <GitHubIcon sx={{ fontSize: '1.8rem', ml: '10px' }} />
                    </MyButton>
                </div>
            </div>
            <p>
                don't have an account yet?{' '}
                <Link to="/register" className="font-effect-neon">
                    register
                </Link>
            </p>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={open}
                autoHideDuration={1000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {errmsg}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Login;
