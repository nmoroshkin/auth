import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const googleAuth = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
        const res = await signInWithPopup(auth, provider);
        const user = await res.user;
        return {
            email: user.email,
            username: user.displayName,
            image: user.photoURL,
            token: user.accessToken,
            id: user.uid,
            isAuth: true,
        };
    } catch (error) {
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        console.log(errorMessage);
        const email = error.customData.email;
        console.log(email);
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(credential);
    }
};

export default googleAuth;
