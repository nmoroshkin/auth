import React from 'react';
import { Button } from '@mui/material';

interface MyButtonProps {
    handleClick: (arg: any) => void;
    children: React.ReactNode;
}

const MyButton: React.FC<MyButtonProps> = ({ handleClick, children }) => {
    return (
        <Button
            onClick={(e) => handleClick(e)}
            color="secondary"
            variant="outlined"
            sx={{ textTransform: 'none', fontSize: '1.1rem' }}
            size="medium"
        >
            {children}
        </Button>
    );
};

export default MyButton;
