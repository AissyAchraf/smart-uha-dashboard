import React from 'react';
import { Box, LinearProgress, styled, linearProgressClasses } from '@mui/material';

const ProgressBar = ({ state }) => {

    const getPercentage = (state) => {
        if(state < 15)
            return 13;
        if(state < 40)
            return 37;
        if(state < 45)
            return 63;
        if(state < 70)
            return 87;
        return 100;
    }

    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 15,
        borderRadius: 10,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
        },
    }));

    const percent = getPercentage(state);

    return (
        <Box sx={{ ml: 2, width: '100%', mt: 6, mb: 2 }}>
            <Box className="dots">
                <Box className={"state-" + (percent < 13 ? 'pending' : 'reached')} />
                <Box className={"state-" + (percent < 37 ? 'pending' : 'reached')} />
                <Box className={"state-" + (percent < 63 ? 'pending' : 'reached')} />
                <Box className={"state-" + (percent < 87 ? 'pending' : 'reached')} />
            </Box>
            <Box className="underbar ubderbar-color">
                <BorderLinearProgress variant="determinate" value={percent}/>
            </Box>
        </Box>
    );
}

export default ProgressBar;