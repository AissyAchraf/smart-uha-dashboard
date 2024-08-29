import { useState, useContext, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import IosShareIcon from '@mui/icons-material/IosShare';
import TrackChangesOutlinedIcon from '@mui/icons-material/TrackChangesOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import MonitorHeartOutlinedIcon from '@mui/icons-material/MonitorHeartOutlined';
import useAuth from "../../hooks/useAuth";
import useLang from "../../hooks/useLang";
import { useLocation } from 'react-router-dom';
import useSidebar from "../../hooks/useSidebar";
import Drawer from '@mui/material/Drawer';
import { useMediaQuery } from "@mui/material";

const Item = ({ id, title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <MenuItem
            active={selected === id}
            style={{
                color: colors.grey[100],
            }}
            onClick={() => setSelected(id)}
            icon={icon}
            width="100%"
        >
            <Typography>{title}</Typography>
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
        if (path === "/") {
            setSelected("Home");
        } else if (path === "/sendColis") {
            setSelected("SendColis");
        } else if (path === "/track") {
            setSelected("Track");
        } else if (path === "/sendResume") {
            setSelected("SendResume");
        } else if (path === "/vehicles") {
            setSelected("Vehicles");
        } else if (path === "/rois") {
            setSelected("Rois");
        } else if (path === "/supervisor") {
            setSelected("Supervisor");
        }
    }, [location]);

    const SidebarContent = (
        <Box
            sx={{
                width: "100%",
                height: "100vh",
                minHeight: "100%",
                position: "fixed",
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`,
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
                    color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                },
            }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    <MenuItem
                        onClick={toggleSidebar}
                        icon={isCollapsed ? (<Box
                                                component="img"
                                                src="assets/illustrations/robot_icon.png"
                                                sx={{
                                                    borderRadius: "10px",
                                                }}
                                            />) : undefined}
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
                                    color={colors.grey[100]}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
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
                                        <MenuOutlinedIcon />
                                    </IconButton>
                                )}

                            </Box>
                        )}
                    </MenuItem>

                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item
                            id="Home"
                            title={translate('header.home')}
                            to="/"
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Item
                            id="SendColis"
                            title={translate('home.sendPack')}
                            to="/sendColis"
                            icon={<IosShareIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Item
                            id="Track"
                            title={translate('track.ongoing')}
                            to="/track"
                            icon={<TrackChangesOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Item
                            id="Vehicles"
                            title={translate('admin.labels.vehicles')}
                            to="/vehicles"
                            icon={<LocalShippingOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Item
                            id="Rois"
                            title={translate('admin.labels.rois')}
                            to="/rois"
                            icon={<FmdGoodOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Item
                            id="Supervisor"
                            title={translate('admin.labels.supervisor')}
                            to="/supervisor"
                            icon={<MonitorHeartOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
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
