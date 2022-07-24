import { TextField } from '@mui/material';
import React from 'react';

const MyInput = ({ changeValue, placeholder, ...props }) => {
    return (
        <TextField
            onChange={(e) => changeValue(e.target.value)}
            label={placeholder}
            variant="standard"
        />
    );
    // return <input onChange={(e) => changeValue(e.target.value)} {...props} />;
};

export default MyInput;
