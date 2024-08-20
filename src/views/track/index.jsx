import { useState, useEffect, useRef } from "react";
import { Box, useTheme } from '@mui/material';
import Header from '../../components/Header';
import { tokens } from '../../theme';
import useLang from '../../hooks/useLang';
import API from "../../utils/api";
import React from "react";
import TrackInformation from "../../components/TrackInformation";
import { DemandStates } from "../../utils/enums/DemandStates";

import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import { FreeMode, Pagination } from "swiper/modules";

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
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

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

    const goToSendPackage = () => {
        navigate('/sendColis');
    }

    useEffect(() => {
        setIsLoading(true);
        demandsRef.current = demands; // keep ref in sync with state

        const interval = setInterval(() => {
            fetchDemandsUpdates();
        }, 1000);

        setIsLoading(false);

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, [demands]);

    return (
        <Box mx="20px" mt="30px">
            <Header sx={{ mt: '20px' }} title={translate('track.ongoing')} subtitle={translate('track.subtitle')}></Header>

            {isLoading ? (
                <Box className="flex items-center justify-center flex-col" sx={{ mt: 10, width: '100%' }}>
                    <>Chargement en cours ...</>
                </Box>
            ) : (
                <Box className="flex items-center flex-col h-screen">
                    {demands.length > 0 ?
                        (<Swiper
                            freeMode={true}
                            pagination={{
                                clickable: true,
                            }}
                            modules={[FreeMode, Pagination]}
                            className="max-w-[100%] lg:max-w-[50%]"
                        >
                            {demands.map((demand) => (
                                <SwiperSlide key={demand._id} sx={{ width: '100%' }}>
                                    <Card sx={{ maxWidth: '600px', marginBottom: '80px'}} className="flex flex-col gap-6 group relative verflow-hidden cursor-pointer mx-6 my-8">
                                        <CardMedia
                                            sx={{ height: 140 }}
                                            image="/assets/images/smartuha.png"
                                            title="SMART UHA"
                                        />
                                        <CardContent>
                                            <TrackInformation key={demand._id} demand={demand} />
                                        </CardContent>
                                    </Card>
                                </SwiperSlide>
                            ))}
                        </Swiper>)
                        : (
                            <Box className="flex items-center justify-center flex-col" sx={{ mt: 10, width: '100%' }}>
                                <Typography variant="h3">Aucune livraison en cours</Typography>
                                <img src="assets/illustrations/delivery-1.png" style={{ width: '450px' }}/>
                                <Typography variant="h3">Vous n'avez actuellement aucune livraison en cours. Pourquoi ne pas envoyer un colis dès maintenant ?</Typography>
                                <br/>
                                <Button color="info" size="large" variant="contained" onClick={goToSendPackage}>Envoyer un colis</Button>
                            </Box>
                        )
                    }
                </Box>
            )}

        </Box>
    )
}