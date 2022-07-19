import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux/es/exports';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import MyInput from '../components/UI/MyInput';
import MyButton from '../components/UI/MyButton';
import { setUser } from '../redux/user/slice';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleClick = async () => {
        const auth = getAuth();
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
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
            <h1>Register</h1>
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
            <MyButton handleClick={handleClick}>SignIn</MyButton>
            <p>
                you already have an account? <Link to="/login">LogIn</Link>
            </p>
        </div>
    );
};

export default Register;
