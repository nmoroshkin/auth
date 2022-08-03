import { IUser } from './../redux/user/slice';

export function setUserToLs(user: IUser) {
    const data = JSON.stringify(user);
    localStorage.setItem('user', data);
}
