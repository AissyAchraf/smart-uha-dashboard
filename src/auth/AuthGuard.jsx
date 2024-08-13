import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const AuthGuard = ({ children }) => {
    const { isAuthenticated, token } = useContext(AuthContext);

    if (!isAuthenticated || !token) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default AuthGuard;
