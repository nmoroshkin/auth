import React from 'react';
import { Checkbox } from '@mui/material';

interface MyCheckBoxProps {
    status: boolean;
    onCheck: () => void;
}

const MyCheckBox: React.FC<MyCheckBoxProps> = ({ onCheck, status }) => {
    return (
        <Checkbox
            checked={status}
            onChange={() => onCheck()}
            sx={{ '& .MuiSvgIcon-root': { fontSize: 22 } }}
            style={{
                color: '#e056fd',
            }}
        />
    );
};

export default MyCheckBox;
