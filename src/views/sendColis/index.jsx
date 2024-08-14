import { useContext, useEffect, useState } from "react";
import { Box, Button, TextField, MenuItem, useTheme } from "@mui/material";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import { Formik } from "formik";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import useLang from "../../hooks/useLang";
import * as yup from "yup";
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';
import useMediaQuery from "@mui/material/useMediaQuery";
import dayjs from 'dayjs';
import API from "../../utils/api";
import { useNavigate } from 'react-router-dom';
import useSnackbar from "../../hooks/useSnackbar";

let d = new Date();
let now = new Date()
now.setHours(d.getHours(), d.getMinutes(), 0, 0);

export default function SendColis () {
    const showSnackbar = useSnackbar();
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { lang, translate } = useLang();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [rois, setRois] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [users, setUsers] = useState([]);
    const [initialValues, setInitialValues] = useState({
        origin: "",
        destination: "",
        receiver: "",
        size: 1,
        vehicle: 1,
        dueDate: dayjs(now.getTime())
    });

    const checkoutSchema = yup.object().shape({
        origin: yup.string().required(translate("from.required")),
        destination: yup.string().required(translate("from.required")).test(
            "different-from-origin",
            translate("sendColis.samePoints"),
            function (value) {
                return value !== this.parent.origin;
            }
        ),
        receiver: yup.string().required(translate("from.required")),
        size: yup.number().required(translate("from.required")),
        vehicle: yup.string().required(translate("from.required")),
        // dueAt: yup.string().required("Required"),
    });

    const handleFormSubmit = (values) => {
        // Find the location object corresponding to the origin ID
        const depositLocation = rois.find(location => location._id === values.origin);
        const withdrawalLocation = rois.find(location => location._id === values.destination);

        // Create send object
        const _send = {
            depositLocationId: values.origin,
            depositLocationName: depositLocation.name,
            withdrawalLocationId: values.destination,
            withdrawalLocationName: withdrawalLocation.name,
            receiverId: values.receiver,
            size: values.size,
            vehicle: values.vehicle,
            dueAt: values.dueDate
        }

        API.createDemand(_send).then(function(data) {
            localStorage.setItem('demandId', data.data.demandId);
            showSnackbar(translate("sendColis.success"), 'success');
            navigate("/sendResume");
        }, function(error){
            showSnackbar(translate("sendColis.error"), 'error');
            console.log(error);
        });
    };

    useEffect(() => {
        API.getROIs()
            .then((data) => {
                setRois(data.data);
                if(data.data.length > 1) {
                    setInitialValues((prevValues) => ({
                        ...prevValues,
                        origin: data.data[0]._id,
                        destination: data.data[1]._id
                    }));
                }
            });

        API.getUsers()
            .then((data) => {
                setUsers(data.data);
                if(data.data.length > 0) {
                    setInitialValues((prevValues) => ({
                        ...prevValues,
                        receiver: data.data[0]._id,
                    }));
                }
            });

        API.getVehicles()
            .then((data) => {
                setVehicles(data.data);
                if(data.data.length > 0) {
                    setInitialValues((prevValues) => ({
                        ...prevValues,
                        vehicle: data.data[0]._id,
                    }));
                }
            });
    }, []);

    if(rois !== undefined && users !== undefined && vehicles !== undefined)
        return (
            <Box mx="20px" mt="30px">
                <Header title={translate('sendColis.title')} subtitle={translate('sendColis.subtitle')}></Header>

                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={checkoutSchema}
                    enableReinitialize={true}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleBlur,
                          handleChange,
                          handleSubmit,
                          setFieldValue,
                      }) => (
                        <form onSubmit={handleSubmit}>
                            <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                }}
                            >
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label={translate("sendColis.origin")}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.origin}
                                    name="origin"
                                    error={!!touched.origin && !!errors.origin}
                                    helperText={touched.origin && errors.origin}
                                    sx={{ gridColumn: "span 2" }}
                                    select
                                >
                                    {rois.map((roi) => (
                                        <MenuItem id={roi._id} key={roi._id} value={roi._id}>
                                            {roi.name}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label={translate("sendColis.destination")}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.destination}
                                    name="destination"
                                    error={!!touched.destination && !!errors.destination}
                                    helperText={touched.destination && errors.destination}
                                    sx={{ gridColumn: "span 2" }}
                                    select
                                >
                                    {rois.map((roi) => (
                                        <MenuItem id={roi._id} key={roi._id} value={roi._id}>
                                            {roi.name}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label={translate("sendColis.receiver")}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.receiver}
                                    name="receiver"
                                    error={!!touched.receiver && !!errors.receiver}
                                    helperText={touched.receiver && errors.receiver}
                                    sx={{ gridColumn: "span 2" }}
                                />

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label={translate("sendColis.size")}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.size?.toString()}
                                    name="size"
                                    error={!!touched.size && !!errors.size}
                                    helperText={touched.size && errors.size}
                                    sx={{ gridColumn: "span 2" }}
                                    select
                                >
                                    <MenuItem value="1">Lettres</MenuItem>
                                    <MenuItem value="2">Colis</MenuItem>
                                </TextField>

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label={translate("sendColis.vehicle")}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.vehicle?.toString()}
                                    name="vehicle"
                                    error={!!touched.vehicle && !!errors.vehicle}
                                    helperText={touched.vehicle && errors.vehicle}
                                    sx={{ gridColumn: "span 2" }}
                                    select
                                >
                                    {vehicles.map((vehicle) => (
                                        <MenuItem id={vehicle._id} key={vehicle._id} value={vehicle._id}>
                                            {vehicle.name}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <DateTimePicker
                                    fullWidth
                                    label={translate("sendColis.dueDate")}
                                    value={values.dueDate}
                                    onChange={(value) => setFieldValue('dueDate', value)}
                                    name="dueDate"
                                    error={!!touched.dueDate && !!errors.dueDate}
                                    helperText={touched.dueDate && errors.dueDate}
                                    sx={{ gridColumn: "span 2" }}
                                    slots={{
                                        textField: (params) => <TextField fullWidth variant='filled' type="text" {...params} />
                                    }}
                                />
                            </Box>
                            <Box display="flex" justifyContent="end" mt="20px">
                                <Button type="reset" sx={{ mr: 2 }} variant="contained">
                                    <ClearIcon sx={{ mr: 2 }} fontSize="small" /> {translate("sendColis.cancel")}
                                </Button>

                                <Button type="submit" color="info" variant="contained">
                                    <SendIcon sx={{ mr: 2 }} fontSize="small" /> {translate("sendColis.send")}
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        )
}