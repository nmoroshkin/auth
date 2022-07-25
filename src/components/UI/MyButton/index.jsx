import React from 'react';
import { Button } from '@mui/material';

const MyButton = ({ handleClick, children }) => {
    return (
        <Button
            onClick={(e) => handleClick(e)}
            color="button"
            variant="outlined"
            sx={{ textTransform: 'none', fontSize: '1.1rem' }}
            size="medium"
        >
            {children}
        </Button>
    );
    // return <button onClick={() => handleClick()}>{children}</button>;
};

export default MyButton;
