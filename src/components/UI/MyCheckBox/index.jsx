import React from 'react';
import { Checkbox } from '@mui/material';

const MyCheckBox = ({ onCheck, status }) => {
    return (
        <Checkbox
            checked={status}
            onChange={() => onCheck()}
            sx={{ '& .MuiSvgIcon-root': { fontSize: 22 } }}
            style={{
                color: '#ff9ff3',
            }}
        />
    );
    // return <input onChange={() => onCheck()} type="checkbox" checked={status} />;
};

export default MyCheckBox;
