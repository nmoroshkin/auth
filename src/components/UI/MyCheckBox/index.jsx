import React from 'react';

const MyCheckBox = ({ onCheck }) => {
    return <input onChange={() => onCheck()} type="checkbox" />;
};

export default MyCheckBox;
