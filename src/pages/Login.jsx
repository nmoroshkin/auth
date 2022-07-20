import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

import { MyButton, MyInput } from '../components/UI';
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
