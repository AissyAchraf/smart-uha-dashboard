import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens export
export const tokens = (mode) => ({
    ...(mode === "dark"
        ? {
            grey: {
                100: "#2c2c2c",
                200: "#242424",
                300: "#1e1e1e",
                400: "#171717",
                500: "#121212",
                600: "#0d0d0d",
                700: "#090909",
                800: "#050505",
                900: "#020202",
            },
            primary: {
                100: "#0E1B30",  // A very dark shade of Oxford Blue for backgrounds
                200: "#0B1525",
                300: "#08101A",
                // 400: "27374D",
                400: "#27A6F0",
                500: "#05133A",  // Oxford Blue as the main tone
                600: "#04112F",  // Slightly darker Oxford Blue
                700: "#030E25",  // Darker variant for depth
                800: "#020A1B",  // Deep Oxford Blue for background usage
                900: "#010611",  // Nearly black, very dark blue
            },
            greenAccent: {
                100: "#1c5c43",
                200: "#174d37",
                300: "#113e2c",
                400: "#0c3021",
                500: "#073217",
                600: "#05260d",
                700: "#041d0b",
                800: "#031409",
                900: "#010a05",
            },
            redAccent: {
                100: "#4a0e0e",
                200: "#3c0b0b",
                300: "#2e0808",
                400: "#200606",
                500: "#120404",
                600: "#0d0303",
                700: "#090202",
                800: "#050101",
                900: "#020000",
            },
            blueAccent: {
                100: "#0d3e5d",
                200: "#0b3451",
                300: "#0a2a44",
                400: "#082137",
                500: "#051f34",  // Close to Oxford Blue but slightly varied for depth
                600: "#04182b",
                700: "#031223",
                800: "#020d1a",
                900: "#04182b",
            },
            common: {
                white: "#FFFFFF",  // White for contrasts
                offWhite: "#E0E0E0" // A light grey for slightly off-white elements
            }
        }
        : {
            // Light mode as defined in your original setup
            grey: {
                100: "#e0e0e0",
                200: "#c2c2c2",
                300: "#a3a3a3",
                400: "#858585",
                500: "#666666",
                600: "#525252",
                700: "#3d3d3d",
                800: "#292929",
                900: "#141414",
            },
            primary: {
                100: "#E3EEFC",  // Alice Blue
                200: "#A9D5F6",  // Lightened mix of Picton Blue for contrast
                300: "#73C3F3",  // A slightly deeper Picton Blue shade
                400: "#27A6F0",  // Picton Blue
                500: "#05133A",  // Oxford Blue (used as the main dark tone)
                600: "#04112F",  // Slightly darker Oxford Blue
                700: "#030E25",  // Darker variant for depth
                800: "#020A1B",  // Deep Oxford Blue for background usage
                900: "#010611",  // Nearly black, very dark blue
            },
            greenAccent: {
                100: "#dbf5ee",  // Keeping existing greenAccent colors
                200: "#b7ebde",
                300: "#94e2cd",
                400: "#70d8bd",
                500: "#4cceac",
                600: "#3da58a",
                700: "#2e7c67",
                800: "#1e5245",
                900: "#0f2922",
            },
            redAccent: {
                100: "#f8dcdb",  // Keeping existing redAccent colors
                200: "#f1b9b7",
                300: "#e99592",
                400: "#e2726e",
                500: "#db4f4a",
                600: "#af3f3b",
                700: "#832f2c",
                800: "#58201e",
                900: "#2c100f",
            },
            blueAccent: {
                100: "#E3EEFC",  // Alice Blue for lighter blue shades
                200: "#C5E2F9",  // Light blend with Picton Blue
                300: "#A6D7F5",  // Mid-range between Alice Blue and Picton Blue
                400: "#87CBF2",  // Blending towards Picton Blue
                500: "#27A6F0",  // Picton Blue as the primary accent
                600: "#2092D3",  // Darker variant of Picton Blue
                700: "#1A7EB7",  // Further darkened
                800: "#146A9B",  // Continuing deeper
                900: "#0F567E",  // Deepest blue accent
            },
            common: {
                white: "#FFFFFF",  // White
                offWhite: "#FEFEFE" // Close to white
            }
        }),
});

// mui theme settings
export const themeSettings = (mode) => {
    const colors = tokens(mode);
    return {
        palette: {
            mode: mode,
            ...(mode === "dark"
                ? {
                    // palette values for dark mode
                    primary: {
                        main: colors.primary[400],
                    },
                    secondary: {
                        main: colors.greenAccent[500],
                    },
                    neutral: {
                        dark: colors.grey[700],
                        main: colors.grey[500],
                        light: colors.grey[100],
                    },
                    background: {
                        default: colors.grey[200],
                    },
                }
                : {
                    // palette values for light mode
                    primary: {
                        main: colors.primary[100],
                    },
                    secondary: {
                        main: colors.greenAccent[500],
                    },
                    neutral: {
                        dark: colors.grey[700],
                        main: colors.grey[500],
                        light: colors.grey[100],
                    },
                    background: {
                        default: "#fcfcfc",
                    },
                }),
        },
        typography: {
            fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 14,
            },
        },
    };
};

// context for color mode
export const ColorModeContext = createContext({
    toggleColorMode: () => {},
});

export const useMode = () => {
    const activeTheme = localStorage.getItem("theme") === "dark"  ? "dark" : "light";
    const [mode, setMode] = useState(activeTheme);

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                localStorage.setItem('theme', (activeTheme === "light" ? "dark" : "light"));
                setMode((prev) => (prev === "light" ? "dark" : "light"))
            }
        }),
        []
    );

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    return [theme, colorMode];
};