import React from "react";
import { Box, Button, Card, CardContent, Modal, Typography, useTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import useLang from "../../hooks/useLang";
import { useState } from "react";

const ActivityTypes = {
    GoTo: "0",
    TransitPoint: "2"
};

const PlanningMonitor = ({ activities = [], vehicle, vehicleName }) => {
    const { translate } = useLang();
    const [open, setOpen] = useState(false);
    const theme = useTheme();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const renderActivityRow = (activity, index) => {
        const { type, destinationName, demandIds } = activity;
        const activityType = type === ActivityTypes.GoTo ? "GoTo" : "Transit Point";

        return (
            <TableRow key={index} hover>
                <TableCell>{activityType}</TableCell>
                <TableCell>{destinationName}</TableCell>
                <TableCell>
                    {demandIds && demandIds.length > 0 ? (
                        demandIds.map((id, i) => (
                            <Typography key={i}>{id}</Typography>
                        ))
                    ) : (
                        <Typography> - </Typography>
                    )}
                </TableCell>
            </TableRow>
        );
    };

    return (
        <>
            <Button onClick={handleOpen} >{vehicleName}</Button>
            <Modal open={open} onClose={handleClose}>
                <Card
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 600,
                        maxHeight: '80vh',
                        overflowY: 'auto',
                        p: 1,
                    }}
                >
                    <CardContent>
                        <Typography variant="h2" fontWeight="bold">
                            {translate("admin.vehicle.planningMonitorModal.title")}
                        </Typography>
                        <Box mt={4}>
                            {activities.length > 0 ? (
                                <TableContainer component={Paper}>
                                    <Table stickyHeader>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell
                                                    sx={{
                                                        backgroundColor: theme.palette.primary.main,
                                                        color: theme.palette.primary.contrastText,
                                                        fontWeight: 'bold',
                                                    }}
                                                >{translate("admin.vehicle.planningMonitorModal.activityType")}</TableCell>
                                                <TableCell
                                                    sx={{
                                                        backgroundColor: theme.palette.primary.main,
                                                        color: theme.palette.primary.contrastText,
                                                        fontWeight: 'bold',
                                                    }}
                                                >{translate("sendColis.destination")}</TableCell>
                                                <TableCell
                                                    sx={{
                                                        backgroundColor: theme.palette.primary.main,
                                                        color: theme.palette.primary.contrastText,
                                                        fontWeight: 'bold',
                                                    }}
                                                >{translate("admin.vehicle.planningMonitorModal.demands")}</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {activities.map((activity, index) => renderActivityRow(activity, index))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            ) : (
                                <Typography variant="body1" textAlign="center">
                                    {translate("admin.vehicle.noActivities")}
                                </Typography>
                            )}
                        </Box>
                        <Box display="flex" mt={4}>
                            <Button onClick={handleClose} sx={{ backgroundColor: theme.palette.info.main, color: "white" }}>
                                {translate("modal.button.close")}
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Modal>
        </>
    );
};

export default PlanningMonitor;
