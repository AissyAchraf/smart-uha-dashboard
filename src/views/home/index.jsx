import {Box, Paper, Grid, useTheme, Badge} from "@mui/material";
import Header from "../../components/Header";
import useLang from "../../hooks/useLang";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import React, { useEffect, useState, useMemo } from "react";
import API from "../../utils/api";
import DoorMonitor from "../../components/DoorMonitor";
import { DoorStates } from "../../utils/enums/DoorStates";
import { enUS, frFR } from '@mui/x-data-grid/locales';
import { DemandStates } from "../../utils/enums/DemandStates";

const Home = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { lang, translate } = useLang();
    const [demands, setDemands] = useState([]);

    const getDemandStateClass = (state) => {
        let status = "demand-error";
        if(state === DemandStates.Livre) {
            status = "demand-complete";
        } else if(state >= DemandStates.AttenteRecuperation && state < DemandStates.Livre) {
            status = "demand-ongoing";
        } else if(state >= DemandStates.AConfirmer && state < DemandStates.AttenteRecuperation){
            status = "demand-pending";
        } else if(state >= DemandStates.ErreurAnnulePacketPresent) {
            status = "demand-error";
        }
        return status;
    }

    const getDemandStateBadge = (state) => {
        let status = "";
        let classes = "red";
        if(state === DemandStates.Livre) {
            status = "admin.demand.completed";
            classes = "green";
        } else if(state >= DemandStates.AttenteRecuperation && state < DemandStates.Livre) {
            status = "admin.demand.ongoing";
            classes = "teal";
        } else if(state >= DemandStates.AConfirmer && state < DemandStates.AttenteRecuperation){
            status = "admin.demand.onhold";
            classes = "blue";
        } else if(state === DemandStates.ErreurAnnulePacketPresent) {
            status = "admin.demand.errorCancelledPackageStillIn";
            classes = "red";
        } else if (state === DemandStates.ErreurRecuperationOuvertureTimedOut) {
            status = "admin.demand.errorPickupDoorOpeningTimedOut";
            classes = "red";
        } else if (state === DemandStates.ErreurRecuperationFermetureTimedOut) {
            status = "admin.demand.errorPickupDoorClosingTimedOut";
            classes = "red";
        } else if (state === DemandStates.ErreurRecuperationValidationTimeOut) {
            status = "admin.demand.errorPickupValidationTimedOut";
            classes = "red";
        } else if (state === DemandStates.ErreurLivraisonOuvertureTimedOut) {
            status = "admin.demand.errorDeliveryDoorOpeningTimedOut";
            classes = "red";
        } else if (state === DemandStates.ErreurLivraisonFermetureTimedOut) {
            status = "admin.demand.errorDeliveryDoorClosingTimedOut";
            classes = "red";
        } else if(state === DemandStates.Annulee){
            status = "admin.demand.cancellation";
            classes = "red";
        } else if (state === DemandStates.ErreurLivraisonValidationTimeOut) {
            status = "admin.demand.errorDeliveryValidationTimedOut";
            classes = "red";
        }
        return {status, classes};
    }

    const CustomGridRow = React.memo((props) => {
        const { status, classes } = getDemandStateBadge(props.value);
        return (
            <Badge
                sx={{
                    "& .MuiBadge-badge": {
                        color: "white",
                        backgroundColor: classes,
                        width: 100,
                    },
                }}
                badgeContent={translate(status)}
            />
        );
    });

    const columns = [
        { field: "_id", headerName: "ID" },
        {
            field: "state",
            headerName: translate("admin.demand.state"),
            flex: 1,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => <CustomGridRow {...params} />
        },
        {
            field: "box",
            headerName: translate("admin.demand.box"),
            flex: 1,
            renderCell: (params) => {
                const boxNumber = params.value ?? 'none';
                const closed = DoorStates.Closed;
                let doors = [closed, closed, closed, closed, closed];

                if (boxNumber !== 'none') {
                    doors[boxNumber] = DoorStates.Opened;
                }

                return (
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "60px",
                        height: "70px",
                        paddingTop: "0.5em",
                        paddingBottom: "1.7em"
                    }}>
                        <div style={{transform: "scale(0.2)"}}>
                            <DoorMonitor doors={doors}></DoorMonitor>
                        </div>
                    </div>
                );
            },
        },
        {
            field: "depositLocation",
            headerName: translate("admin.demand.origin"),
            flex: 1,
            valueGetter: (params) => {
                return params.name + '' || '';
            },
        },
        {
            field: "withdrawalLocation",
            headerName: translate("admin.demand.destination"),
            flex: 1,
            valueGetter: (params) => {
                return params.name + '' || '';
            },
        },
        {
            field: "createdAt",
            headerName: translate("admin.demand.createdAt"),
            type: "dateTime",
            flex: 1,
            headerAlign: "left",
            align: "left",
            valueGetter: (timestamp) => {return new Date(timestamp)}
        },
        {
            field: "updatedAt",
            headerName: translate("admin.demand.updatedAt"),
            type: "dateTime",
            flex: 1,
            headerAlign: "left",
            align: "left",
            valueGetter: (params) => {return new Date(params)}
        },
        {
            field: "dueAt",
            headerName: translate("admin.demand.dueAt"),
            type: "dateTime",
            flex: 1,
            headerAlign: "left",
            align: "left",
            valueGetter: (params) => {return new Date(params)}
        }
    ];

    const cachedColumns = useMemo(() => columns, [columns]);

    useEffect( () => {
        API.getDemands().then((data) => {setDemands(data.data);});
    }, []);

    return (
        <Box mx="20px" my="30px">
            <Header title={translate('header.home')} subtitle={translate('home.welcome')} />

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
                        backgroundColor: colors.primary[100],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.blueAccent[900]} !important`,
                    },
                }}
            >
                <DataGrid
                    loading={demands.length === 0}
                    checkboxSelection
                    rows={demands}
                    columns={cachedColumns}
                    getRowId={(row) => row._id}
                    sx={{
                        display: 'grid',
                        gridTemplateRows: 'auto 1f auto',
                    }}
                />
            </Box>
        </Box>
    );
}

export default Home;