import React, { useState, useEffect } from "react";
import { Button, Grid, Card, CardContent, Box, Typography, LinearProgress, Modal, TextField, useTheme } from "@mui/material";
import Header from "../../components/Header";
import useLang from "../../hooks/useLang";
import { ResponsiveLine } from '@nivo/line';
import API from "../../utils/api";
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { tokens } from "../../theme";

const KPICard = ({ title, percentage }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Grid item xs={4} md={3} xl={3}>
            <Card>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {title}
                    </Typography>
                    <Grid container alignItems="center">
                        <Grid item xs={12} textAlign="right">
                            <Typography variant="h5" marginBottom={0}>
                                {percentage}%
                            </Typography>
                        </Grid>
                    </Grid>
                    <Box marginTop={3}>
                        <LinearProgress
                            variant="determinate"
                            value={Number(percentage)}
                            sx={{
                                height: 7,
                                backgroundColor: '#e0e0e0',
                                '& .MuiLinearProgress-bar': {
                                    backgroundColor: colors.primary[400],
                                },
                            }}
                        />
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
};

const LineChart = ({ chartData }) => {
    const { translate } = useLang();

    const handleLaunchManuallyGarbageCollector = async () => {
        // Placeholder for garbage collector logic
        // await API.callGarbageCollector();
    };

    return (
        <Grid item xs={12} md={12} xl={12} sx={{ mb: 5 }}>
            <Card>
                <CardContent>
                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        sx={{ width: '100%' }}
                    >
                        <Button
                            size="large"
                            sx={{
                                flex: 'none',
                                textTransform: 'none',
                                backgroundColor: 'orange',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#ff9800',
                                },
                                px: 2,
                            }}
                            startIcon={<RocketLaunchIcon />}
                            onClick={handleLaunchManuallyGarbageCollector}
                        >
                            {translate("admin.supervisor.garbageCollectorLaunchButton")}
                        </Button>
                    </Box>
                    <Box height={400}>
                        <ResponsiveLine
                            data={chartData.map(series => ({
                                ...series,
                                data: series.data.filter(point => point.x !== null && point.y !== null) // Filter out invalid points
                                    .map(point => ({
                                        x: point.x,
                                        y: Number(point.y) // Ensure y is a number
                                    }))
                            }))}
                            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                            xScale={{ type: 'point' }}
                            yScale={{
                                type: 'linear',
                                min: 'auto',
                                max: 'auto',
                                stacked: false,
                                reverse: false,
                            }}
                            axisTop={null}
                            axisRight={null}
                            axisBottom={{
                                orient: 'bottom',
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                legend: 'Time',
                                legendOffset: 36,
                                legendPosition: 'middle',
                            }}
                            axisLeft={{
                                orient: 'left',
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                legend: 'Usage (MB)',
                                legendOffset: -40,
                                legendPosition: 'middle',
                            }}
                            colors={{ scheme: 'nivo' }}
                            pointSize={10}
                            pointColor={{ theme: 'background' }}
                            pointBorderWidth={2}
                            pointBorderColor={{ from: 'serieColor' }}
                            pointLabelYOffset={-12}
                            useMesh={true}
                            legends={[
                                {
                                    anchor: 'bottom-right',
                                    direction: 'column',
                                    justify: false,
                                    translateX: 100,
                                    translateY: 0,
                                    itemsSpacing: 0,
                                    itemDirection: 'left-to-right',
                                    itemWidth: 80,
                                    itemHeight: 20,
                                    itemOpacity: 0.75,
                                    symbolSize: 12,
                                    symbolShape: 'circle',
                                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                                    effects: [
                                        {
                                            on: 'hover',
                                            style: {
                                                itemBackground: 'rgba(0, 0, 0, .03)',
                                                itemOpacity: 1,
                                            },
                                        },
                                    ],
                                },
                            ]}
                        />
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
};

