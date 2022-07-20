import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userSelect } from '../redux/user/selector';
import { MyButton } from '../components/UI';
import googleAuth from '../utils/googleAuth';
import { setUser } from '../redux/user/slice';

const Welcome = () => {
    const dispatch = useDispatch();
    const { isAuth } = useSelector(userSelect);
    if (isAuth) {
        return <Navigate to="/home" replace={true} />;
    }

    const handleClick = async () => {
        const user = await googleAuth();
        dispatch(setUser(user));
    };

    return (
        <div>
            <h1>Welcome</h1>
            <Link to="/login">login</Link> <Link to="/register">register</Link>
            <MyButton handleClick={handleClick}>Continue with google</MyButton>
        </div>
    );
};

export default Welcome;
