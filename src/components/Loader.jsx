import React from 'react';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
    return (
        <div className="todoList">
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: '50px',
                }}
            >
                <CircularProgress color="button" />
            </Box>
        </div>
    );
};

export default Loader;
