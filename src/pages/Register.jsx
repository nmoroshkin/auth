import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux/es/exports';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import { MyButton, MyInput } from '../components/UI';
import { setUser } from '../redux/user/slice';

const Register = () => {
    const dispatch = useDispatch();
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
                placeholder="username"
                value={username}
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
