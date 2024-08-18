import AuthGuard from "./auth/AuthGuard";
import { Outlet } from "react-router-dom";
import { authRoles } from "./auth/authRoles";

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

const routes = [
    {
        element: (
            <AuthGuard>
                <div className="app">
                    <Sidebar/>
                    <main className="content">
                        <Topbar/>
                        <Outlet />
                    </main>
                </div>
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