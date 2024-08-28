import { useState, useEffect } from "react";
import { Box, Badge, Select, Button, Card, CardContent, Divider, Modal, Typography, TextField, MenuItem, useTheme } from "@mui/material";
import API from "../../utils/api";
import useLang from "../../hooks/useLang";

const SupervisorMonitor = ({ SupervisorState }) => {
    const [distination, setDistination] = useState("");
    const [statusName, setStatusName] = useState("");
    const [supervisorStateBadgeClasse, setSupervisorStateBadgeClasse] = useState("");
    const [rois, setRois] = useState([]);
    const { translate } = useLang();
    const theme = useTheme();

    const [selectedRoi, setSelectedRoi] = useState('');

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const getSupervisorStateBadgeClasse = (status) => {
        switch (status) {
            case 1:
                return "green";
            case 2:
                return "purple";
            case 3:
                return "orange";
            case 4:
                return "red";
            default:
                return "black";
        }
    }

    const getStatus = (status) => {
        switch(status){
            case 1:
                return "Ready";
            case 2:
                return "Executing";
            case 3:
                return "Waiting";
            case 4:
                return "Error";
            default:
                return "Unrecognized";
        }
    };

    const statusMonitor = (
        // <Box display="flex" alignItems="center" flex={1}>
        //     <Box display="flex" alignItems="center">status:</Box>
            <Button
                onClick={handleOpen}
                sx={{ padding: 0, minWidth: 0 }}
            >
                <Badge
                    display="flex"
                    sx={{
                        ml: 8,
                        "& .MuiBadge-badge": {
                            color: "white",
                            backgroundColor: supervisorStateBadgeClasse,
                            fontSize: "medium",
                            padding: 2
                        },
                    }}
                    badgeContent={statusName}
                />
            </Button>
        // </Box>
    );

    const handleDock = () => {
        API.putVehicleSupervisorDock(SupervisorState.vehicleId)
            .catch(err => console.log(`response error: ${err}`));
        handleClose();
    }

    const handleUndock = () => {
        API.putVehicleSupervisorUndock(SupervisorState.vehicleId)
            .catch(err => console.log(`response error: ${err}`));
        handleClose();
    }

    const handleRestartSupervisor = () => {
        API.putVehicleSupervisorRestart(SupervisorState.vehicleId)
            .catch(err => console.log(`response error: ${err}`));
        handleClose();
    }

    const getDestination = () => {
        const currentId = SupervisorState.CurrentId;
        const targetId = SupervisorState.TargetId;

        const current = rois.find(roi => roi.supervisorId === currentId)?.name || currentId;
        const target = rois.find(roi => roi.supervisorId === targetId)?.name || targetId;

        let stationed = current === target;

        setDistination(current);
    }

    const handleSelectedRoiChange = (event) => {
        const newValue = event.target.value;

        if (newValue !== '') {
            setSelectedRoi(newValue);
        }
    };

    const robotSateModal = (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Card sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 500,
                p: 1,
            }}>
                <CardContent>
                    <Typography variant="h2" fontWeight="bold">
                        {translate("admin.vehicle.supervisorModal.title")}
                    </Typography>
                    <Box>
                        <Box display="flex" justifyContent="center" gap={2} mt={4}>
                            <Button
                                onClick={() => handleDock()}
                                sx={{
                                    flexGrow: 1,
                                    py: 1.5,
                                    backgroundColor: 'gray',
                                    color: "white",
                                    textAlign: 'center',
                                }}
                            >
                                {translate("admin.vehicle.supervisorModal.dock")}
                            </Button>
                            <Button
                                onClick={() => handleUndock()}
                                sx={{
                                    flexGrow: 1,
                                    py: 1.5,
                                    backgroundColor: 'gray',
                                    color: "white",
                                    textAlign: 'center',
                                }}
                            >
                                {translate("admin.vehicle.supervisorModal.undock")}
                            </Button>
                        </Box>
                        <Box display="flex" justifyContent="center" gap={2} mt={2}>
                            <Button
                                onClick={() => handleRestartSupervisor()}
                                sx={{
                                    flexGrow: 1,
                                    py: 1.5,
                                    backgroundColor: 'red',
                                    color: "white",
                                    textAlign: 'center',
                                }}
                            >
                                {translate("admin.vehicle.supervisorModal.restart")}
                            </Button>
                        </Box>

                        <Divider sx={{
                            borderBottom: 2,
                            my: 3,
                        }}/>

                        <Box display="flex" flexDirection="column" justifyContent="center" gap={2} mt={2}>
                            <TextField
                                fullWidth
                                type="text"
                                label={translate("admin.labels.rois")}
                                name="roi"
                                sx={{ gridColumn: "span 2" }}
                                value={selectedRoi}
                                onChange={handleSelectedRoiChange}
                                SelectProps={{
                                    MenuProps: {
                                        PaperProps: {
                                            sx: {
                                                maxHeight: 200,
                                            },
                                        },
                                    },
                                }}
                                select
                            >
                                <MenuItem value="" disabled>
                                    Select a point
                                </MenuItem>
                                {rois.map((roi) => (
                                    <MenuItem id={roi._id} key={roi._id} value={roi._id}>
                                        ({roi.supervisorId}) {roi.name}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <Button
                                onClick={() => handleSupevisorReach()}
                                sx={{
                                    flexGrow: 1,
                                    py: 1.5,
                                    backgroundColor: 'gray',
                                    color: "white",
                                    textAlign: 'center',
                                    mt: 0.5,
                                }}
                                disabled={!selectedRoi}
                            >
                                Reach
                            </Button>

                            <Button
                                onClick={() => handleSupevisorAcknowledge()}
                                sx={{
                                    flexGrow: 1,
                                    py: 1.5,
                                    backgroundColor: 'gray',
                                    color: "white",
                                    textAlign: 'center',
                                    mt: 0.5,
                                }}
                                disabled={!selectedRoi}
                            >
                                Acknowledge
                            </Button>

                            <Button
                                onClick={() => handleSupevisorReset()}
                                sx={{
                                    flexGrow: 1,
                                    py: 1.5,
                                    backgroundColor: 'gray',
                                    color: "white",
                                    textAlign: 'center',
                                    mt: 0.5,
                                }}
                                disabled={!selectedRoi}
                            >
                                Reset
                            </Button>
                        </Box>
                        <Button onClick={handleClose} sx={{ px: 2, mt: 5, backgroundColor: theme.palette.info.main, color: "white" }}>
                            {translate("modal.button.close")}
                        </Button>
                    </Box>
                </CardContent>
            </Card>

        </Modal>
    );

    const handleSupevisorReach = () => {
        API.putVehicleSupervisorReach(SupervisorState.vehicleId, selectedRoi)
            .catch(err => console.log(`response error: ${err}`));
    }

    const handleSupevisorAcknowledge = () => {
        API.putVehicleSupervisorAcknowledge(SupervisorState.vehicleId, selectedRoi)
            .catch(err => console.log(`response error: ${err}`));
    }

    const handleSupevisorReset = () => {
        API.putVehicleSupervisorReset(SupervisorState.vehicleId, selectedRoi)
            .catch(err => console.log(`response error: ${err}`));
    }

    useEffect(() => {
        API.getAllROIs()
            .then((data) => {
                setRois(data.data);
            });
        setStatusName(getStatus(SupervisorState.Status));
        setSupervisorStateBadgeClasse(getSupervisorStateBadgeClasse(SupervisorState.Status));
        getDestination();
    }, [SupervisorState]);

    return (
        // <Box display="flex" alignItems="center" flex={1}>
        //     <Box display="flex" alignItems="center" marginRight={1}>{distination}</Box>
        //     <Box display="flex" alignItems="center">{statusMonitor}</Box>
        // </Box>
        // <>{statusMonitor}</>
        <Box>
            <>{statusMonitor}</>
            <>{robotSateModal}</>
        </Box>
    );
}

export default SupervisorMonitor;