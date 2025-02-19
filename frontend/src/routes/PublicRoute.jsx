import { Navigate } from 'react-router-dom';

import useSession from '@hooks/useSession';

const PublicRoute = ({ children }) => {
    const { isAuthenticated } = useSession();
    if (isAuthenticated) {
        return <Navigate to='/' replace />
    }
    return children;
}

export default PublicRoute