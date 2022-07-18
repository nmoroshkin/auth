import React from 'react';

const MyButton = ({ handleClick, children }) => {
    return <button onClick={() => handleClick()}>{children}</button>;
};

export default MyButton;
