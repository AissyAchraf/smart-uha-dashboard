import { useState, useEffect, useRef } from "react";
import { Box, useTheme } from '@mui/material';
import Header from '../../components/Header';
import { tokens } from '../../theme';
import useLang from '../../hooks/useLang';
import API from "../../utils/api";
import React from "react";
import TrackInformation from "../../components/TrackInformation";
import { DemandStates } from "../../utils/enums/DemandStates";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Track() {
    const theme = useTheme();
    const color = tokens(theme.palette.mode);
    const { lang, translate } = useLang();
    const [demands, setDemands] = useState([]);
    const demandsRef = useRef(demands);

    const fetchOngoingDemands = () => {
        API.getOngoingDemands()
            .then((data) => {
                    setDemands(data.data);
                }
            );
    };

    const fetchDemandsUpdates = () => {
        API.getDemandsUpdates().then((data) => {
            let partialDemands = data.data;
            let oldDemands = demandsRef.current;
            let refreshedDemands = [];

            partialDemands.forEach((demand) => {
                const originalDemand = oldDemands.find((d) => d._id === demand._id);

                if (typeof originalDemand === 'undefined') {
                    return fetchOngoingDemands();
                }

                const index = oldDemands.indexOf(originalDemand);
                oldDemands.splice(index, 1);

                let updatedDemand = { ...originalDemand, ...demand };
                refreshedDemands.push(updatedDemand);
            });

            oldDemands.forEach((demand) => {
                demand.state = DemandStates.Livre;
                refreshedDemands.push(demand);
            });

            demandsRef.current = refreshedDemands;
            setDemands(refreshedDemands);
        });
    };

    useEffect(() => {
        demandsRef.current = demands; // keep ref in sync with state

        const interval = setInterval(() => {
            fetchDemandsUpdates();
        }, 1000);

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, [demands]);

    return (
        <Box mx="20px" mt="30px">
            <Header title={translate('track.ongoing')} subtitle={translate('track.subtitle')}></Header>

            <Box sx={{ mt: 2 }}>
                {demands.map((demand) => (
                    <Box sx={{ marginLeft: 'auto',
                        marginRight: 'auto',
                        maxWidth: '650px',
                        // padding: '10px',
                        textAlign: 'center' }}>
                        <Card sx={{ maxWidth: '600px' }}>
                            <CardMedia
                                sx={{ height: 140 }}
                                image="/assets/images/smartuha.png"
                                title="SMART UHA"
                            />
                            <CardContent>
                                <TrackInformation key={demand._id} demand={demand} />
                            </CardContent>
                        </Card>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}