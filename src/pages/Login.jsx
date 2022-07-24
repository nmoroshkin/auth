import React from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { Container } from '@mui/material';

import { MyButton, MyInput } from '../components/UI';

import githubAuth from '../utils/githubAuth';
import googleAuth from '../utils/googleAuth';
import { setUser } from '../redux/user/slice';
import { userSelect } from '../redux/user/selector';

const Login = () => {
    const dispatch = useDispatch();
    const { isAuth } = useSelector(userSelect);
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleClick = async () => {
        const auth = getAuth();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            onAuthStateChanged(auth, (user) => {
                const _user = {
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
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        }
    };

    const handleClickGoogle = async () => {
        const user = await googleAuth();
        dispatch(setUser(user));
    };

    const handleClickGithub = async () => {
        const user = await githubAuth();
        dispatch(setUser(user));
    };

    if (isAuth) {
        return <Navigate to="/home" replace={true} />;
    }

    return (
        <Container className="auth">
            <h1>Login</h1>
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
            <div className="auth__btns">
                <MyButton handleClick={handleClickGoogle}>Continue with google</MyButton>
                <MyButton handleClick={handleClickGithub}>Continue with GitHub</MyButton>
            </div>
            <p>
                don't have an account yet?{' '}
                <Link to="/register" className="font-effect-neon">
                    register
                </Link>
            </p>
        </Container>
    );
};

export default Login;
