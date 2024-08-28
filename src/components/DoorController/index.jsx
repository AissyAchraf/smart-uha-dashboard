import { Box, Button, Card, CardContent, Modal, Typography, Grid, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import useLang from "../../hooks/useLang";
import API from "../../utils/api";

const DoorStates = {
    Error: 0,
    Closed: 1,
    Unlocked: 2,
    Opened: 3,
    Deactivated: 4
};

const DoorController = ({ doors = [], vehicle }) => {
    const [doorClasses, setDoorClasses] = useState([]);
    const [selectedDoor, setSelectedDoor] = useState(null);
    const { translate } = useLang();
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const getDoorClasses = (doors) => {
        if(!Array.isArray(doors)) { return []; }
        return doors.map((door) => {
            switch(door) {
                case DoorStates.Closed:
                    return "closed";
                case DoorStates.Unlocked:
                    return "unlocked";
                case DoorStates.Opened:
                    return "opened";
                case DoorStates.Deactivated:
                    return "deactivated";
                default:
                    console.log("DoorMonitor Warning: wrong door state when parsing props!");
                    return "";
            }
        });
    }

    const handleOpenDoor = () => {
        API.forceOpen({door: {Index: selectedDoor.index, Value: true}, vehicle: vehicle})
            .catch(err => console.log(`response error: ${err}`));
        handleClose();
    }

    const handleCloseDoor = () => {
        API.forceOpen({door: {Index: selectedDoor.index, Value: false}, vehicle: vehicle})
            .catch(err => console.log(`response error: ${err}`));
        handleClose();
    }

    const handleDeactivateDoor = () => {
        API.deactivateDoor(vehicle, selectedDoor.index)
            .catch(err => console.log(`response error: ${err}`));
        handleClose();
    }

    const handleActivateDoor = () => {
        API.deactivateDoor(vehicle, selectedDoor.index)
            .catch(err => console.log(`response error: ${err}`));
        handleClose();
    }

    useEffect(() => {
        setDoorClasses(getDoorClasses(doors));
    }, [doors]);

    const handleClick = (door, index) => {
        const doorState = doorClasses[index];
        setSelectedDoor({ name: door, state: doorState, index: index });
        setOpen(true);
    }

    const doorControllerModal = (
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
                    <Typography variant="h2" fontWeight="bold" id="modal-title">
                        {`${translate("admin.vehicle.doorControllerModal.title")} : ${selectedDoor?.name}`}
                    </Typography>
                    <Typography variant="body1" id="modal-description" sx={{ mt: 2 }}>
                        {`Status: ${selectedDoor?.state}`}
                    </Typography>
                    <Box>
                        <Box display="flex" justifyContent="center" gap={2} mt={4}>
                            {selectedDoor?.state === "closed" && (
                                <Button
                                    onClick={handleOpenDoor}
                                    sx={{
                                        flexGrow: 1,
                                        py: 1.5,
                                        backgroundColor: 'gray',
                                        color: "white",
                                        textAlign: 'center',
                                    }}
                                >
                                    Open
                                </Button>
                            )}
                            {selectedDoor?.state === "opened" && (
                                <Button
                                    onClick={handleCloseDoor}
                                    sx={{
                                        flexGrow: 1,
                                        py: 1.5,
                                        backgroundColor: 'gray',
                                        color: "white",
                                        textAlign: 'center',
                                    }}
                                >
                                    Close
                                </Button>
                            )}
                        </Box>

                        <Box display="flex" justifyContent="center" gap={2} mt={4}>
                            {selectedDoor?.state !== "opened" && selectedDoor?.state !== "deactivated" && (
                                <Button
                                    onClick={handleDeactivateDoor}
                                    sx={{
                                        flexGrow: 1,
                                        py: 1.5,
                                        backgroundColor: 'gray',
                                        color: "white",
                                        textAlign: 'center',
                                    }}
                                >
                                    Deactivate
                                </Button>
                            )}
                            {selectedDoor?.state === "deactivated" && (
                                <Button
                                    onClick={handleActivateDoor}
                                    sx={{
                                        flexGrow: 1,
                                        py: 1.5,
                                        backgroundColor: 'gray',
                                        color: "white",
                                        textAlign: 'center',
                                    }}
                                >
                                    Activate
                                </Button>
                            )}
                        </Box>

                        <Button onClick={handleClose} sx={{ px: 2, mt: 5, backgroundColor: theme.palette.info.main, color: "white" }}>
                            Close
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Modal>
    );

    const doorController = (
        <Box m={2} width="100%" display="flex" backgroundColor="white" justifyContent="center">
            {/* Side Door */}
            <Box
                sx={{
                    margin: 2,
                    '&:hover': {
                        backgroundColor: 'darkgray',
                    },
                }}
                className={`side-door ${doorClasses[4] || ""}`}
                onClick={() => handleClick('side-door', 4)}
            ></Box>

            {/* Back Doors */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: 4,
                    padding: '5px',
                }}
                className="back-doors"
            >
                {/* Top Doors */}
                <Grid sx={{ display: 'flex' }} justifyContent="center" className="top-doors">
                    <Grid sx={{ m: '3px' }} item>
                        <Box
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'darkgray',
                                },
                            }}
                            className={`door left-door ${doorClasses[0] || ""}`}
                            onClick={() => handleClick('left-top', 0)}
                        ></Box>
                    </Grid>
                    <Grid sx={{ m: '3px' }} item>
                        <Box
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'darkgray',
                                },
                            }}
                            className={`door right-door ${doorClasses[1] || ""}`}
                            onClick={() => handleClick('right-top', 1)}
                        ></Box>
                    </Grid>
                </Grid>

                {/* Bottom Doors */}
                <Grid justifyContent="center" className="bottom-doors" sx={{ display: 'flex' }}>
                    <Grid sx={{ m: '3px' }} item>
                        <Box
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'darkgray',
                                },
                            }}
                            className={`door left-door ${doorClasses[2] || ""}`}
                            onClick={() => handleClick('left-bottom', 2)}
                        ></Box>
                    </Grid>
                    <Grid sx={{ m: '3px' }} item>
                        <Box
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'darkgray',
                                },
                            }}
                            className={`door right-door ${doorClasses[3] || ""}`}
                            onClick={() => handleClick('right-bottom', 3)}
                        ></Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );

    return (
        <Box>
            {doorController}
            {doorControllerModal}
        </Box>
    );
};

export default DoorController;
