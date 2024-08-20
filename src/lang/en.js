export default {
    app:{
        title: "Delivery {location}"
    },
    date: {
        format: "MM/dd/yyyy h:mm aa"
    },
    header: {
        home: "Home",
        account: "Profile",
        logout: "Logout",
        admin: "Admin"
    },
    home:{
        welcome: "Welcome to SMART UHA Delivery Service",
        send:"Send",
        follow:"Follow",
        sendPack: "Send Packages",
        followPack:"Follow Packages"
    },
    sendColis:{
        title: "Packages delivery form",
        subtitle: "Complete this form to ship your packages with ease",
        cardTitle: "Schedule a delivery request",
        origin: "Origin",
        destination: "Destination",
        receiver : "Receiver",
        size:"Size",
        vehicle: "Vehicle",
        send:"Send",
        cancel:"Cancel",
        dueDate: "Date and Time of delivery",
        samePoints: "The origin and the destination must be different",
        success: "Your delivery order has been created!",
        error: "An error occurred. Please try again.",
    },
    login:{
        connection:"Connection",
        serverError:"Server connection error : try again later or contact an admin",
        authenticateError:"Connection error : bad login or password"
    },
    sendResume: {
        title: "Packages delivery confitmation",
        subtitle: "Please review the details of your request below, then click 'Confirm' to finalize.",
        summary:"Summary",
        origin: "Origin",
        size: "Size",
        sizeList: {
            letter: "Letter",
            packet: "Package"
        },
        destination: "Destination",
        receiver: "Receiver",
        dueAt: "Date and Time of delivery",
        confirmed: "Order Confirmed!",
        canceled: "Order Canceled.",
        confirm: "Confirm",
        cancel: "Cancel",
        loading: "Loading..."
    },
    track:{
        title: "Track Your Deliveries",
        subtitle: "View the status of your ongoing deliveries below and stay updated on their progress.",
        loading: "Loading...",
        letters: "Your Letters",
        ongoing: "Ongoing deliveries",
        complete: "Completed deliveries",
        noDemands: "No Ongoing Deliveries",
        nDeliveriesInProgress: "You currently have no deliveries in progress. Why not send a package now?"
    },
    trackInformation:{
        open:"Unlock",
        send:"Send",
        finish:"Finish",
        sender:"Sender",
        receiver:"Receiver",
        origin:"Origin",
        destination:"Destination",
        updatedAt: "Last update"
    },
    enum:{
        confirm: "request to confirm",
        confirmed: "the demand will be processed at the chosen date", 
        waitRecovery :"waiting for recovery",
        waitUnlock: "you can unlock the door",
        waitAperture: "you can open the door",
        waitSender : "you can deposit the content and close the door",
        waitConfirm :"waiting for user to confirm",
        waitConfirmed: "user has confirmed the package deposit",
        waitDelivery : "waiting for delivery",
        waitReceiver :"you can take the content and close the door",
        delivered : "delivered package"
    },
    account: {
        information : "My information"
    },
    notifications: {
        robot_partance_livraison: 'Robot is coming at {destination} to get a box',
        robot_partance_recuperation: 'Robot is coming at {destination} to give a box',
        activated: "Notifications are activated!"
    },
    robot: {
        states: {
            error: "Error",
            available: "Ready",
            maintenance: "In Maintenance",
            unavailable: "Unavailable"
        },
        stateModal: {
            title: "State of the vehicle",
            body: "The vehicle is currently {robotState}. Select a new state ?",
            error: "Error: Cannot get vehicle state",
        }
    },
    admin: {
        labels: {
            demands: "Demands",
            archives: "Archives",
            vehicles: "Vehicles",
            rois: "Rois",
            supervisor: "Supervisor"
        },
        demand: {
            sender: "Sender",
            receiver: "Receiver",
            origin: "Origin",
            destination: "Destination",
            box: "Box",
            vehicle: "Vehicle",
            loadingVehicle: "Loading vehicle's name",
            loadingVehicleFailed: "Error : can't find vehicle's data",
            noVehicle: "No vehicle were affected yet",
            size: "Size",
            state: "Status",
            createdAt: "Creation",
            updatedAt: "Udpate",
            dueAt: "Delivery date",
            askForCancel: "Are you sure you want to cancel/delete this demand?",
            cancellation: "Cancel",
            deletion: "Delete",
            unknown: "Unknown",
            nodemands: "No demands found",
            error: "Demands with errors",
            ongoing: "On going",
            onhold: "Pending",
            completed: "Completed",
            schizophrenicUsed: "Schizophrenic login used",
            errorCancelledPackageStillIn: "Cancelled but package is still in",
            errorPickupDoorOpeningTimedOut: "The door for the pickup wasn't opened before the timeout",
            errorPickupDoorClosingTimedOut: "The door for the pickup wasn't closed before the timeout",
            errorPickupValidationTimedOut: "The pickup wasn't validated before the timeout",
            errorDeliveryDoorOpeningTimedOut: "The door for the delivery wasn't opened before the timeout",
            errorDeliveryDoorClosingTimedOut: "The door for the delivery wasn't closed before the timeout",
            errorDeliveryValidationTimedOut: "The delivery wasn't validated before the timeout",
            logs: "Logs",
            filterByVehicle: "Filter by vehicle:",
        },
        archives: {
            older: "Completed more than 3 days ago",
        },
        vehicle: {
            name: "Name",
            battery: "Battery",
            batteryCharging: "Charging battery",
            batteryCharged: "Fully charged",
            batteryOk: "Battery Ok",
            batteryCritical: "Battery critical",
            batteryError:"Error",
            loading: "Loading ...",
            supervisor: "Supervisor",
            localization: "Localization",
            car: "State",
            io: "Force open/close doors",
            boxes: "Deactivate/Activate doors",
            lastSeen: "Last update",
            planning: "Planning",
            open: "The door is currently open",
            close: "The door is currently closed",
            noDestinations: "choose",
            warning: "are you sure you want to launch this command?",
            availableLabel: "Availability",
            deactivatedDoorWarning: "This doors has been deactivated and cannot be opened.",
            deactivate: "Deactivate this door?",
            activate: "Activate this door?",
            area: "Areas",
            toMaintenance: "Send to maintenance",
            maintenancePoint: "Maintenance point"
        },
        roi: {
            supervisorId: "Number",
            name: "Name",
            displayName: "Display Name",
            isDeliveryPoint: "Delivery Point",
            canDeliver: "Yes",
            cannotDeliver: "No",
            warning: "are you sure you want to launch this command?",
        },
        supervisor: {
            idleCpuDesc: "Unused percentage of the CPU(s) by the application",
            totalCpuUsedDesc: "Total used percentage of the CPU(s) by the application (User + Sys)",
            userCpuDesc: "Used percentage of the CPU(s) by the application in the user space (when the processor is processing something directly for the application)",
            sysCpuDesc: "Used percentage of the CPU(s) by the application in the kernel space (when the processor is working on some operating system's functions for the application)",
            rssDesc: "Total memory allocated to the server",
            heapTotalDesc: "Total memory allocated to server Objects",
            heapUsedDesc: "Actually used memory for server Objects",
            externalDesc: "Memory used for C++ Objects bound to JavaScript Objects (include arrayBuffers)",
            arrayBuffersDesc: "Memory allocated for ArrayBuffer and SharedArrayBuffer",
            garbageCollector: "Server's garbage collector",
            UpdatingMapWarn: "Warning : All vehicles must be set to the Unavailable state to update map on the database.",
            UpdatingMapVehicleError: "Error: Unable to update the map on the database. One or multiple vehicles are not set to the Unavailable state.",
            UpdatingMapError: "Error: Map updating failed. Check your internet connection or contact an administrator."
        }
    },
    editableInput: {
        empty: "None"
    },
    form: {
        required: "Required",
    },
    trackSteps: {
        sendLocation: "Send Location",
        packagePlacement: "Shipping",
        onTheWay: "On The Way",
        deliveryConfirmation: "Delivery Confirmation",
    }
}