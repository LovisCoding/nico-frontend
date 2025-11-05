export function getToken() {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
}

export function requireTokenOrRedirect(router) {
    const token = getToken();
    if (!token) {
        router.push('/');
        return null;
    }
    return token;
}