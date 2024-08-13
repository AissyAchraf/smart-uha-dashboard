import React, { createContext, useEffect, useReducer, useState } from "react";
import API from "../utils/api";
import useLoading from "../hooks/useLoading";

const initialState = {
    token: sessionStorage.getItem("token"),
    user: JSON.parse(sessionStorage.getItem("user")),
    isAuthenticated: sessionStorage.getItem("isAuthenticated"),
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
    const [state, dispatch] = useReducer(reducer, initialState);
    const [loading, setLoading] = useState(true);

    const login = async (email, password) => {
        let user = null;
        let token = null;
        await API.authenticate(email, password)
            .then(async data => {
                setLoading(true);
                token = data.data.token;
                user = await saveToken(token);
                setLoading(false);
            }, function(error){
                switch(error.response?.data) {
                    case "401":
                        alert("login.authenticateError");
                        break;
                    default:
                        alert("login.serverError");
                }
            });
        ;
        dispatch({ type: "LOGIN", payload: { token: token, user: user, isAuthenticated: true } });
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
        (async () => {
            setLoading(true);
            const token = sessionStorage.getItem("token");
            const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";

            if (token && isAuthenticated) {
                const user = API.getUser().then(response => {
                    // Check if the status is 200 (OK) and we have user data
                    if (response.status === 200 && response.data) {
                        const user = response.data;
                        dispatch({
                            type: "INIT",
                            payload: {isAuthenticated: true, token, user: user},
                        });
                    }
                }).catch(error => {
                    // Check if the error response status is 401 (Unauthorized)
                    if (error.response && error.response.status === 401) {
                        logout();
                    } else {
                        console.error('An error occurred:', error);
                    }
                });
            } else {
                dispatch({type: "INIT", payload: {isAuthenticated: false, token: null, user: null}});
            }

            setLoading(false);
        })();
    }, []);

    // if (loading) {
    //     return (<Box justifyContent="center">
    //         <svg className="loader" viewBox="25 25 50 50">
    //             <circle r="20" cy="50" cx="50"></circle>
    //         </svg>
    //     </Box>);
    // }

    return (
        <AuthContext.Provider value={{ ...state, method: "JWT", login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