const UpdateDatabaseModal = ({ open, handleClose }) => {
    const { translate } = useLang();
    const theme = useTheme();
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpdateDatabase = () => {
        if (selectedFile) {
            // Placeholder for updating database logic
            handleClose();
        } else {
            alert('Please select a file first.');
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="update-database-modal-title"
            aria-describedby="update-database-modal-description"
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
                        {translate("admin.supervisor.updateDatabaseButton")}
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={2} mt={4}>
                        <TextField
                            fullWidth
                            type="file"
                            inputProps={{ accept: '.json' }}
                            onChange={handleFileChange}
                        />
                        <Button
                            onClick={handleUpdateDatabase}
                            sx={{
                                py: 1.5,
                                backgroundColor: 'green',
                                color: "white",
                                textAlign: 'center',
                                '&:hover': {
                                    backgroundColor: '#228B22',
                                },
                            }}
                        >
                            {translate("modal.button.submit")}
                        </Button>
                        <Button onClick={handleClose} sx={{ px: 2, mt: 3, backgroundColor: theme.palette.info.main, color: "white" }}>
                            {translate("modal.button.close")}
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Modal>
    );
};

const Supervisor = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { translate } = useLang();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [serverCpu, setServerCpu] = useState({
        Idle: 0,
        TotalUsed: 0,
        User: 0,
        Sys: 0,
    });
    const [memoryUsage, setMemoryUsage] = useState({
        rss: 0,
        heapTotal: 0,
        heapUsed: 0,
        external: 0,
        arrayBuffers: 0,
    });

    const [data, setData] = useState({
        rss: [],
        heapTotal: [],
        heapUsed: [],
        external: [],
        arrayBuffers: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cpuResponse = await API.getServerCpuUsed();
                const memoryResponse = await API.getServerMemoryUsed();

                const newCpuData = cpuResponse.data;
                const newMemoryData = memoryResponse.data;

                // Update CPU data
                setServerCpu(newCpuData);

                // Convert memory data from bytes to MB
                const convertedMemoryData = {
                    rss: newMemoryData.rss / (1024 * 1024),
                    heapTotal: newMemoryData.heapTotal / (1024 * 1024),
                    heapUsed: newMemoryData.heapUsed / (1024 * 1024),
                    external: newMemoryData.external / (1024 * 1024),
                    arrayBuffers: newMemoryData.arrayBuffers / (1024 * 1024),
                };

                setMemoryUsage(convertedMemoryData);
                setData((prevState) => ({
                    rss: updateQueue(prevState.rss, convertedMemoryData.rss),
                    heapTotal: updateQueue(prevState.heapTotal, convertedMemoryData.heapTotal),
                    heapUsed: updateQueue(prevState.heapUsed, convertedMemoryData.heapUsed),
                    external: updateQueue(prevState.external, convertedMemoryData.external),
                    arrayBuffers: updateQueue(prevState.arrayBuffers, convertedMemoryData.arrayBuffers),
                }));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        // Fetch data initially
        fetchData();

        // Set up interval to fetch data every 3 seconds
        const intervalId = setInterval(fetchData, 3000);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    const updateQueue = (queue, value) => {
        const newQueue = [...queue, { x: new Date().toLocaleTimeString(), y: Number(value) }];
        if (newQueue.length > 5) {
            newQueue.shift();
        }
        return newQueue;
    };

    const chartData = [
        {
            id: 'RSS',
            data: data.rss || [],
        },
        {
            id: 'Heap Total',
            data: data.heapTotal || [],
        },
        {
            id: 'Heap Used',
            data: data.heapUsed || [],
        },
        {
            id: 'External',
            data: data.external || [],
        },
        {
            id: 'Array Buffers',
            data: data.arrayBuffers || [],
        },
    ];

    return (
        <Box mx="20px" my="30px">
            <Header title={translate("admin.supervisor.title")} subtitle={translate("admin.supervisor.subtitle")} />

            <Box
                display="flex"
                justifyContent="flex-end"
                sx={{ width: '100%' }}
            >
                <Button
                    size="large"
                    sx={{
                        flex: 'none',
                        textTransform: 'none',
                        backgroundColor: colors.primary[400],
                        color: 'white',
                        px: 2,
                        mr: 2,
                        '&:hover': {
                            backgroundColor: colors.blueAccent[700],
                        },
                    }}
                    startIcon={<ChangeCircleIcon />}
                    onClick={handleOpen}
                >
                    {translate("admin.supervisor.updateDatabaseButton")}
                </Button>
                <UpdateDatabaseModal open={open} handleClose={handleClose}/>
            </Box>

            <Typography variant="h3" fontWeight="semibold">
                CPU
            </Typography>
            <br />
            <Grid container spacing={2}>
                <KPICard title="IDLE" percentage={Number(serverCpu.Idle).toFixed(0)} />
                <KPICard title="Total Used" percentage={Number(serverCpu.TotalUsed).toFixed(0)} />
                <KPICard title="User" percentage={Number(serverCpu.User).toFixed(0)} />
                <KPICard title="System" percentage={Number(serverCpu.Sys).toFixed(0)} />
            </Grid>

            <br />

            <Typography variant="h3" fontWeight="semibold">
                Memory Usage
            </Typography>
            <br />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <LineChart chartData={chartData} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Supervisor;
