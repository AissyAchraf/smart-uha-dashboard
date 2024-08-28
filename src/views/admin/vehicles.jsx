import { useState, useEffect } from "react";
import { Box, useTheme, Badge } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { DataGrid } from "@mui/x-data-grid";
import useLang from "../../hooks/useLang";
import React from "react";
import API from "../../utils/api";
import { DoorStates } from "../../utils/enums/DoorStates";
import BatteryMonitor from "../../components/BatteryMonitor";
import RobotStateMonitor from "../../components/RobotStateMonitor";
import LocalizationMonitor from "../../components/LocalizationMonitor";
import SupervisorMonitor from "../../components/SupervisorMonitor";
import DoorController from "../../components/DoorController";
import PlanningMonitor from "../../components/PlanningMonitor";

const Vehicles = () => {
    const { translate, lang } = useLang();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [vehicles, setVehicles] = useState([]);

    const columns = [
        {
            field: "name", headerName: translate("admin.vehicle.name"),
            renderCell: (params) => <PlanningMonitor activities={params.row.planning} vehicle={params.row._id} vehicleName={params.row.name}/>
        },
        {
            field: "supervisorURL",
            headerName: translate("admin.vehicle.supervisorURL"),
            flex: 1,
            renderCell: (params) => <a href={params.value} style={{ color:"blue" }}>{params.value}</a>
        },
        {
            field: "available",
            headerName: translate("admin.vehicle.availableLabel"),
            flex: 1,
            align: "center",
            renderCell: (params) => <RobotStateMonitor RobotState={params.value} vehicle={params.row._id} maintenancePoint={params.row.maintenancePoint}/>
        },
        {
            field: "batteryState",
            headerName: translate("admin.vehicle.battery"),
            flex: 1,
            width: "50px",
            renderCell: (params) => <BatteryMonitor batteryState={params.value} batteryLimits={params.row.batteryLimits}></BatteryMonitor>
        },
        {
            field: "supervisorState",
            headerName: translate("admin.vehicle.supervisor"),
            flex: 1,
            renderCell: (params) => <SupervisorMonitor SupervisorState={params.value}/>
        },
        {
            field: "localization",
            headerName: translate("admin.vehicle.localization"),
            flex: 1,
            renderCell: (params) => <LocalizationMonitor SupervisorState={params.row.supervisorState}/>
        },
        {
            field: "ioState",
            headerName: translate("admin.vehicle.boxes"),
            flex: 1,
            renderCell: (params) => {
                const { DIn } = params.value;
                const doors = params.row.boxes.map((box, index) => {
                    if (box.deactivated) {
                        return DoorStates.Deactivated;
                    } else {
                        if(DIn[index]) {
                            return DoorStates.Closed;
                        } else {
                            return DoorStates.Opened;
                        }
                        return DoorStates.Error;
                    }
                });

                return (
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "80px",
                        height: "80px",
                        paddingTop: "1em",
                        paddingBottom: "1.5em"
                    }}>
                        <div style={{ transform: "scale(0.34)" }}>
                            <DoorController doors={doors} vehicle={params.row._id} />
                        </div>
                    </div>
                );
            }
        },
        {
            field: "lastConnectionTime",
            headerName: translate("admin.vehicle.lastSeen"),
            flex: 1,
            valueGetter: (params) => formatDate(params),
        }
    ];

    const updateVehicles = () => {
        return API.getAdminVehicles()
            .then(data => {
                setVehicles(data.data);
            });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            updateVehicles();
        }, 2000);

        return () => clearInterval(interval);
    }, [vehicles]);

    return (
        <Box mx="20px" my="30px">
            <Header title={translate("admin.vehicle.title")} subtitle={translate("admin.vehicle.subtitle")}></Header>

            <Box
                m="30px 0 0 0"
                height="75vh"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.redAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.redAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                }}
            >
                <DataGrid
                    loading={vehicles.length === 0}
                    rows={vehicles}
                    columns={columns}
                    getRowId={(row) => row._id}
                    rowHeight={80}
                    sx={{
                        display: 'grid',
                        gridTemplateRows: 'auto 1f auto',
                    }}
                    disableSelectionOnClick
                />
            </Box>
        </Box>
    )
}

const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

export default Vehicles;