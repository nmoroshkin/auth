import { getAuth, signInWithPopup, GithubAuthProvider } from 'firebase/auth';

const githubAuth = async () => {
    const auth = getAuth();
    const provider = new GithubAuthProvider();
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
        const credential = GithubAuthProvider.credentialFromError(error);
        console.log(credential);
    }
};

export default githubAuth;
