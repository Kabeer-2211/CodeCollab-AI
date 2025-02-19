import { Navigate } from 'react-router-dom';

import useSession from '@hooks/useSession';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useSession();
    if (!isAuthenticated) {
        return <Navigate to='/login' replace />
    }
    return children;
}

export default PrivateRoute