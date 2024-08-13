import { useState } from 'react'
import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import LanguageIcon from '@mui/icons-material/Language';
import {Logout} from "@mui/icons-material";
import useAuth from "../../hooks/useAuth";
import ReactCountryFlag from "react-country-flag";
import useLang from "../../hooks/useLang";

const Topbar = () => {
    const {lang, changeLang, translate} = useLang();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const { logout } = useAuth();

    const [anchorElUserMenu, setAnchorElUserMenu] = useState(null);
    const isOpenUserMenu = Boolean(anchorElUserMenu);
    const handleClickUserMenu = (event) => setAnchorElUserMenu(event.currentTarget);
    const handleCloseUserMenu = () => {
        setAnchorElUserMenu(null);
    };
    const handleLogout = () => {
        logout();
        setAnchorElUserMenu(null);
    };
    const [anchorElLangMenu, setAnchorElLangMenu] = useState(null);
    const handleClickLangMenu = (event) => setAnchorElLangMenu(event.currentTarget);
    const isOpenLangMenu = Boolean(anchorElLangMenu);
    const handleCloseLangMenu = () => {
        setAnchorElLangMenu(null);
    };
    const handleChangeLangMenu = (lang) => {
        console.log(lang);
        changeLang(lang);
        setAnchorElLangMenu(null);
    };

    return (<Box display="flex" justifyContent="space-between" p={2}>
        {/* Search bar */}
        <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">
            <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Recherche"></InputBase>
            <IconButton type="button" sx={{ p: 1}}>
                <SearchIcon />
            </IconButton>
        </Box>

        {/* ICONS */}
        <Box display="flex">
            <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === "dark" ? (
                    <DarkModeOutlinedIcon />
                ) : (
                    <LightModeOutlinedIcon />
                )}
            </IconButton>
            <IconButton>
                <NotificationsOutlinedIcon />
            </IconButton>
            <IconButton onClick={handleClickLangMenu}>
                <LanguageIcon />
            </IconButton>
            <IconButton onClick={handleClickUserMenu}>
                <PersonOutlinedIcon />
            </IconButton>
        </Box>

        {/* Language Menu */}
        <Menu
            anchorEl={anchorElLangMenu}
            open={isOpenLangMenu}
            onClose={handleCloseLangMenu}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
            <MenuItem onClick={() => handleChangeLangMenu('fr')}>
                <ListItemText>
                    <ReactCountryFlag countryCode="FR" />
                </ListItemText>
                <ListItemText sx={{ ml: 2 }}>
                    Fr
                </ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleChangeLangMenu('en')}>
                <ListItemText>
                    <ReactCountryFlag countryCode="US" />
                </ListItemText>
                <ListItemText sx={{ ml: 2 }}>
                    En
                </ListItemText>
            </MenuItem>
        </Menu>

        {/* USER Menu */}
        <Menu
            anchorEl={anchorElUserMenu}
            open={isOpenUserMenu}
            onClose={handleCloseUserMenu}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
            <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                <ListItemText>
                    {translate("header.logout")}
                </ListItemText>
            </MenuItem>
        </Menu>
    </Box>);
}

export default Topbar;