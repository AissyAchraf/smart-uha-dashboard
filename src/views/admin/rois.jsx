import React, { useState, useEffect } from "react";
import { Box, Button, useTheme, Badge, IconButton, InputBase, TextField, SwitchProps, Switch } from "@mui/material";
import { styled } from "@mui/system";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { DataGrid } from "@mui/x-data-grid";
import useLang from "../../hooks/useLang";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import API from "../../utils/api";

const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: '#65C466',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color: theme.palette.grey[100],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.7,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: '#E9E9EA',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

const Rois = () => {
    const { translate } = useLang();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [rois, setRois] = useState([]);

    const handleInputChange = (e, rowId) => {
        const { value } = e.target;
        setRois((prevRois) =>
            prevRois.map((roi) =>
                roi._id === rowId ? { ...roi, tempName: value } : roi
            )
        );
    };

    const handleSave = async (rowId, displayName) => {
        try {
            await API.putRoiDisplayName(rowId, displayName);

            setRois((prevRois) =>
                prevRois.map((roi) =>
                    roi._id === rowId ? { ...roi, displayName, tempName: undefined } : roi
                )
            );
        } catch (error) {
            console.error("Error saving name:", error);
        }
    };

    const handleSwitchChange = async (rowId, isChecked) => {
        try {
            await API.putRoiDeliverability(rowId, isChecked);
            setRois((prevRois) =>
                prevRois.map((roi) =>
                    roi._id === rowId ? { ...roi, isDeliveryPoint: isChecked } : roi
                )
            );
        } catch (error) {
            console.error("Error updating delivery point status:", error);
        }
    };

    const columns = [
        {
            field: "supervisorId",
            headerName: translate("admin.roi.supervisorId"),
        },
        {
            field: "name",
            headerName: translate("admin.roi.name"),
            flex: 1,
        },
        {
            field: "displayName",
            headerName: translate("admin.roi.displayName"),
            flex: 1,
            renderCell: (params) => {
                const originalValue = params.value || '';
                const tempValue = params.row.tempName || originalValue;
                const isChanged = tempValue !== originalValue;

                return (
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        backgroundColor={colors.common.white}
                        borderColor="black"
                        border={1}
                        borderRadius="30px"
                        marginTop={2}
                        width="100%"
                    >
                        <InputBase
                            sx={{ ml: 2, flex: 1 }}
                            value={tempValue}
                            onChange={(e) => handleInputChange(e, params.row._id)}
                        />
                        <IconButton
                            type="button"
                            sx={{ p: 1 }}
                            disabled={!isChanged}
                            onClick={() => handleSave(params.row._id, tempValue)}
                        >
                            <SaveOutlinedIcon />
                        </IconButton>
                    </Box>
                );
            },
        },
        {
            field: "isDeliveryPoint",
            headerName: translate("admin.roi.isDeliveryPoint"),
            renderCell: (params) => (
                <IOSSwitch
                    checked={params.value}
                    onChange={(e) => handleSwitchChange(params.row._id, e.target.checked)}
                />
            ),
            flex: 1,
            align: "center",
            headerAlign: 'center',
        }
    ]

    useEffect(() => {
        API.getAdminROIs().then((data) => {
            setRois(data.data);
        }).catch((err) => console.log("error", err));
    }, []);

    return (
        <Box mx="20px" my="30px">
            <Header title={translate("admin.roi.title")} subtitle={translate("admin.roi.subtitle")} />

            <Box
                m="30px 0 0 0"
                height="75vh"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    "& .MuiDataGrid-root": {
                        border: "none",
                        flex: 1,
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
                    loading={rois.length === 0}
                    rows={rois}
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
    );
}

export default Rois;