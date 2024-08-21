import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useRoutes } from "react-router-dom";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// ALL CONTEXTS
import { AuthProvider } from "./contexts/AuthContext";
import { LoadingProvider } from "./contexts/LoadingContext";
import { LangProvider } from "./contexts/LangContext";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { SnackbarProvider } from './contexts/SnackbarContext';
import { SidebarProvider } from './contexts/SidebarContext';
import { NotificationProvider } from './contexts/NotificationContext';

import routes from "./routes";
import Sidebar from "./views/global/Sidebar";
import Topbar from "./views/global/Topbar";

function App() {
    const content = useRoutes(routes);
    const [theme, colorMode] = useMode();

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <LangProvider>
                <AuthProvider>
                        <SidebarProvider>
                            <SnackbarProvider>
                                <NotificationProvider>
                                    <ColorModeContext.Provider value={colorMode}>
                                        <ThemeProvider theme={theme}>
                                            <CssBaseline/>
                                            {content}
                                        </ThemeProvider>
                                    </ColorModeContext.Provider>
                                </NotificationProvider>
                            </SnackbarProvider>
                        </SidebarProvider>
                </AuthProvider>
            </LangProvider>
        </LocalizationProvider>
    );
}

export default App;
