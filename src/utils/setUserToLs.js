export function setUserToLs(user) {
    const data = JSON.stringify(user);
    localStorage.setItem('user', data);
}
