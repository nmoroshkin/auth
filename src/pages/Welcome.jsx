import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { userSelect } from '../redux/user/selector';

const Welcome = () => {
    const { isAuth } = useSelector(userSelect);

    if (isAuth) {
        return <Navigate to="/home" replace={true} />;
    }

    const googleAuth = async () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);
                const errorMessage = error.message;
                console.log(errorMessage);
                const email = error.customData.email;
                console.log(email);
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log(credential);
            });
    };

    return (
        <div>
            <h1>Welcome</h1>
            <Link to="/login">login</Link> <Link to="/register">register</Link>
            <button onClick={googleAuth}>Continue with google</button>
        </div>
    );
};

export default Welcome;
