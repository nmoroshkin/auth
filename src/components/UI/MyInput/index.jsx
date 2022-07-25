import { TextField } from '@mui/material';
import React from 'react';

const MyInput = ({ changeValue, placeholder, ...props }) => {
    return (
        <TextField
            color="button"
            onChange={(e) => changeValue(e.target.value)}
            label={placeholder}
            variant="standard"
            sx={{ mb: '20px' }}
            size="small"
            // InputProps={{ className: 'textfield__input' }}
            // InputLabelProps={{ className: 'textfield__label' }}
            {...props}
        />
    );
};

export default MyInput;
