import React from 'react';
import { Container } from '@mui/system';
import { Navigate } from 'react-router-dom';

import plank from '../assets/img/plank.jpg';
import { useAppSelector } from '../hooks/reduxHooks';
import { Box } from '@mui/material';

const Welcome = () => {
    const { isAuth } = useAppSelector(({ user }) => user);
    if (isAuth) {
        return <Navigate to="/home" replace={true} />;
    }
    return (
        <>
            <Container>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <h1>Welcome</h1>
                    <div className="welcome__picture">
                        <img src={plank} alt="" />
                    </div>
                </Box>
            </Container>
        </>
    );
};

export default Welcome;
