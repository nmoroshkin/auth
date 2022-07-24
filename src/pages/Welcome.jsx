import React from 'react';
import { Container } from '@mui/system';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { userSelect } from '../redux/user/selector';

import plank from '../assets/img/plank.jpg';

const Welcome = () => {
    const { isAuth } = useSelector(userSelect);
    if (isAuth) {
        return <Navigate to="/home" replace={true} />;
    }
    return (
        <>
            <Container>
                <div className="welcome">
                    <h1>Welcome</h1>
                    <div className="welcome__picture">
                        <img src={plank} alt="" />
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Welcome;
