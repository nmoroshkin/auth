import { TextField } from '@mui/material';
import React from 'react';

interface MyInputProps {
    placeholder?: string;
    changeValue: (text: string) => void;
    type?: string;
    value?: string;
    sx?: any;
    onKeyDown?: any;
    autoFocus?: boolean;
}

const MyInput: React.FC<MyInputProps> = ({ changeValue, placeholder, ...props }) => {
    return (
        <TextField
            color="secondary"
            onChange={(e) => changeValue(e.target.value)}
            label={placeholder}
            variant="standard"
            sx={{ mb: '20px' }}
            size="small"
            {...props}
        />
    );
};

export default MyInput;
