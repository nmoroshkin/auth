import React from 'react';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
    return (
        <Box
            sx={{
                height: '70vh',
                overflow: 'auto',
            }}
            className="todoList"
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: '50px',
                }}
            >
                <CircularProgress color="secondary" />
            </Box>
        </Box>
    );
};

export default Loader;
