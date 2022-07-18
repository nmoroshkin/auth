import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { setUserToLs } from '../utils/setUserToLs';

import MyButton from '../components/UI/MyButton';
import MyInput from '../components/UI/MyInput';
import { setUser } from '../redux/user/slice';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const handleClick = async () => {
        const auth = getAuth();
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            const resUser = res.user;
            const user = {
                email: resUser.email,
                token: resUser.accessToken,
                id: resUser.uid,
                password: password,
                isAuth: true,
            };
            dispatch(setUser(user));
            setEmail('');
            setPassword('');
            setUserToLs(user);
            navigate('/', { replace: true });
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <MyInput
                type="text"
                placeholder="email"
                value={email}
                changeValue={(value) => setEmail(value)}
            />
            <MyInput
                type="password"
                placeholder="password"
                value={password}
                changeValue={(value) => setPassword(value)}
            />
            <MyButton handleClick={handleClick}>LogIn</MyButton>
            <p>
                don't have an account yet? <Link to="/register">register</Link>
            </p>
        </div>
    );
};

export default Login;
