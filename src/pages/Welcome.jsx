import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { MyButton } from '../components/UI';

import githubAuth from '../utils/githubAuth';
import googleAuth from '../utils/googleAuth';
import { setUser } from '../redux/user/slice';
import { userSelect } from '../redux/user/selector';

const Welcome = () => {
    const dispatch = useDispatch();
    const { isAuth } = useSelector(userSelect);
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

    return (
        <div className="welcome">
            <h1>Welcome</h1>
            <Link to="/login">login</Link> <Link to="/register">register</Link>
            <MyButton handleClick={handleClickGoogle}>Continue with google</MyButton>
            <MyButton handleClick={handleClickGithub}>Continue with GitHub</MyButton>
        </div>
    );
};

export default Welcome;
