import { getAuth, signInWithPopup, GithubAuthProvider, User } from 'firebase/auth';
import { IUser } from '../redux/user/slice';

export interface OAuthCredential extends User {
    accessToken: string;
}

const githubAuth: () => Promise<IUser> | any = async () => {
    const auth = getAuth();
    const provider = new GithubAuthProvider();
    try {
        const res = await signInWithPopup(auth, provider);
        const user: OAuthCredential | any = await res.user;
        const _user: IUser = {
            email: user.email,
            username: user.displayName,
            image: user.photoURL,
            token: user.accessToken,
            id: user.uid,
            isAuth: true,
        };
        return _user;
    } catch (error) {
        if (error instanceof Error) {
            const errorMessage = error.message;
            console.log(errorMessage);
        }
    }
};

export default githubAuth;
