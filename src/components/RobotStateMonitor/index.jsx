import { useState, useEffect } from 'react';
import { Box, Badge, Button, Card, CardHeader, CardContent, Divider, Modal, Typography, TextField, MenuItem, useTheme } from "@mui/material";
import { RobotStates } from '../../utils/enums/RobotStates';
import useLang from '../../hooks/useLang';
import API from "../../utils/api";

const RobotStateMonitor = ({ RobotState, vehicle, maintenancePoint }) => {
    const [robotState, setRobotState] = useState(null);
    const [badgeClasse, setBadgeClasse] = useState('');
    const { lang, translate } = useLang();
    const theme = useTheme();

    const [selectedRoi, setSelectedRoi] = useState('');
    const [rois, setRois] = useState([]);
    const [currentMaintenancePoint, setCurrentMaintenancePoint] = useState(undefined);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const getRobotState = () => {
        switch (RobotState) {
            case RobotStates.Error:
                return translate("robot.states.error");
            case RobotStates.Available:
                return translate("robot.states.available");
            case RobotStates.Maintenance:
                return translate("robot.states.maintenance");
            case RobotStates.Unavailable:
                return translate("robot.states.unavailable");
            default:
                return "Unkown robot state";
        }
    }

    const getBadgeClasses = () => {
        switch (RobotState) {
            case RobotStates.Error:
                return "red";
            case RobotStates.Available:
                return "green";
            case RobotStates.Maintenance:
                return theme.palette.warning.main;
            case RobotStates.Unavailable:
                return "red";
            default:
                return "gray";
        }
    }

    const handleSelectedRoiChange = (event) => {
        const newValue = event.target.value;

        if (newValue !== '') {
            setSelectedRoi(newValue);
        }
    };

    useEffect(() => {
        API.getAllROIs()
            .then((data) => {
                setRois(data.data);
            });
        setRobotState(getRobotState());
        setBadgeClasse(getBadgeClasses());
        setSelectedRoi(maintenancePoint);

        if(rois.length > 0) {
            let currentMaintenancePoint = rois.find((roi) => roi.supervisorId === maintenancePoint);
            setCurrentMaintenancePoint(currentMaintenancePoint);
        }

    }, [RobotState, lang, maintenancePoint]);

    const robotStateBadge = (
        <Button
            onClick={handleOpen}
            sx={{ padding: 0, minWidth: 0 }}
        >
            <Badge
                sx={{
                    "& .MuiBadge-badge": {
                        color: "white",
                        backgroundColor: badgeClasse,
                        fontSize: "medium",
                        padding: 2,
                    },
                }}
                badgeContent={robotState}
            />
        </Button>
    );

    const updateRobotState = (state) => {
        switch (state) {
            case RobotStates.Available:
                API.changeVehicleStateToAvailable(vehicle);
                break;
            case RobotStates.Maintenance:
                API.changeVehicleStateToMaintenance(vehicle);
                break;
            case RobotStates.Unavailable:
                API.changeVehicleStateToUnavailable(vehicle);
                break;
            default:
                break;
        }
    }

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
                        {translate("robot.stateModal.title")}
                    </Typography>
                    <Box>
                        <Typography id="modal-description" sx={{ mt: 2 }}>
                            {translate("robot.stateModal.body", { robotState })}
                        </Typography>
                        <Box display="flex" justifyContent="center" gap={2} mt={4}>
                            <Button
                                onClick={() => updateRobotState(RobotStates.Available)}
                                sx={{
                                    flexGrow: 1,
                                    py: 1.5,
                                    backgroundColor: 'green',
                                    color: "white",
                                    textAlign: 'center',
                                }}
                            >
                                {translate("robot.states.available")}
                            </Button>
                            <Button
                                onClick={() => updateRobotState(RobotStates.Maintenance)}
                                sx={{
                                    flexGrow: 1,
                                    py: 1.5,
                                    backgroundColor: theme.palette.warning.main,
                                    color: "white",
                                    textAlign: 'center',
                                }}
                            >
                                {translate("robot.states.maintenance")}
                            </Button>
                            <Button
                                onClick={() => updateRobotState(RobotStates.Unavailable)}
                                sx={{
                                    flexGrow: 1,
                                    py: 1.5,
                                    backgroundColor: 'red',
                                    color: "white",
                                    textAlign: 'center',
                                }}
                            >
                                {translate("robot.states.unavailable")}
                            </Button>
                        </Box>

                        <Divider sx={{
                            borderBottom: 2,
                            my: 3,
                        }}/>

                        <Box display="flex" flexDirection="column" justifyContent="center" gap={2} sx={{ mt: 2 }}>
                            <Typography id="modal-description">
                                {currentMaintenancePoint && translate("robot.stateModal.body2", {maintenancePoint: currentMaintenancePoint?.name})}
                            </Typography>
                            <TextField
                                fullWidth
                                type="text"
                                label={translate("admin.labels.rois")}
                                name="roi"
                                sx={{ gridColumn: "span 2"}}
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
                                    <MenuItem id={roi._id} key={roi._id} value={roi.supervisorId}>
                                        ({roi.supervisorId}) {roi.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Button
                                onClick={() => handleChangeMaintenancePoint()}
                                sx={{
                                    flexGrow: 1,
                                    py: 1.5,
                                    backgroundColor: 'gray',
                                    color: "white",
                                    textAlign: 'center',
                                }}
                                disabled={!selectedRoi}
                            >
                                Change
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

    const handleChangeMaintenancePoint = () => {
        API.changeVehicleMaintenancePointTo(vehicle, selectedRoi)
            .catch(err => console.log(`response error: ${err}`));
    }

    return (
        <Box>
            {robotStateBadge}
            {robotSateModal}
        </Box>
    );
}

export default RobotStateMonitor;