import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme, useMediaQuery, Drawer } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { tokens } from "../../theme";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import IosShareIcon from '@mui/icons-material/IosShare';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import useAuth from "../../hooks/useAuth";
import useLang from "../../hooks/useLang";
import useSidebar from "../../hooks/useSidebar";

const Item = ({ id, title, to, icon, selected, setSelected, isCollapsed }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <MenuItem
            active={selected === id}
            style={{
                color: colors.common.white,
                margin: '15px 0',
                padding: isCollapsed ? '3px' : '0',
                borderRadius: isCollapsed ? '50%' : '8px',
                backgroundColor: (!isCollapsed && selected === id) ? colors.primary[400] : 'transparent',
            }}
            onClick={() => setSelected(id)}
            icon={
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: isCollapsed ? '45px' : 'auto',
                        height: isCollapsed ? '45px' : 'auto',
                        backgroundColor: isCollapsed && selected === id ? colors.primary[400] : 'transparent',
                        borderRadius: isCollapsed ? '50%' : '0',
                        padding: isCollapsed ? '10px' : '0',
                        transition: 'all 0.3s ease',
                    }}
                >
                    {icon}
                </Box>
            }
            width="100%"
        >
            {!isCollapsed && <Typography sx={{ fontWeight: selected === id ? 'bold' : 'normal' }}>{title}</Typography>}
            <Link to={to} />
        </MenuItem>
    );
};

const Sidebar = () => {
    const { translate } = useLang();
    const { user } = useAuth();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const location = useLocation();
    const { isCollapsed, toggleSidebar } = useSidebar();
    const [selected, setSelected] = useState("Home");
    const isNonMobile = useMediaQuery("(min-width: 600px)");

    useEffect(() => {
        const path = location.pathname;
        setSelected(path === "/" ? "Home" : path.substring(1).charAt(0).toUpperCase() + path.slice(2));
    }, [location]);

    const SidebarContent = (
        <Box
            sx={{
                width: "100%",
                height: "100vh",
                minHeight: "100%",
                position: "fixed",
                "& .pro-sidebar-inner": {
                    background: `${colors.blueAccent[900]} !important`,
                    width: "100%",
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                    width: "100%",
                },
                "& .pro-inner-item:hover": {
                    color: colors.primary[500],
                },
                "& .pro-menu-item.active": {
                    color: "white !important",
                },
            }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    <MenuItem
                        onClick={toggleSidebar}
                        icon={isCollapsed ? (
                            <Box
                                component="img"
                                src="assets/illustrations/robot_icon.png"
                                sx={{ borderRadius: "10px" }}
                            />
                        ) : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography
                                    variant="h3"
                                    color={colors.common.white}
                                    sx={{ display: 'flex', alignItems: 'center' }}
                                >
                                    <Box
                                        component="img"
                                        src="assets/illustrations/robot_icon.png"
                                        sx={{
                                            borderRadius: "10px",
                                            width: "50px",
                                            height: "50px",
                                            marginRight: "10px"
                                        }}
                                    />
                                    SMART UHA
                                </Typography>
                                {!isNonMobile && (
                                    <IconButton onClick={toggleSidebar}>
                                        <MenuIcon />
                                    </IconButton>
                                )}
                            </Box>
                        )}
                    </MenuItem>

                    <Box
                        marginTop={isCollapsed ? undefined : 5}
                        marginX={isCollapsed ? undefined : "5%"}
                    >
                        <Item
                            id="Home"
                            title={translate('header.home')}
                            to="/"
                            icon={<HomeIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            isCollapsed={isCollapsed}
                        />

                        <Item
                            id="SendColis"
                            title={translate('home.sendPack')}
                            to="/sendColis"
                            icon={<IosShareIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            isCollapsed={isCollapsed}
                        />

                        <Item
                            id="Track"
                            title={translate('track.ongoing')}
                            to="/track"
                            icon={<TrackChangesIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            isCollapsed={isCollapsed}
                        />

                        <Item
                            id="Vehicles"
                            title={translate('admin.labels.vehicles')}
                            to="/vehicles"
                            icon={<LocalShippingIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            isCollapsed={isCollapsed}
                        />

                        <Item
                            id="Rois"
                            title={translate('admin.labels.rois')}
                            to="/rois"
                            icon={<FmdGoodIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            isCollapsed={isCollapsed}
                        />

                        <Item
                            id="Supervisor"
                            title={translate('admin.labels.supervisor')}
                            to="/supervisor"
                            icon={<MonitorHeartIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            isCollapsed={isCollapsed}
                        />
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );

    return (
        <>
            {isNonMobile ? (
                <Box sx={{ width: isCollapsed ? '80px' : '250px', transition: 'width 0.3s' }}>
                    {SidebarContent}
                </Box>
            ) : (
                <Drawer
                    open={!isCollapsed}
                    onClose={toggleSidebar}
                    anchor="left"
                    sx={{
                        width: "270px",
                        boxSizing: "border-box",
                        "& .MuiDrawer-paper": {
                            color: theme.palette.secondary[200],
                            backgroundColor: theme.palette.background.alt,
                            boxSizing: "border-box",
                            width: "270px",
                        },
                    }}
                >
                    {SidebarContent}
                </Drawer>
            )}
        </>
    );
};

export default Sidebar;
