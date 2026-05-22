import { useAuth } from "../context/AuthContext.jsx";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({
    children,
    isPublic = false,
    allowedRoles = [],
}) {

    const { user } = useAuth();

    if (isPublic) {
        if (user) {
            if (user.role === 'admin')
                return <Navigate to="/dashboard" replace />;
            else
                return <Navigate to="/jobs" replace />;
        }
        return children || <Outlet />;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return children || <Outlet />;

}

export default ProtectedRoute;
