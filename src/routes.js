import AuthGuard from "./auth/AuthGuard";
import { Outlet } from "react-router-dom";
import { authRoles } from "./auth/authRoles";
import useSidebar from "./hooks/useSidebar";

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
    const { sidebarWidth } = useSidebar(); // Access sidebar width from context

    return (
        <div className="app">
            <Sidebar />
            <main className="content"
                  style={{marginLeft: sidebarWidth, transition: 'margin-left 0.3s ease-in-out'}}>
                <Topbar/>
                <Outlet/>
            </main>
        </div>
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