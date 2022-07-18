import React from 'react';

const MyInput = ({ changeValue, ...props }) => {
    return <input onChange={(e) => changeValue(e.target.value)} {...props} />;
};

export default MyInput;
