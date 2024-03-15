import {ReactNode} from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from '../hooks/auth/useAuth';

interface ProtectedRouteParam {
    children: ReactNode;
}

export const ProtectedRoute = ({children}: ProtectedRouteParam) => {
    const {user, is2FAVerified} = useAuth();

    console.log('ProtectedRoute : ', user, is2FAVerified);

    if (!user) {
        return <Navigate to="/login" />;
    }
    if (!is2FAVerified) {
        return <Navigate to="/verify-2fa" />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
