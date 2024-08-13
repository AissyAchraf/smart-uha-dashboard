import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useRoutes } from "react-router-dom";

// ALL CONTEXTS
import { AuthProvider } from "./contexts/AuthContext";
import { LoadingProvider } from "./contexts/LoadingContext";
import { LangProvider } from "./contexts/LangContext";
import routes from "./routes";
import Sidebar from "./views/global/Sidebar";
import Topbar from "./views/global/Topbar";

function App() {
    const content = useRoutes(routes);
    const [theme, colorMode] = useMode();

    return (
        // <LoadingProvider>
            <LangProvider>
                <AuthProvider>
                    <ColorModeContext.Provider value={colorMode}>
                        <ThemeProvider theme={theme}>
                            <CssBaseline/>
                            {content}
                        </ThemeProvider>
                    </ColorModeContext.Provider>
                </AuthProvider>
            </LangProvider>
        // </LoadingProvider>
    );
}

export default App;
