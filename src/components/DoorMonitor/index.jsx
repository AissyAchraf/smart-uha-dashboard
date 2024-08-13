import { Box, Grid } from "@mui/material";
import {useEffect, useState} from "react";


const DoorStates = {
    Error: 0,
    Closed: 1,
    Unlocked: 2,
    Opened: 3,
    Deactivated: 4
};

const DoorMonitor = ({ doors = [] }) => {
    const [doorClasses, setDoorClasses] = useState([]);

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

    useEffect(() => {
        setDoorClasses(getDoorClasses(doors));
    }, [doors]);

    return (
        <Box m={2} width="100%" display="flex" backgroundColor="white" justifyContent="center">
            {/* Side Door */}
            <Box sx={{ margin: 2 }} className={`side-door ${doorClasses[4] || ""}`}></Box>

            {/* Back Doors */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: 4,
                    padding: 1,
                }}
                className="back-doors"
            >
                {/* Top Doors */}
                <Grid sx={{ display: 'flex' }} justifyContent="center" className="top-doors">
                    <Grid sx={{ m: 1 }} item>
                        <Box className={`door left-door ${doorClasses[0] || ""}`}></Box>
                    </Grid>
                    <Grid sx={{ m: 1 }} item>
                        <Box className={`door right-door ${doorClasses[1] || ""}`}></Box>
                    </Grid>
                </Grid>

                {/* Bottom Doors */}
                <Grid justifyContent="center" className="bottom-doors" sx={{ display: 'flex' }}>
                    <Grid sx={{ m: 1 }} item>
                        <Box className={`door left-door ${doorClasses[2] || ""}`}></Box>
                    </Grid>
                    <Grid sx={{ m: 1 }} item>
                        <Box className={`door right-door ${doorClasses[3] || ""}`}></Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
};

export default DoorMonitor;