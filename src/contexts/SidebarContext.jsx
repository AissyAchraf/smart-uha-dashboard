import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMediaQuery } from "@mui/material";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const [isCollapsed, setIsCollapsed] = useState(true);
    const sidebarWidth = isCollapsed ? '80px' : '250px';

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    useEffect(() => {
        setIsCollapsed(!isNonMobile);
    }, [isNonMobile]);

    return (
        <SidebarContext.Provider value={{ isCollapsed, sidebarWidth, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
};

export default SidebarContext;