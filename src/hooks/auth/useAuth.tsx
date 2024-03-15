import {createContext, useContext, useState, ReactNode} from 'react';
import {useNavigate} from 'react-router-dom';
import {useLocalStorage} from './useLocalStorage';

const AuthContext = createContext<any>({
    user: null,
    login: () => Promise<void>,
    logout: () => Promise<void>
});

interface AuthProviderParam {
    children: ReactNode;
}

export const AuthProvider = ({children}: AuthProviderParam) => {
    const [user, setUser] = useLocalStorage('user', null);
    const [is2FAVerified, setIs2FAVerified] = useState(false);
    const navigate = useNavigate();

    const login = async (data: any) => {
        setUser(data);
        console.log('login start : ', data);
        // Navigate to 2FA verification page
        navigate('/verify-2fa');
    };

    const logout = () => {
        setUser(null);
        setIs2FAVerified(false);
        navigate('/login', {replace: true});
    };

    const verify2FACode = async (code: string) => {
        // Mock verification logic
        if (code === '0000') {
            setIs2FAVerified(true);
            navigate('/dashboard'); // Navigate to a protected route after successful 2FA
            return true;
        }
        return false;
    };

    const value = {
        user,
        is2FAVerified,
        login,
        logout,
        verify2FACode
    };

    console.log('AuthProvider : ', AuthContext, value);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
