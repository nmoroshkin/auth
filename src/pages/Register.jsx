import React from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Container, Divider, Snackbar } from '@mui/material';

import MuiAlert from '@mui/material/Alert';

import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';

import { MyButton, MyInput } from '../components/UI';

import { userSelect } from '../redux/user/selector';
import githubAuth from '../utils/githubAuth';
import googleAuth from '../utils/googleAuth';
import { setUser } from '../redux/user/slice';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Register = () => {
    const [open, setOpen] = React.useState(false);
    const [errmsg, setErrmsg] = React.useState('');

    const dispatch = useDispatch();
    const { isAuth } = useSelector(userSelect);
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [username, setUsername] = React.useState('');

    const handleClick = async () => {
        const auth = getAuth();
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const resUser = res.user;
            const user = {
                email: resUser.email,
                token: resUser.accessToken,
                id: resUser.uid,
                image: 'https://avatars.mds.yandex.net/i?id=c8a94ab3383388ad27adebfaf01c8f18-3471343-images-thumbs&n=13&exp=1',
                isAuth: true,
                username,
            };
            dispatch(setUser(user));
            setEmail('');
            setPassword('');
            updateProfile(auth.currentUser, { displayName: username });
            navigate('/', { replace: true });
        } catch (error) {
            const errorCode = error.code;
            setOpen(true);
            setErrmsg(errorCode);
        }
    };

    if (isAuth) {
        return <Navigate to="/home" replace={true} />;
    }

    const handleClickGoogle = async () => {
        const user = await googleAuth();
        dispatch(setUser(user));
    };

    const handleClickGithub = async () => {
        const user = await githubAuth();
        dispatch(setUser(user));
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Container maxWidth="sm" className="auth">
            <h1>Register</h1>
            <div className="auth__body">
                <MyInput
                    type="text"
                    placeholder="username"
                    value={username.trim()}
                    changeValue={(value) => setUsername(value)}
                />
                <MyInput
                    type="text"
                    placeholder="email"
                    value={email}
                    changeValue={(value) => setEmail(value)}
                />
                <MyInput
                    type="password"
                    placeholder="password"
                    value={password.trim()}
                    changeValue={(value) => setPassword(value)}
                />
                <MyButton handleClick={handleClick}>SignUp</MyButton>
                <Divider sx={{ mb: '20px' }} />
                <div className="auth__btns">
                    <MyButton handleClick={handleClickGoogle}>
                        Continue with <GoogleIcon sx={{ fontSize: '1.8rem', ml: '10px' }} />
                    </MyButton>
                    <Divider sx={{ mb: '20px' }} />
                    <MyButton handleClick={handleClickGithub}>
                        Continue with <GitHubIcon sx={{ fontSize: '1.8rem', ml: '10px' }} />
                    </MyButton>
                </div>
            </div>
            <p>
                you already have an account?{' '}
                <Link to="/login" className="font-effect-neon">
                    login
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

export default Register;
