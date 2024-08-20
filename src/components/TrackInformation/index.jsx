import { useState, useEffect, useMemo } from 'react';
import { Box, Card, CardContent, Button, Grid, Typography, useTheme } from '@mui/material';
import useLanguage from '../../hooks/useLang';
import { tokens } from "../../theme";
import DoorMonitor from '../../components/DoorMonitor';
import ProgressBar from '../../components/ProgressBar';
import Stepper from '../Stepper';
import { DoorStates } from '../../utils/enums/DoorStates';
import API from '../../utils/api';
import { DemandStates } from '../../utils/enums/DemandStates';
import { formatDemandState } from '../../utils/enum2string';
import { useMediaQuery } from '@mui/material';

// Steps Icons
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';

const TrackInformation = ({ demand }) => {
    const theme = useTheme();
    const color = tokens(theme.palette.mode);
    const [doors, setDoors] = useState([1, 1, 1, 1, 1]);
    const {lang, translate} = useLanguage();
    const user = JSON.parse(sessionStorage.getItem("user"));
    const isSender = demand.emitter._id === user._id;
    const isReceiver = demand.receiver._id === user._id;
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    const getStep = (state) => {
        if(state < 15)
            return 1; // Going to Send location
        if(state < 40)
            return 2; // Send Location
        if(state < 45)
            return 3; // Package Placement
        if(state < 70)
            return 4; // Arrival Location
        return 5; // Delevery Confirmation
    }

    const steps = [
        { description: translate("trackSteps.sendLocation"), icon: <LocationOnOutlinedIcon fontSize={isSmallScreen ? "small" : "medium"}/>},
        { description: translate("trackSteps.packagePlacement"), icon: <IosShareOutlinedIcon fontSize={isSmallScreen ? "small" : "medium"}/>},
        { description: translate("trackSteps.onTheWay"), icon: <LocalShippingOutlinedIcon fontSize={isSmallScreen ? "small" : "medium"}/>},
        { description: translate("trackSteps.deliveryConfirmation"), icon: <VerifiedOutlinedIcon fontSize={isSmallScreen ? "small" : "medium"}/>},
    ];

    const updateVehicleDoors = () => {
        if(demand.state === DemandStates.Livre){
            return;
        }

        API.getVehicleDoorState(demand.vehicle)
            .then((data) => {
                    let doors = data.data.ioState.DIn.slice(0,5);
                    doors = doors.map(door => {
                        return door ? DoorStates.Closed : DoorStates.Opened;
                    });
                    if( demand.state === DemandStates.RecuperationAttenteOuverture ||
                        demand.state === DemandStates.LivraisonAttenteOuverture ) {
                        if(doors[demand.box] !== DoorStates.Opened){
                            doors[demand.box] = DoorStates.Unlocked;
                        }
                    }
                    setDoors(doors);
                }
            );
    }

    const openRobot = () =>{
        const _demandId = demand._id;
        API.openDemand(_demandId).then( res => {
            if(res.status === 206){
                alert(" A door is already opened by another user try later !");
            }});
    };

    const closeRobot = () =>{
        const _demandId = demand._id;
        API.resumeDemand(_demandId);
    };

    const showControls = () => {
        if (isSender && isReceiver) {
            switch(demand.state) {
                case DemandStates.RecuperationAttenteDeblocage:
                case DemandStates.RecuperationAttenteOuverture:
                case DemandStates.Recuperation:
                case DemandStates.RecuperationAttenteConfirmation:
                case DemandStates.LivraisonAttenteDeblocage:
                case DemandStates.LivraisonAttenteOuverture:
                case DemandStates.Livraison:
                case DemandStates.LivraisonAttenteConfirmation:
                    return true;
                default:
                    return false;
            }
        } else if (isSender) {
            switch(demand.state) {
                case DemandStates.RecuperationAttenteDeblocage:
                case DemandStates.RecuperationAttenteOuverture:
                case DemandStates.Recuperation:
                case DemandStates.RecuperationAttenteConfirmation:
                    return true;
                default:
                    return false;
            }
        } else if (isReceiver) {
            switch(demand.state) {
                case DemandStates.LivraisonAttenteDeblocage:
                case DemandStates.LivraisonAttenteOuverture:
                case DemandStates.Livraison:
                case DemandStates.LivraisonAttenteConfirmation:
                    return true;
                default:
                    return false;
            }
        }
        return false;
    };

    const disableOpenButton = () => {
        if (isSender && isReceiver) {
            // Handle the case where the user is both a sender and receiver
            switch(demand.state) {
                case DemandStates.RecuperationAttenteDeblocage:
                case DemandStates.RecuperationAttenteConfirmation:
                case DemandStates.LivraisonAttenteDeblocage:
                case DemandStates.LivraisonAttenteConfirmation:
                    return false;
                default:
                    return true;
            }
        } else if (isSender) {
            switch(demand.state) {
                case DemandStates.RecuperationAttenteDeblocage:
                case DemandStates.RecuperationAttenteConfirmation:
                    return false;
                default:
                    return true;
            }
        } else if (isReceiver) {
            switch(demand.state) {
                case DemandStates.LivraisonAttenteDeblocage:
                case DemandStates.LivraisonAttenteConfirmation:
                    return false;
                default:
                    return true;
            }
        }
        return true; // Default to true if none of the conditions are met
    };

    const disableConfirmButton = () => {
        if (isSender && isReceiver) {
            // Handle the case where the user is both a sender and receiver
            switch(demand.state) {
                case DemandStates.RecuperationAttenteConfirmation:
                case DemandStates.LivraisonAttenteConfirmation:
                    return false;
                default:
                    return true;
            }
        } else if (isSender) {
            switch(demand.state) {
                case DemandStates.RecuperationAttenteConfirmation:
                    return false;
                default:
                    return true;
            }
        } else if (isReceiver) {
            switch(demand.state) {
                case DemandStates.LivraisonAttenteConfirmation:
                    return false;
                default:
                    return true;
            }
        }
        return true; // Default to true if none of the conditions are met
    };


    useEffect(() => {
        updateVehicleDoors();
    }, [demand]);


    let openButton = <Grid item xs={12} sm={6}>
        <Button
            variant="contained"
            color="inherit"
            size="small"
            fullWidth
            onClick={openRobot}
            disabled={disableOpenButton()}
        >
            {translate("trackInformation.open")}
        </Button>
    </Grid>

    let confirmButton = <Grid item xs={12} sm={6}>
        <Button
            variant="contained"
            color="inherit"
            size="small"
            fullWidth
            onClick={closeRobot}
            disabled={disableConfirmButton()}
        >
            {translate("trackInformation.send")}
        </Button>
    </Grid>

    const doorMonitor = (
        <DoorMonitor doors={doors}></DoorMonitor>
    );

    return (
        <Box sx={{
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: '100%',
            width: '100%',
            alignSelf: 'center'
        }}>
            <Card sx={{ px: 4 }}>
                <CardContent>
                    <Grid container sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Grid item>
                            <Typography level="title-lg" textColor="#fff">
                                {demand.emitter._id}
                            </Typography>
                            <Typography
                                textColor="neutral.300"
                            >
                                <PlaceOutlinedIcon />
                                {demand.depositLocation.name}
                            </Typography>
                        </Grid>

                        <div className={`flex-auto border-t-2 m-3 border-dashed`}>
                        </div>

                        <Grid item>
                            <Typography level="title-lg" textColor="#fff">
                                {demand.receiver._id}
                            </Typography>
                            <Typography
                                textColor="neutral.300"
                            >
                                <FlagOutlinedIcon/>
                                {demand.withdrawalLocation.name}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Grid container>
                {/* Request */}
                {/*<Grid container spacing={2} sx={{mb: 2}}>*/}
                {/*    <Grid item xs={12}>*/}
                {/*        <Typography variant="body1" component="div">*/}
                {/*            <Typography component="span" sx={{fontWeight: 'bold'}}>*/}
                {/*                {demand.request}*/}
                {/*            </Typography>*/}
                {/*        </Typography>*/}
                {/*    </Grid>*/}
                {/*</Grid>*/}

                {/*/!* Sender and Receiver *!/*/}
                {/*<Grid container spacing={2} sx={{mb: 2}}>*/}
                {/*    <Grid item xs={12} sm={6}>*/}
                {/*        <Typography variant="body1" component="div">*/}
                {/*            <Typography component="span" sx={{fontWeight: 'bold'}}>*/}
                {/*                {translate("trackInformation.sender")}:*/}
                {/*            </Typography>{" "}*/}
                {/*            <div>{demand.emitter._id}</div>*/}
                {/*        </Typography>*/}
                {/*    </Grid>*/}
                {/*    <Grid item xs={12} sm={6}>*/}
                {/*        <Typography variant="body1" component="div">*/}
                {/*            <Typography component="span" sx={{fontWeight: 'bold'}}>*/}
                {/*                {translate("trackInformation.receiver")}:*/}
                {/*            </Typography>{" "}*/}
                {/*            <div>{demand.receiver._id}</div>*/}
                {/*        </Typography>*/}
                {/*    </Grid>*/}
                {/*</Grid>*/}

                {/*/!* Origin and Destination *!/*/}
                {/*<Grid container spacing={2}>*/}
                {/*    <Grid item xs={12} sm={6}>*/}
                {/*        <Typography variant="body1" component="div">*/}
                {/*            <Typography component="span" sx={{fontWeight: 'bold'}}>*/}
                {/*                {translate("trackInformation.origin")}:*/}
                {/*            </Typography>{" "}*/}
                {/*            <div>{demand.depositLocation.name}</div>*/}
                {/*        </Typography>*/}
                {/*    </Grid>*/}
                {/*    <Grid item xs={12} sm={6}>*/}
                {/*        <Typography variant="body1" component="div">*/}
                {/*            <Typography component="span" sx={{fontWeight: 'bold'}}>*/}
                {/*                {translate("trackInformation.destination")}:*/}
                {/*            </Typography>{" "}*/}
                {/*            <div>{demand.withdrawalLocation.name}</div>*/}
                {/*        </Typography>*/}
                {/*    </Grid>*/}
                {/*</Grid>*/}

                <Grid container spacing={2} sx={{mt: 2, justifyContent: 'center'}}>
                    <div id="demandState">{formatDemandState(translate, demand.state)}</div>
                </Grid>

                <Grid container sx={{mt: 2, mr: 3}}>
                    <Box sx={{ width: '100%' }}>
                        <Stepper steps={steps} currentStep={getStep(demand.state)}/>
                    </Box>

                    {/*<ProgressBar state={demand.state}/>*/}
                </Grid>

                <Grid container spacing={2} sx={{mt: 2}}>
                    {showControls() && (

                        <>
                            {openButton}
                            {confirmButton}
                            {doorMonitor}
                        </>
                    )}
                </Grid>

                <Grid container sx={{
                    mt: 2,
                    justifyContent: 'end'
                }}>
                    <div
                        className="trckinfo-date">{translate("trackInformation.updatedAt")} : {new Date(demand.updatedAt).toLocaleString('fr-FR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                    })}</div>
                </Grid>
            </Grid>
        </Box>
    )
}

export default TrackInformation;