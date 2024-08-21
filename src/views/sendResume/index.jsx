import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Divider, Typography, Button, Container, Grid, useTheme } from '@mui/material';
import Header from '../../components/Header';
import { tokens } from "../../theme";
import useLang from "../../hooks/useLang";
import API from "../../utils/api";
import { DemandSizes } from "../../utils/enums/DemandSizes";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import useSnackbar from "../../hooks/useSnackbar";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function SendResume () {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { lang, translate } = useLang();
    const [demand, setDemand] = useState({});
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();

    const [depositLocation, setDepositLocation] = useState("New York");
    const [demandSize, setDemandSize] = useState("Large");
    const [withdrawalLocation, setWithdrawalLocation] = useState("Los Angeles");
    const [receiver, setReceiver] = useState("John Doe");

    useEffect(() => {
        if(localStorage.getItem('demandId') === undefined) {
            navigate('/sendColis');
        }

        API.getDemand(localStorage.getItem('demandId')).then(function(data) {
                setDemand(data.data);
        }, function(error){
            console.log(error);
        });
    }, []);

    const formatDeliverySize = (size) => {
        switch(size) {
            case DemandSizes.Letter:
                return translate("sendResume.sizeList.letter");
            case DemandSizes.Packet:
                return translate("sendResume.sizeList.packet");
            // no default
        }
    }

    const back = () => {
        API.cancelDemand(localStorage.getItem('demandId'))
            .then(() => {
                navigate("/");
                showSnackbar(translate("sendResume.canceled"));
            });
    }

    const confirm = () => {
        API.confirmDemand(localStorage.getItem('demandId'))
            .then(() => {
                navigate("/track");
                showSnackbar(translate("sendResume.confirmed"), 'success');
            });
    }

    return (
        <Box mx="20px" mt="30px">
            <Header title={translate('sendResume.title')} subtitle={translate('sendResume.subtitle')}></Header>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Card sx={{ p: 2, mt: "30px" }} >
                    <Typography variant="h4" fontWeight="bold" mt={1} mb={2} ml={2}>
                        <InfoOutlinedIcon sx={{mr: 1}}/>
                        {translate("sendResume.summary")}
                    </Typography>

                    <Divider inset="none" sx={{ mx: 2 }} />
                    <CardContent sx={{ mt: 2 }}>

                        {/* First Line */}
                        <Grid container spacing={2} sx={{ mb: 2 }}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1" component="div">
                                    <Typography component="span" sx={{ fontWeight: 'bold' }}>
                                        {translate("sendResume.origin")}:
                                    </Typography>{" "}
                                    {demand.depositLocation?.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1" component="div">
                                    <Typography component="span" sx={{ fontWeight: 'bold' }}>
                                        {translate("sendResume.size")}:
                                    </Typography>{" "}
                                    {formatDeliverySize(demand.size)}
                                </Typography>
                            </Grid>
                        </Grid>

                        {/* Second Line */}
                        <Grid container spacing={2} sx={{ mb: 3 }}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1" component="div">
                                    <Typography component="span" sx={{ fontWeight: 'bold' }}>
                                        {translate("sendResume.destination")}:
                                    </Typography>{" "}
                                    {demand.withdrawalLocation?.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1" component="div">
                                    <Typography component="span" sx={{ fontWeight: 'bold' }}>
                                        {translate("sendResume.receiver")}:
                                    </Typography>{" "}
                                    {demand.receiver?._id}
                                </Typography>
                            </Grid>
                        </Grid>

                        {/* Theard Line */}
                        <Grid container spacing={2} sx={{ mb: 3 }}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1" component="div">
                                    <Typography component="span" sx={{ fontWeight: 'bold' }}>
                                        {translate("sendResume.dueAt")}:
                                    </Typography>{" "}
                                    {new Date(demand.dueAt).toLocaleString('fr-FR', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true,
                                    })}
                                </Typography>
                            </Grid>
                        </Grid>

                        {/* Action Buttons */}
                        <Box display="flex">
                            <Button
                                sx = {{ mr: 2 }}
                                variant="contained"
                                color="success"
                                size="large"
                                onClick={confirm}
                            >
                                <CheckCircleOutlineIcon sx={{ mr: 1 }} fontSize="small" />
                                {translate("sendResume.confirm")}
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                onClick={back}
                            >
                                <CancelOutlinedIcon sx={{ mr: 1 }} fontSize="small" />
                                {translate("sendResume.cancel")}
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    )
}