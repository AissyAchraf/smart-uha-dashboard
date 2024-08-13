import { useContext } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Box }  from "@mui/material";

const AuthGuard = ({ children }) => {
    const { isAuthenticated, token, loading } = useAuth();

    if (loading) {
        return <Box>
            <svg className="loader" viewBox="25 25 50 50">
                <circle r="20" cy="50" cx="50"></circle>
            </svg>
        </Box>
    }

    if ((!isAuthenticated || !token) && !loading) {
        return <Navigate to="/login"/>;
    }

    return children;
};

export default AuthGuard;
