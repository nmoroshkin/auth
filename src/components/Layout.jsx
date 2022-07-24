import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

import { Container } from '@mui/material';

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};

export default Layout;
