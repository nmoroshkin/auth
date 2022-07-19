import React from 'react';

const MyCheckBox = ({ onCheck, status }) => {
    return <input onChange={() => onCheck()} type="checkbox" checked={status} />;
};

export default MyCheckBox;
