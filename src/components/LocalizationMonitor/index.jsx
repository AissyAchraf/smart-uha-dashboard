import { useState, useEffect } from "react";
import { Box, Badge, Typography } from "@mui/material";
import API from "../../utils/api";

const LocalizationMonitor = ({ SupervisorState }) => {
    const [localizationName, setLocalizationName] = useState("");
    const [rois, setRois] = useState([]);

    useEffect(() => {
        API.getAllROIs()
            .then((data) => {
                setRois(data.data);
            });
    }, []);

    const getDestination = () => {
        const currentId = SupervisorState.CurrentId;
        const targetId = SupervisorState.TargetId;

        const current = rois.find(roi => roi.supervisorId === currentId)?.name || currentId;
        const target = rois.find(roi => roi.supervisorId === targetId)?.name || targetId;

        const stationed = current === target;

        return (
            <Box>
                {/* First Line: "at" or "from" with Badge */}
                {/*<Box display="flex" alignItems="center" mb={1}>*/}
                {/*    <Box mr={1}>*/}
                {/*        {stationed ? "at" : "from"}*/}
                {/*    </Box>*/}
                    <Badge
                        sx={{
                            "& .MuiBadge-badge": {
                                color: "white",
                                backgroundColor: "darkgray",
                                fontSize: "medium",
                                padding: 2
                            },
                            ml: 5
                        }}
                        badgeContent={current}
                    />
                {/*</Box>*/}

                {/* Second Line: "to" with Target */}
                {!stationed && (
                    <Box display="flex" alignItems="center">
                        <Box mr={1}>
                            to
                        </Box>
                        <Box className="spvr-mntr-vignette spvr-mntr-to">
                            {target}
                        </Box>
                    </Box>
                )}
            </Box>
        );
    }

    return (
        <>{getDestination()}</>
    );
}

export default LocalizationMonitor;
