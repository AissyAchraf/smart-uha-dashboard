import React, { createContext, useEffect, useReducer, useState } from "react";
import API from "../utils/api";
import useLoading from "../hooks/useLoading";

const initialState = {
    token: null,
    user: null,
    isAuthenticated: false
};

const reducer = (state, action) => {
    switch (action.type) {
        case "INIT": {
            const { isAuthenticated, token, user } = action.payload;
            return { ...state, isAuthenticated, token, user };
        }

        case "LOGIN": {
            return { ...state, isAuthenticated: true, token: action.payload.token, user: action.payload.user };
        }

        case "LOGOUT": {
            return { ...state, isAuthenticated: false, token: null, user: null };
        }

        default:
            return state;
    }
};

const AuthContext = createContext({
    ...initialState,
    method: "JWT",
    login: () => {},
    saveToken: () => {},
    getToken: () => {},
    hasToken: () => {},
    getUser: () => {},
    setUser: () => {},
    logout: () => {},
    register: () => {},
});

export const AuthProvider = ({ children }) => {
    const { isLoading, setIsLoading } = useLoading();
    const [state, dispatch] = useReducer(reducer, initialState);
    const [loading, setLoading] = useState(true); // Loading state

    const login = async (email, password) => {
        let user = null;
        await API.authenticate(email, password)
            .then(async data => {
                setIsLoading(true);
                setLoading(true);
                user = await saveToken(data.data.token);
                setLoading(false);
                setIsLoading(false);
            }, function(error){
                console.log(error);
                switch(error.response?.data) {
                    case "401":
                        alert("login.authenticateError");
                        break;
                    default:
                        alert("login.serverError");
                }
            });
        ;
        const mockToken = "Jadii34bIibS5lPiwQyDHmKrblaUS6AcleWcV0CGzJuX1iOpOJL6xerD5EUTbr0I";
        dispatch({ type: "LOGIN", payload: { token: mockToken, user: user } });
    };

    const saveToken = async (token) => {
        sessionStorage.setItem("token", token);
        return API.getUser().then((data) => {
            sessionStorage.setItem('user', JSON.stringify(data.data));
            sessionStorage.setItem('isAuthenticated', JSON.stringify(true));
            return data.data;
        });
    }

    const getToken = (token) => {
        return sessionStorage.getItem("token");
    }

    const hasToken = (token) => {
        return sessionStorage.getItem("token") !== null;
    }

    const getUser = async () => {
        return JSON.parse(sessionStorage.getItem("user"));
    }

    const setUser = (user) => {
        sessionStorage.setItem("user", JSON.stringify(user));
    }

    const logout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("isAuthenticated");
        dispatch({ type: "LOGOUT" });
    };

    useEffect(() => {
        setIsLoading(true);
        const token = sessionStorage.getItem("token");
        const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";
        const user = JSON.parse(sessionStorage.getItem("user"));

        if (token && isAuthenticated) {
            dispatch({
                type: "INIT",
                payload: { isAuthenticated: true, token, user: user },
            });
        } else {
            dispatch({ type: "INIT", payload: { isAuthenticated: false, token: null, user: null } });
        }

        setIsLoading(false);
        setLoading(false);
    }, []);

    // if (loading) {
    //     return (<Box justifyContent="center">
    //         <svg className="loader" viewBox="25 25 50 50">
    //             <circle r="20" cy="50" cx="50"></circle>
    //         </svg>
    //     </Box>);
    // }

    return (
        <AuthContext.Provider value={{ ...state, method: "JWT", login, logout }}>
            {isLoading && <svg className="loader" viewBox="25 25 50 50">
                <circle r="20" cy="50" cx="50"></circle>
            </svg>}
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
