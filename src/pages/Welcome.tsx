import React from 'react';
import { Container } from '@mui/system';
import { Navigate } from 'react-router-dom';

import plank from '../assets/img/plank.jpg';
import { useAppSelector } from '../hooks/reduxHooks';

const Welcome = () => {
    const { isAuth } = useAppSelector(({ user }) => user);
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
