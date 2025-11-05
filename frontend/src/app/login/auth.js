export const API_URL = 'http://localhost:3001';

export const setToken = (token) => {
    localStorage.setItem('token', token);
};

export const getToken = () => {
    return localStorage.getItem('token');
}

export const removeToken = () => {
    localStorage.removeItem('token');
}

export const validateToken = async () => {
    const token = getToken();
    if (!token) return null;

    try {
        const res = await fetch(`${API_URL}/validate`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!res.ok) {
            removeToken();
            return null;
        }

        const data = await res.json();
        // O endpoint /validate retorna { valid: true } quando o token é válido.
        // Retornamos true para o ProtectedRoute, ou null caso inválido.
        if (data.valid) {
            return { valid: true, role: data.role}
        } else {
            return null;
        }
        
    } catch(err) {
        removeToken();
        return null;
    }
}