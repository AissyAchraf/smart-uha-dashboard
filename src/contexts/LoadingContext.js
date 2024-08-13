import React, { createContext, useState, useContext } from 'react';
import { Box } from "@mui/material";

const LoadingContext = createContext({
    isLoading: false
});

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{isLoading, setIsLoading}}>
            {isLoading && <svg className="loader" viewBox="25 25 50 50">
                <circle r="20" cy="50" cx="50"></circle>
            </svg>}
            {children}
        </LoadingContext.Provider>
    );
};

export default LoadingContext;
