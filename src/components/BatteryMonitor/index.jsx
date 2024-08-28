import React, { useState, useEffect } from 'react';
import { Box, Typography } from "@mui/material";
import { BatteryStates } from "../../utils/enums/BatteryStates";
import useLang from "../../hooks/useLang";
import BatteryGauge from 'react-battery-gauge';

const BatteryMonitor = ({ batteryState, batteryLimits }) => {
    const { translate } = useLang();
    const [barClass, setBarClass] = useState(null);
    const [percentage, setPercentage] = useState(0);
    const [isCharging, setIsCharging] = useState(false);

    const getBatteryState = (state) => {
        switch(state) {
            case BatteryStates.Charging:
                return translate("admin.vehicle.batteryCharging");
            case BatteryStates.Charged:
                return translate("admin.vehicle.batteryCharged");
            case BatteryStates.Ok:
                return translate("admin.vehicle.batteryOk");
            case BatteryStates.Critical:
                return translate("admin.vehicle.batteryCritical");
            default:
                return translate("admin.vehicle.batteryError");
        }
    }

    const getBarClass = (state, voltage, min, max) => {
        if(state === BatteryStates.Charging) {
            return "progress-bar progress-bar-striped progress-bar-animated";
        } else if(state === BatteryStates.Charged) {
            return "progress-bar progress-bar-striped progress-bar-animated bg-success";
        } else {
            if(voltage>=max) {
                return "progress-bar bg-success";
            } else if (voltage<=min) {
                return "progress-bar bg-danger";
            } else {
                return "progress-bar bg-warning";
            }
        }
    }

    const getBatteryPercentage = (value, max, min) => {
        return Math.round(((value - min)/(max - min))*100);
    }

    useEffect(() => {
        setPercentage(getBatteryPercentage(batteryState.Voltage, batteryLimits.Max, batteryLimits.Min));
        setBarClass(batteryState.Status, batteryState.Voltage, batteryLimits.Low, batteryLimits.Mid);
        setIsCharging(batteryState.Status === BatteryStates.Charging)
    }, [batteryState, batteryLimits]);

    return (
        <Box sx={{ width: "100px", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BatteryGauge
                size={150}
                orientation="horizontal"
                value={percentage}
                charging={isCharging}
                customization={{
                    batteryBody: {
                        strokeWidth: 4,
                        cornerRadius: 6,
                        fill: '#808080',
                        strokeColor: 'none'
                    },
                    batteryCap: {
                        fill: '#808080',
                        strokeColor: '#808080',
                        cornerRadius: 2,
                        capToBodyRatio: 0.4
                    },
                    batteryMeter: {
                        outerGap: 1,
                        noOfCells: 10,
                    },
                    readingText: {
                        lightContrastColor: '#fff',
                        darkContrastColor: '#fff',
                        lowBatteryColor: 'red',
                        fontSize: 16,
                        style: { filter: 'url(#shadow)' },
                    },
                    chargingFlash: {
                        scale: undefined,
                        fill: 'orange',
                        animated: true,
                        animationDuration: 1000,
                    },
              }}
            />
        </Box>
    );
}

export default BatteryMonitor;