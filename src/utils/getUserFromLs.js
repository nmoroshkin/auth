export function getUserFromLs() {
    const data = localStorage.getItem('user');
    const user = JSON.parse(data) || {};
    console.log(user);
    return {
        email: user.email || '',
        token: user.token || '',
        id: user.id || '',
        password: user.password || '',
        isAuth: user.isAuth || false,
    };
}
