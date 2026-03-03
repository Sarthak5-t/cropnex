import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

function ProtectedRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('adminToken');

            if (!token) {
                return false;
            }

            try {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                // Check if token is expired
                if (decoded.exp < currentTime) {
                    localStorage.removeItem('adminToken');
                    return false;
                }

                return true;
            } catch (error) {
                // Invalid token format
                localStorage.removeItem('adminToken');
                return false;
            }
        };

        if (checkAuth()) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
            window.location.href = '/admin/login';
        }
    }, []);

    if (isAuthenticated === null) {
        return <div className="p-8 text-center text-gray-500">Checking authentication...</div>;
    }

    return isAuthenticated ? children : null;
}

export default ProtectedRoute;
