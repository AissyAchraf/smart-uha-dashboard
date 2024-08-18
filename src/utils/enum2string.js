export function formatDemandState (translate, demandState) {

    switch (demandState) {
        case 0 :
            return translate("enum.confirm");
        case 5 :
            return translate("enum.confirmed");
        case 10 :
            return translate("enum.waitRecovery");
        case 15 :
            return translate("enum.waitUnlock");
        case 17:
            return translate("enum.waitAperture");
        case 20 :
            return translate("enum.waitSender");
        case 30 :
            return translate("enum.waitConfirm");
        case 35 :
            return translate("enum.waitConfirmed");
        case 40 :
            return translate("enum.waitDelivery");
        case 45:
            return translate("enum.waitUnlock");
        case 47 :
            return translate("enum.waitAperture");
        case 50 :
            return translate("enum.waitReceiver");
        case 60 :
            return translate("enum.waitConfirm");
        case 65 :
            return translate("enum.waitConfirmed");
        case 70 :
            return translate("enum.delivered");
        default :
            return  "OOPS: Unknown State";
        }
}

export function formatRobotState(translate, robotState) {
    switch(robotState){
        case 0:
            return translate("robot.states.error");
        case 10:
            return translate("robot.states.available");
        case 20:
            return translate("robot.states.maintenance");
        case 30:
            return translate("robot.states.unavailable");
        default:
            return "OOPS: Unknown State";
    }
}