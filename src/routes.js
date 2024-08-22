import AuthGuard from "./auth/AuthGuard";
import { Outlet } from "react-router-dom";
import { authRoles } from "./auth/authRoles";
import useSidebar from "./hooks/useSidebar";
import { Box } from "@mui/material";

// SESSION PAGES
import SignIn from "./views/sessions/SignIn";

// PAGES
import SendColis from "./views/sendColis";
import SendResume from "./views/sendResume";
import Track from "./views/track";

// Dashboard
import Home from "./views/home";
import Sidebar from "./views/global/Sidebar";
import Topbar from "./views/global/Topbar";

const Layout = () => {
    const { sidebarWidth, isCollapsed } = useSidebar();

    return (
        <Box className="app">
            <Sidebar />
            <Box className="content" sx={{ marginLeft: (isCollapsed ? "20px" : "70px") }}>
                <Topbar/>
                <Outlet/>
            </Box>
        </Box>
    );
};

const routes = [
    {
        element: (
            <AuthGuard>
                <Layout/>
            </AuthGuard>
        ),
        children: [
            // dashboard route
            {path: "/", element: <Home />},
            // Send Package route
            {path: "/sendColis", element: <SendColis />},
            // Send Resume route
            {path: "/sendResume", element: <SendResume />},
            // Track route
            {path: "/track", element: <Track />},
        ]
    },

    // session pages route
    {path: "/login", element: <SignIn/>},
];

export default routes;